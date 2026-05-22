"""Перепрожать все существующие изображения по текущим пресетам.

Полезно после изменения FIELD_MAX_DIMENSION / WEBP_QUALITY в image_processing.
Запуск:
  docker compose exec api python manage.py reprocess_images
"""
import os

from django.core.management.base import BaseCommand

from apps.content.image_processing import process_image_file
from apps.content.signals import IMAGE_FIELDS


class Command(BaseCommand):
    help = "Перепрожать все ImageField по текущим пресетам (resize + WebP)"

    def add_arguments(self, parser):
        parser.add_argument("--dry-run", action="store_true")

    def handle(self, *args, **opts):
        dry = opts["dry_run"]
        total = 0
        saved_bytes = 0

        for model, field_name, field_key in IMAGE_FIELDS:
            qs = model.objects.exclude(**{f"{field_name}": ""})
            for obj in qs:
                file_field = getattr(obj, field_name)
                if not file_field or not file_field.name:
                    continue

                try:
                    original_size = file_field.size
                except Exception:
                    continue

                path = file_field.path if hasattr(file_field, "path") else None

                self.stdout.write(
                    f"  · {model.__name__}.{field_name} [{file_field.name}] "
                    f"{original_size:,}B → ",
                    ending="",
                )

                if dry:
                    self.stdout.write("(dry-run, skip)")
                    continue

                changed = process_image_file(file_field, field_key)
                if not changed:
                    self.stdout.write("no change")
                    continue

                obj.save(update_fields=[field_name])
                new_size = file_field.size
                self.stdout.write(
                    f"{new_size:,}B ({original_size - new_size:+,}B)"
                )
                total += 1
                saved_bytes += original_size - new_size

                # Удаляем исходник, если имя поменялось (расширение → webp)
                if path and os.path.exists(path) and path != file_field.path:
                    try:
                        os.remove(path)
                    except OSError:
                        pass

        self.stdout.write(self.style.SUCCESS(
            f"\n✓ Перепрожато {total} изображений, "
            f"сэкономлено {saved_bytes:,}B (~{saved_bytes / 1024:.0f} KiB)."
        ))
