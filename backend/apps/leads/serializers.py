from rest_framework import serializers

from .models import Lead


class LeadCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = (
            "id",
            "name",
            "phone",
            "email",
            "telegram",
            "message",
            "source",
            "selected_tariff",
            "honeypot",
        )
        extra_kwargs = {
            "name": {"required": True},
            "phone": {"required": True},
        }

    def validate(self, attrs):
        # honeypot — если заполнен, это бот. Тихо притворимся, что всё ок,
        # но не сохраним.
        if attrs.get("honeypot"):
            raise serializers.ValidationError({"detail": "spam_detected"})
        return attrs

    def validate_name(self, value):
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError("Имя слишком короткое.")
        return value

    def validate_phone(self, value):
        value = value.strip()
        if len(value) < 5:
            raise serializers.ValidationError("Введите корректный номер.")
        return value
