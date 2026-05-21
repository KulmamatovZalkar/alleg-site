from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Lead
from .notifications import notify_new_lead


@receiver(post_save, sender=Lead)
def on_lead_created(sender, instance: Lead, created: bool, **kwargs):
    if not created:
        return
    notify_new_lead(instance)
