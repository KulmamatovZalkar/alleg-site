"""Авто-конвертация загруженных изображений в WebP."""
from django.db.models.signals import pre_save
from django.dispatch import receiver

from .image_processing import process_image_file
from .models import (
    Achievement,
    BlogPost,
    Case,
    CaseImage,
    HeroSlide,
    HoldingProject,
    ProjectImage,
    Service,
    SiteSettings,
    Testimonial,
)

# (Модель, имя_поля, ключ_для_лимита_размера)
IMAGE_FIELDS = [
    (SiteSettings, "hero_poster", "hero_poster"),
    (HeroSlide, "image", "hero_poster"),
    (SiteSettings, "about_photo", "about_photo"),
    (SiteSettings, "about_photo_2", "about_photo"),
    (SiteSettings, "about_photo_3", "about_photo"),
    (SiteSettings, "og_image", "og_image"),
    (Achievement, "image", "achievement_image"),
    (Service, "image", "service_image"),
    (Case, "image", "case_image"),
    (CaseImage, "image", "case_image"),
    (HoldingProject, "cover", "case_image"),
    (HoldingProject, "logo", "testimonial_photo"),  # логотипы — маленькие
    (ProjectImage, "image", "case_image"),
    (Testimonial, "photo", "testimonial_photo"),
    (BlogPost, "cover", "blogpost_cover"),
]


def _make_handler(field_name: str, field_key: str):
    """Создаёт pre_save handler для конкретного поля."""

    def handler(sender, instance, **kwargs):
        file_field = getattr(instance, field_name, None)
        if not file_field or not file_field.name:
            return

        # Проверяем что файл реально новый (а не просто переоткрыли модель).
        # Если pk есть — сверяем с тем, что лежит в БД.
        if instance.pk:
            try:
                old = sender.objects.get(pk=instance.pk)
                old_field = getattr(old, field_name, None)
                if old_field and old_field.name == file_field.name:
                    # Не менялся — пропускаем (иначе будем конвертить при
                    # каждом save() модели).
                    return
            except sender.DoesNotExist:
                pass

        # Если уже .webp — не трогаем повторно
        if file_field.name.lower().endswith(".webp"):
            # Если pk есть и старый был с другим именем (то есть новый файл
            # — уже webp), пропустим. Но размеры всё равно стоит порезать
            # — на всякий случай прогоняем.
            pass

        process_image_file(file_field, field_key)

    return handler


# Регистрируем по одному ресиверу на каждое поле
for model, field_name, field_key in IMAGE_FIELDS:
    pre_save.connect(
        _make_handler(field_name, field_key),
        sender=model,
        weak=False,
        dispatch_uid=f"image_webp_{model.__name__}_{field_name}",
    )
