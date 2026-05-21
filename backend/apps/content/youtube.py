"""Утилиты для работы с YouTube/Vimeo ссылками.

Принимаем любые ссылки от пользователя в админке:
- https://youtu.be/XXX
- https://www.youtube.com/watch?v=XXX
- https://www.youtube.com/embed/XXX
- https://www.youtube.com/shorts/XXX
- https://vimeo.com/123456
"""
import re
from typing import Optional, TypedDict


class VideoInfo(TypedDict):
    provider: str  # 'youtube' | 'vimeo' | ''
    video_id: str
    embed_url: str
    thumbnail: str


YT_PATTERNS = [
    re.compile(r"(?:youtube\.com/watch\?v=|youtu\.be/|youtube\.com/embed/|youtube\.com/shorts/)([A-Za-z0-9_-]{11})"),
]

VIMEO_PATTERN = re.compile(r"vimeo\.com/(?:video/)?(\d+)")


def parse_video_url(url: str) -> Optional[VideoInfo]:
    if not url:
        return None
    url = url.strip()

    for pattern in YT_PATTERNS:
        m = pattern.search(url)
        if m:
            vid = m.group(1)
            return VideoInfo(
                provider="youtube",
                video_id=vid,
                embed_url=f"https://www.youtube.com/embed/{vid}?rel=0&modestbranding=1",
                thumbnail=f"https://i.ytimg.com/vi/{vid}/maxresdefault.jpg",
            )

    m = VIMEO_PATTERN.search(url)
    if m:
        vid = m.group(1)
        return VideoInfo(
            provider="vimeo",
            video_id=vid,
            embed_url=f"https://player.vimeo.com/video/{vid}",
            thumbnail="",  # Vimeo требует API-запрос, оставим пустым
        )

    return None
