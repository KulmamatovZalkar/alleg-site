from rest_framework import serializers

from .models import (
    FAQ,
    Achievement,
    BlogPost,
    BusinessTourOffer,
    Case,
    CaseImage,
    HeroSlide,
    HoldingProject,
    Module,
    Pain,
    ProjectImage,
    Service,
    SiteSettings,
    Tariff,
    Testimonial,
)
from .youtube import parse_video_url


class RelativeMediaMixin:
    """Превращает абсолютные ссылки media в относительные `/media/...`."""

    def to_representation(self, instance):  # type: ignore[override]
        data = super().to_representation(instance)
        for k, v in list(data.items()):
            if isinstance(v, str) and v:
                idx = v.find("/media/")
                if idx > 0 and v[:idx].startswith(("http://", "https://")):
                    data[k] = v[idx:]
        return data


class VideoInfoMixin:
    """Прибавляет к сериализатору поле `video_info` для всех полей URL,
    оканчивающихся на _url и содержащих 'video' или равных video_url.
    """

    video_url_fields: list[str] = []

    def to_representation(self, instance):  # type: ignore[override]
        data = super().to_representation(instance)
        for field_name in self.video_url_fields:
            url = data.get(field_name)
            info = parse_video_url(url) if url else None
            data[f"{field_name}_info"] = info
        return data


class SiteSettingsSerializer(VideoInfoMixin, RelativeMediaMixin, serializers.ModelSerializer):
    whatsapp_link = serializers.SerializerMethodField()
    video_url_fields = ["hero_video_url", "about_video_url"]

    class Meta:
        model = SiteSettings
        exclude = ("telegram_bot_token", "telegram_chat_id", "notify_emails")

    def get_whatsapp_link(self, obj):
        if not obj.whatsapp_number:
            return ""
        from urllib.parse import quote
        return f"https://wa.me/{obj.whatsapp_number}?text={quote(obj.whatsapp_prefill or '')}"


class HeroSlideSerializer(RelativeMediaMixin, serializers.ModelSerializer):
    class Meta:
        model = HeroSlide
        fields = ("id", "image", "alt", "order")


class AchievementSerializer(RelativeMediaMixin, serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = "__all__"


class ServiceSerializer(RelativeMediaMixin, serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"


class PainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pain
        fields = "__all__"


class CaseImageSerializer(RelativeMediaMixin, serializers.ModelSerializer):
    class Meta:
        model = CaseImage
        fields = ("id", "image", "caption", "order")


class CaseSerializer(VideoInfoMixin, RelativeMediaMixin, serializers.ModelSerializer):
    gallery = CaseImageSerializer(many=True, read_only=True)
    video_url_fields = ["video_url"]

    class Meta:
        model = Case
        fields = "__all__"


class ProjectImageSerializer(RelativeMediaMixin, serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ("id", "image", "caption", "order")


class HoldingProjectSerializer(VideoInfoMixin, RelativeMediaMixin, serializers.ModelSerializer):
    gallery = ProjectImageSerializer(many=True, read_only=True)
    video_url_fields = ["video_url"]

    class Meta:
        model = HoldingProject
        fields = "__all__"


class TariffSerializer(RelativeMediaMixin, serializers.ModelSerializer):
    features_list = serializers.SerializerMethodField()

    class Meta:
        model = Tariff
        fields = "__all__"

    def get_features_list(self, obj):
        return [line.strip() for line in obj.features.splitlines() if line.strip()]


class ModuleSerializer(serializers.ModelSerializer):
    outcomes_list = serializers.SerializerMethodField()

    class Meta:
        model = Module
        fields = "__all__"

    def get_outcomes_list(self, obj):
        return [line.strip() for line in obj.outcomes.splitlines() if line.strip()]


class TestimonialSerializer(VideoInfoMixin, RelativeMediaMixin, serializers.ModelSerializer):
    video_url_fields = ["video_url"]

    class Meta:
        model = Testimonial
        fields = "__all__"


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = "__all__"


class BlogPostListSerializer(VideoInfoMixin, RelativeMediaMixin, serializers.ModelSerializer):
    video_url_fields = ["video_url"]

    class Meta:
        model = BlogPost
        fields = ("id", "title", "slug", "excerpt", "cover", "video_url", "video_url_info", "published_at")


class BlogPostDetailSerializer(VideoInfoMixin, RelativeMediaMixin, serializers.ModelSerializer):
    video_url_fields = ["video_url"]

    class Meta:
        model = BlogPost
        fields = "__all__"


class BusinessTourOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessTourOffer
        fields = "__all__"
