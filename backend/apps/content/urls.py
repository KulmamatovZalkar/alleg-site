from django.urls import path

from .views import BlogDetailView, BlogListView, HomePageView, SiteSettingsView

urlpatterns = [
    path("home/", HomePageView.as_view(), name="home-page"),
    path("settings/", SiteSettingsView.as_view(), name="site-settings"),
    path("blog/", BlogListView.as_view(), name="blog-list"),
    path("blog/<slug:slug>/", BlogDetailView.as_view(), name="blog-detail"),
]
