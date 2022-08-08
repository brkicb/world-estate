from rest_framework import serializers
from .models import Listing, ListingPhoto


class ListingPhotoSerializer(serializers.ModelSerializer):
  class Meta:
    model = ListingPhoto
    fields = '__all__'


class ListingSerializer(serializers.ModelSerializer):
  photo = serializers.SerializerMethodField()

  class Meta:
    model = Listing
    fields = '__all__'
    depth = 1

  def get_photo(self, obj):
    request = self.context.get('request')
    photo = obj.photo.url

    return request.build_absolute_uri(photo)


class ListingDetailSerializer(ListingSerializer):
  listing_photos = ListingPhotoSerializer(many=True, read_only=True)


class ListingSearchSerializer(serializers.ModelSerializer):
  photo_count = serializers.IntegerField()

  class Meta:
    model = Listing
    fields = [
      'sale_type', 
      'home_type', 
      'bedrooms', 
      'bathrooms', 
      'open_house', 
      'price', 
      'sqft',
      'photo_count'
    ]
