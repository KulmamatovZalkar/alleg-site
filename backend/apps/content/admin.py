from django.contrib import admin
from solo.admin import SingletonModelAdmin

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


@admin.register(SiteSettings)
class SiteSettingsAdmin(SingletonModelAdmin):
    fieldsets = (
        ("📞 Контакты и каналы связи", {
            "fields": (
                "whatsapp_number",
                "whatsapp_prefill",
                "telegram_username",
                "contact_email",
                "phone",
            ),
            "description": "Эти данные используются во всех CTA-кнопках на сайте.",
        }),
        ("🤖 Уведомления о заявках", {
            "fields": (
                "telegram_bot_token",
                "telegram_chat_id",
                "notify_emails",
            ),
            "description": (
                "Сюда придут уведомления о новых заявках с сайта. "
                "1) Создайте бота через @BotFather. "
                "2) Получите chat_id у @userinfobot. "
                "3) Напишите боту /start, чтобы он мог вам писать."
            ),
        }),
        ("🌐 Социальные сети", {
            "fields": (
                "instagram_url",
                "youtube_url",
                "facebook_url",
                "linkedin_url",
                "tiktok_url",
            ),
        }),
        ("🎬 Hero-блок (первый экран)", {
            "fields": (
                "hero_title",
                "hero_subtitle",
                "hero_description",
                "hero_primary_cta",
                "hero_secondary_cta",
            ),
        }),
        ("🖼 Hero — фон (видео / слайды / постер)", {
            "fields": (
                "hero_mode",
                "hero_video_url",
                "hero_poster",
                "hero_slide_interval",
            ),
            "description": (
                "В режиме «Автоматически» приоритет такой: видео → слайды → постер. "
                "Слайды добавляются отдельно в разделе «Слайды Hero»."
            ),
        }),
        ("👤 Блок 'Обо мне'", {
            "fields": (
                "about_title",
                "about_subtitle",
                "about_text",
                "about_photo",
                "about_photo_2",
                "about_photo_3",
                "about_video_url",
            ),
        }),
        ("🏢 Блок 'Проекты холдинга'", {
            "fields": (
                "projects_title",
                "projects_subtitle",
            ),
            "description": "Сами проекты добавляются ниже в разделе 'Проекты холдинга'.",
        }),
        ("🔍 SEO", {
            "fields": (
                "seo_title",
                "seo_description",
                "og_image",
            ),
        }),
    )


@admin.register(BusinessTourOffer)
class BusinessTourOfferAdmin(SingletonModelAdmin):
    fieldsets = (
        ("Основное", {
            "fields": ("is_active", "start_date", "location", "format_text"),
        }),
        ("Дедлайн и бонус", {
            "fields": ("deadline", "bonus_text", "prepayment_offer"),
        }),
    )


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1
    fields = ("image", "caption", "order")


@admin.register(HoldingProject)
class HoldingProjectAdmin(admin.ModelAdmin):
    list_display = ("name", "tagline", "location", "year_founded", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("name", "tagline", "description")
    inlines = [ProjectImageInline]
    fieldsets = (
        (None, {"fields": ("name", "tagline", "description")}),
        ("Медиа", {"fields": ("cover", "logo", "video_url")}),
        ("Ссылки и инфо", {"fields": ("site_url", "instagram_url", "location", "year_founded")}),
        ("Управление", {"fields": ("order", "is_active")}),
    )


class CaseImageInline(admin.TabularInline):
    model = CaseImage
    extra = 1
    fields = ("image", "caption", "order")


@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ("__str__", "alt", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("is_active",)
    fields = ("image", "alt", "order", "is_active")


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ("title", "subtitle", "size", "accent", "order", "is_active")
    list_editable = ("order", "is_active", "accent")
    list_filter = ("is_active", "size", "accent")
    search_fields = ("title", "subtitle")
    fieldsets = (
        (None, {"fields": ("title", "subtitle", "icon", "image")}),
        ("Внешний вид", {"fields": ("size", "accent")}),
        ("Управление", {"fields": ("order", "is_active")}),
    )


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "formula", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("title", "short_description")


@admin.register(Pain)
class PainAdmin(admin.ModelAdmin):
    list_display = ("text", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("is_active",)


@admin.register(Case)
class CaseAdmin(admin.ModelAdmin):
    list_display = (
        "client_name", "industry", "metric_before", "metric_after",
        "order", "is_active",
    )
    list_editable = ("order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("client_name", "industry")
    inlines = [CaseImageInline]
    fieldsets = (
        (None, {"fields": ("client_name", "industry")}),
        ("Описание", {"fields": ("challenge", "result", "quote")}),
        ("Метрики", {"fields": ("metric_before", "metric_after")}),
        ("Медиа", {"fields": ("image", "video_url")}),
        ("Управление", {"fields": ("order", "is_active")}),
    )


@admin.register(Tariff)
class TariffAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "is_highlight", "order", "is_active")
    list_editable = ("order", "is_active", "is_highlight")
    list_filter = ("is_active", "is_highlight")


@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ("number", "title", "duration", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("is_active",)


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "rating", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("is_active", "rating")
    search_fields = ("name", "role", "text")


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("question", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("question",)


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "is_published", "published_at")
    list_editable = ("is_published",)
    list_filter = ("is_published",)
    search_fields = ("title", "excerpt")
    prepopulated_fields = {"slug": ("title",)}
    fieldsets = (
        (None, {"fields": ("title", "slug", "excerpt")}),
        ("Медиа", {"fields": ("cover", "video_url")}),
        ("Содержание", {"fields": ("body",)}),
        ("Публикация", {"fields": ("is_published",)}),
    )
