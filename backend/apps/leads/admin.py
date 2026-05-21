from django.contrib import admin

from .models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = (
        "name", "phone", "email", "source", "selected_tariff",
        "is_processed", "created_at",
    )
    list_filter = ("is_processed", "source", "created_at")
    list_editable = ("is_processed",)
    search_fields = ("name", "phone", "email", "telegram", "message")
    readonly_fields = (
        "user_agent", "referer", "ip", "created_at",
        "name", "phone", "email", "telegram", "message",
        "source", "selected_tariff",
    )
    date_hierarchy = "created_at"

    fieldsets = (
        ("Контакт", {
            "fields": ("name", "phone", "email", "telegram"),
        }),
        ("Запрос", {
            "fields": ("source", "selected_tariff", "message"),
        }),
        ("Статус", {
            "fields": ("is_processed",),
        }),
        ("Служебное", {
            "classes": ("collapse",),
            "fields": ("user_agent", "referer", "ip", "created_at"),
        }),
    )

    def has_add_permission(self, request):
        return False
