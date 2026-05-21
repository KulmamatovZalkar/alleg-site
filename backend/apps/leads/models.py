from django.db import models


class Lead(models.Model):
    SOURCE_CHOICES = [
        ("hero", "Hero / главный CTA"),
        ("services", "Блок направлений"),
        ("tariff", "Тарифы"),
        ("business_tour", "Бизнес-тур"),
        ("contact_form", "Контактная форма"),
        ("popup", "Поп-ап"),
        ("footer", "Подвал"),
        ("other", "Другое"),
    ]

    name = models.CharField("Имя", max_length=150)
    phone = models.CharField("Телефон / WhatsApp", max_length=50)
    email = models.EmailField("Email", blank=True)
    telegram = models.CharField("Telegram / соцсеть", max_length=200, blank=True)
    message = models.TextField("Сообщение", blank=True)

    source = models.CharField(
        "Источник", max_length=30, choices=SOURCE_CHOICES, default="contact_form"
    )
    selected_tariff = models.CharField(
        "Выбранный тариф", max_length=100, blank=True
    )

    # honeypot — поле, заполненное ботом, помогает отсеять спам
    honeypot = models.CharField("Honeypot (служебное)", max_length=200, blank=True)

    # служебная инфа
    user_agent = models.CharField(max_length=500, blank=True)
    referer = models.CharField(max_length=500, blank=True)
    ip = models.GenericIPAddressField(blank=True, null=True)

    is_processed = models.BooleanField("Обработано", default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Заявка"
        verbose_name_plural = "Заявки с сайта"

    def __str__(self):
        return f"{self.name} — {self.phone} ({self.get_source_display()})"
