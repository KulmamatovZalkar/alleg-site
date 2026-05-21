"""Авто-обработка изображений: ресайз + конвертация в WebP.

Подключается через pre_save signal на всех моделях content.
"""
import io
import os
from pathlib import Path

from django.core.files.base import ContentFile
from django.db.models.fields.files import ImageFieldFile
from PIL import Image, ImageOps

# Целевое качество WebP (80 — почти неотличимо от оригинала, в 5-10× легче)
WEBP_QUALITY = 82

# Максимальная длинная сторона по умолчанию (px).
DEFAULT_MAX_DIMENSION = 1920

# Тонкая настройка по полям: какое максимальное измерение использовать.
# Если поля нет в этом словаре — берётся DEFAULT_MAX_DIMENSION.
FIELD_MAX_DIMENSION = {
    # Hero / OG-картинка — большие
    "hero_poster": 1920,
    "og_image": 1200,
    # Фото "Обо мне" — портрет, среднего размера
    "about_photo": 1200,
    # Bento-плитки — небольшие
    "achievement_image": 1000,
    # Карточки направлений
    "service_image": 1200,
    # Кейсы — обложка
    "case_image": 1400,
    # Отзывы — аватарка, маленькая
    "testimonial_photo": 500,
    # Блог
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
