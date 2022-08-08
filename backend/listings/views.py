from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from django.db.models import Count
from .models import Listing
from .serializers import (
  ListingSerializer, 
  ListingDetailSerializer,
  ListingSearchSerializer
)


class ListingsView(ListAPIView):
  queryset = Listing.objects.filter(is_published=True)
  serializer_class = ListingSerializer


class ListingDetailView(RetrieveAPIView):
  permission_classes = [permissions.IsAuthenticated,]
  queryset = Listing.objects.filter(is_published=True)
  serializer_class = ListingDetailSerializer
  lookup_field = 'slug'


class ListingSearchView(ListAPIView):
  serializer_class = ListingSerializer

  def get_queryset(self):
    query_params = self.request.query_params

    serializer = ListingSearchSerializer(data=query_params)
    serializer.is_valid(raise_exception=True)

    validated_data = serializer.validated_data
    
    queryset = Listing.objects.annotate(num_photos=Count('listing_photos')).filter(
      sale_type=validated_data.get('sale_type'),
      home_type=validated_data.get('home_type'),
      bedrooms__gte=validated_data.get('bedrooms'),
      bathrooms__gte=validated_data.get('bathrooms'),
      open_house=validated_data.get('open_house'),
      price__gte=validated_data.get('price'),
      sqft__gte=validated_data.get('sqft'),
      num_photos__gte=validated_data.get('photo_count'),
      is_published=True
    ).order_by('-date_created')

    return queryset


# class ListingSearchView(APIView, PageNumberPagination):
#   def get(self, request):
#     serializer = ListingSearchSerializer(data=request.query_params)

#     if not serializer.is_valid():
#       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     validated_data = serializer.validated_data

#     queryset = Listing.objects.annotate(num_photos=Count('listing_photos')).filter(
#       sale_type=validated_data['sale_type'],
#       home_type=validated_data['home_type'],
#       bedrooms__gte=validated_data['bedrooms'],
#       bathrooms__gte=validated_data['bathrooms'],
#       open_house=validated_data['open_house'],
#       price__gte=validated_data['price'],
#       sqft__gte=validated_data['sqft'],
#       num_photos__gte=validated_data['listing_photos']
#     )

#     # listing_photos__count is the default without an alias

#     results = self.paginate_queryset(queryset, request, view=self)
#     queryset = ListingSerializer(results, many=True, context={'request': request})

#     return self.get_paginated_response(queryset.data)


# class ListingsSearchView(GenericAPIView):
#   def get(self, request):
#     queryset = Listing.objects.annotate(num_photos=Count('listing_photos')).filter(
#       sale_type=validated_data['sale_type'],
#       home_type=validated_data['home_type'],
#       bedrooms__gte=validated_data['bedrooms'],
#       bathrooms__gte=validated_data['bathrooms'],
#       open_house=validated_data['open_house'],
#       price__gte=validated_data['price'],
#       sqft__gte=validated_data['sqft'],
#       num_photos__gte=validated_data['listing_photos']
#     ).order_by('-date_created')

#     page = self.paginate_queryset(queryset)
#     serializer = ListingSerializer(page, many=True)
    
#     return self.get_paginated_response(serializer.data)
