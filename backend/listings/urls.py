from django.urls import path
from .views import ListingsView, ListingDetailView, ListingSearchView


urlpatterns = [
  path('', ListingsView.as_view()),
  path('search', ListingSearchView.as_view()),
  path('<slug:slug>', ListingDetailView.as_view()),
]
