from django.contrib import admin
from .models import Realtor, Listing, ListingPhoto


class ListingPhotoInline(admin.StackedInline):
  model = ListingPhoto
  extra = 0


class ListingAdmin(admin.ModelAdmin):
  list_display = ['address', 'city', 'state_province', 'postal_zip_code', 'price', 'bedrooms', 'bathrooms', 'open_house', 'is_published']
  list_editable = ['price', 'bedrooms', 'bathrooms', 'open_house', 'is_published']
  list_filter = ['realtor', 'home_type', 'is_published']
  list_per_page = 25
  prepopulated_fields = {'slug': ('address',)}
  inlines = [ListingPhotoInline]


admin.site.register(Realtor)
admin.site.register(Listing, ListingAdmin)
