from rest_framework import generics, status
from rest_framework.response import Response

from .models import Lead
from .serializers import LeadCreateSerializer


def _client_ip(request):
    xff = request.META.get("HTTP_X_FORWARDED_FOR")
    if xff:
        return xff.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR")


class LeadCreateView(generics.CreateAPIView):
    serializer_class = LeadCreateSerializer
    queryset = Lead.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            # honeypot: возвращаем "успех", чтобы не палить ловушку
            if serializer.errors.get("detail") == ["spam_detected"]:
                return Response({"ok": True}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save(
            user_agent=request.META.get("HTTP_USER_AGENT", "")[:500],
            referer=request.META.get("HTTP_REFERER", "")[:500],
            ip=_client_ip(request),
        )
        return Response(
            {"ok": True, "id": serializer.data.get("id")},
            status=status.HTTP_201_CREATED,
        )
