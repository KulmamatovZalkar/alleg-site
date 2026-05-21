"""Отправка уведомлений о новой заявке: Telegram + email.

Токены и адреса берутся из SiteSettings (Django admin), а не из env.
"""
import logging

import requests
from django.core.mail import send_mail

logger = logging.getLogger(__name__)


def _format_lead_message(lead) -> str:
    lines = [
        "🔥 <b>Новая заявка с сайта Alleg Kim</b>",
        "",
        f"👤 <b>Имя:</b> {lead.name}",
        f"📞 <b>Телефон:</b> {lead.phone}",
    ]
    if lead.email:
        lines.append(f"✉️ <b>Email:</b> {lead.email}")
    if lead.telegram:
        lines.append(f"💬 <b>Telegram / соцсеть:</b> {lead.telegram}")
    if lead.selected_tariff:
        lines.append(f"💼 <b>Тариф:</b> {lead.selected_tariff}")
    lines.append(f"📍 <b>Источник:</b> {lead.get_source_display()}")
    if lead.message:
        lines.append("")
        lines.append("📝 <b>Сообщение:</b>")
        lines.append(lead.message)
    lines.append("")
    lines.append(f"🕒 {lead.created_at.strftime('%d.%m.%Y %H:%M')}")
    return "\n".join(lines)


def send_telegram_notification(lead) -> None:
    """Отправляет уведомление в Telegram-бот. Токены берутся из SiteSettings."""
    from apps.content.models import SiteSettings

    settings_obj = SiteSettings.get_solo()
    token = settings_obj.telegram_bot_token
    chat_id = settings_obj.telegram_chat_id

    if not token or not chat_id:
        logger.info("Telegram-бот не настроен (нет токена или chat_id) — пропускаю.")
        return

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": _format_lead_message(lead),
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
    }
    try:
        response = requests.post(url, json=payload, timeout=10)
        if response.status_code != 200:
            logger.warning(
                "Telegram API вернул %s: %s", response.status_code, response.text
            )
    except requests.RequestException as exc:
        logger.exception("Ошибка отправки в Telegram: %s", exc)


def send_email_notification(lead) -> None:
    """Дублирует заявку на email-адреса из SiteSettings.notify_emails."""
    from apps.content.models import SiteSettings

    settings_obj = SiteSettings.get_solo()
    raw = settings_obj.notify_emails or ""
    emails = [e.strip() for e in raw.split(",") if e.strip()]
    if not emails:
        return

    subject = f"Новая заявка с сайта: {lead.name}"
    body_lines = [
        f"Имя: {lead.name}",
        f"Телефон: {lead.phone}",
    ]
    if lead.email:
        body_lines.append(f"Email: {lead.email}")
    if lead.telegram:
        body_lines.append(f"Telegram: {lead.telegram}")
    if lead.selected_tariff:
        body_lines.append(f"Тариф: {lead.selected_tariff}")
    body_lines.append(f"Источник: {lead.get_source_display()}")
    if lead.message:
        body_lines.append("")
        body_lines.append("Сообщение:")
        body_lines.append(lead.message)

    try:
        send_mail(
            subject=subject,
            message="\n".join(body_lines),
            from_email=None,  # DEFAULT_FROM_EMAIL
            recipient_list=emails,
            fail_silently=True,
        )
    except Exception as exc:
        logger.exception("Ошибка отправки email: %s", exc)


def notify_new_lead(lead) -> None:
    send_telegram_notification(lead)
    send_email_notification(lead)
