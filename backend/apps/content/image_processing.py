"""Авто-обработка изображений: ресайз + конвертация в WebP.

Подключается через pre_save signal на всех моделях content.
"""
import io
import os
from pathlib import Path

from django.core.files.base import ContentFile
from django.db.models.fields.files import ImageFieldFile
from PIL import Image, ImageOps

# Целевое качество WebP. 78 — золотая середина между весом и качеством.
WEBP_QUALITY = 78

# Максимальная длинная сторона по умолчанию (px).
DEFAULT_MAX_DIMENSION = 1400

# Размеры подобраны под фактический viewport на сайте + 2x для retina.
# Слишком большие фото = долгая загрузка и плохой LCP.
FIELD_MAX_DIMENSION = {
    # Hero — десктоп ~1920px широкий, но фон, не критично — режем до 1600
    "hero_poster": 1600,
    # OG-картинка для шеринга
    "og_image": 1200,
    # Фото "Обо мне" — отображается ~600px → 1200 (2x retina)
    "about_photo": 1100,
    # Bento-плитки — отображаются ~320×320 → 640 (2x)
    "achievement_image": 700,
    # Карточки направлений — ~400 → 800
    "service_image": 900,
    # Кейсы — карточка ~660×440 → 1320 (2x)
    "case_image": 1200,
    # Отзывы — аватарка ~48px → 200 (2x с запасом)
    "testimonial_photo": 400,
    # Блог-обложка
    "blogpost_cover": 1400,
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

    if _is_already_webp(original_name):
        # Если уже webp — может, всё равно стоит ресайз сделать?
        # Делаем: открываем, ресайзим если больше лимита, пересохраняем.
        pass

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
    w, h = img.size
    longest = max(w, h)
    if longest > max_dim:
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
