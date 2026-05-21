from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    FAQ,
    Achievement,
    BlogPost,
    BusinessTourOffer,
    Case,
    HeroSlide,
    HoldingProject,
    Module,
    Pain,
    Service,
    SiteSettings,
    Tariff,
    Testimonial,
)
from .serializers import (
    AchievementSerializer,
    BlogPostDetailSerializer,
    BlogPostListSerializer,
    BusinessTourOfferSerializer,
    CaseSerializer,
    FAQSerializer,
    HeroSlideSerializer,
    HoldingProjectSerializer,
    ModuleSerializer,
    PainSerializer,
    ServiceSerializer,
    SiteSettingsSerializer,
    TariffSerializer,
    TestimonialSerializer,
)


class HomePageView(APIView):
    """Один endpoint, отдающий всё для главной страницы — меньше запросов с фронта."""

    def get(self, request):
        settings_obj = SiteSettings.get_solo()
        offer = BusinessTourOffer.get_solo()
        ctx = {"request": request}
        return Response(
            {
                "settings": SiteSettingsSerializer(settings_obj, context=ctx).data,
                "offer": BusinessTourOfferSerializer(offer, context=ctx).data,
                "hero_slides": HeroSlideSerializer(
                    HeroSlide.objects.filter(is_active=True), many=True, context=ctx
                ).data,
                "achievements": AchievementSerializer(
                    Achievement.objects.filter(is_active=True), many=True, context=ctx
                ).data,
                "services": ServiceSerializer(
                    Service.objects.filter(is_active=True), many=True, context=ctx
                ).data,
                "projects": HoldingProjectSerializer(
                    HoldingProject.objects.filter(is_active=True).prefetch_related("gallery"),
                    many=True, context=ctx,
                ).data,
                "pains": PainSerializer(
                    Pain.objects.filter(is_active=True), many=True, context=ctx
                ).data,
                "cases": CaseSerializer(
                    Case.objects.filter(is_active=True), many=True, context=ctx
                ).data,
                "tariffs": TariffSerializer(
                    Tariff.objects.filter(is_active=True), many=True, context=ctx
                ).data,
                "modules": ModuleSerializer(
                    Module.objects.filter(is_active=True), many=True, context=ctx
                ).data,
                "testimonials": TestimonialSerializer(
                    Testimonial.objects.filter(is_active=True), many=True, context=ctx
                ).data,
                "faqs": FAQSerializer(
                    FAQ.objects.filter(is_active=True), many=True, context=ctx
                ).data,
                "blog": BlogPostListSerializer(
                    BlogPost.objects.filter(is_published=True)[:6], many=True, context=ctx
                ).data,
            }
        )


class SiteSettingsView(generics.RetrieveAPIView):
    serializer_class = SiteSettingsSerializer

    def get_object(self):
        return SiteSettings.get_solo()


class BlogListView(generics.ListAPIView):
    serializer_class = BlogPostListSerializer
    queryset = BlogPost.objects.filter(is_published=True)


class BlogDetailView(generics.RetrieveAPIView):
    serializer_class = BlogPostDetailSerializer
    queryset = BlogPost.objects.filter(is_published=True)
    lookup_field = "slug"
