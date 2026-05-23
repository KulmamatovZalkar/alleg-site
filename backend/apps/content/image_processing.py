"""Авто-обработка изображений: ресайз + конвертация в WebP.

Подключается через pre_save signal на всех моделях content.
"""
import io
import os
from pathlib import Path

from django.core.files.base import ContentFile
from django.db.models.fields.files import ImageFieldFile
from PIL import Image, ImageOps

# Целевое качество WebP. 88 — высокое качество без заметных артефактов.
# next/image на клиенте дополнительно ужмёт до q=75 при оптимизации,
# поэтому исходник должен быть с запасом качества.
WEBP_QUALITY = 88

# Максимальная длинная сторона по умолчанию (px).
DEFAULT_MAX_DIMENSION = 1400

# Размеры подобраны под фактический viewport на сайте + 2x для retina.
# Слишком большие фото = долгая загрузка и плохой LCP.
FIELD_MAX_DIMENSION = {
    # Hero — десктоп full-bleed до ~1920, на ретине → 2400 максимум.
    "hero_poster": 2000,
    "og_image": 1200,
    # "Обо мне" — крупная плитка на десктопе ~600–700px → 1400 для retina.
    "about_photo": 1400,
    # Bento — 360px на desktop → 720 retina.
    "achievement_image": 720,
    # Направления — ~420px → 900 retina.
    "service_image": 900,
    # Кейсы — карточка до 660px на desktop → 1300 retina.
    "case_image": 1300,
    # Аватарка отзыва ~48px → 200 (с запасом)
    "testimonial_photo": 200,
    # Блог-обложка
    "blogpost_cover": 1600,
}

# Расширения, которые НЕ конвертируем (svg, gif с анимацией, и т.д.)
SKIP_EXTENSIONS = {".svg", ".gif"}


def _is_already_webp(filename: str) -> bool:
    return filename.lower().endswith(".webp")


def _should_skip(filename: str) -> bool:
    ext = Path(filename).suffix.lower()
    return ext in SKIP_EXTENSIONS


def process_image_file(file_field: ImageFieldFile, field_key: str) -> bool:
    """Обработка одного ImageField.

    Возвращает True если файл изменился (нужно пересохранить).
    """
    if not file_field or not file_field.name:
        return False

    original_name = os.path.basename(file_field.name)

    if _should_skip(original_name):
        return False

    max_dim = FIELD_MAX_DIMENSION.get(field_key, DEFAULT_MAX_DIMENSION)

    try:
        file_field.open("rb")
        img = Image.open(file_field)
        # Поворот по EXIF (камеры/телефоны часто сохраняют ориентацию в метаданных)
        img = ImageOps.exif_transpose(img)
    except Exception:
        return False
    finally:
        try:
            file_field.close()
        except Exception:
            pass

    w, h = img.size
    longest = max(w, h)
    needs_resize = longest > max_dim

    # Если файл уже webp и в пределах лимита — не трогаем (каждое
    # пересохранение webp = новая потеря качества).
    if _is_already_webp(original_name) and not needs_resize:
        return False

    # Конвертация цветовой модели
    if img.mode in ("RGBA", "LA"):
        # Сохраняем прозрачность для WebP
        pass
    elif img.mode == "P":
        # Палитра — конвертим в RGBA если есть прозрачность, иначе RGB
        if "transparency" in img.info:
            img = img.convert("RGBA")
        else:
            img = img.convert("RGB")
    elif img.mode != "RGB":
        img = img.convert("RGB")

    # Ресайз с сохранением пропорций
    if needs_resize:
        ratio = max_dim / longest
        new_size = (int(w * ratio), int(h * ratio))
        img = img.resize(new_size, Image.LANCZOS)

    # Сохраняем как WebP
    buffer = io.BytesIO()
    img.save(buffer, format="WEBP", quality=WEBP_QUALITY, method=6)
    buffer.seek(0)

    base_name = Path(original_name).stem
    new_name = f"{base_name}.webp"

    # Заменяем сам файл (имя файла поменялось — старый удалится автоматически
    # при сохранении новой версии модели)
    file_field.save(new_name, ContentFile(buffer.read()), save=False)
    return True
