from django.db import models


class Realtor(models.Model):
  email = models.EmailField(unique=True, max_length=50)
  first_name = models.CharField(max_length=100)
  last_name = models.CharField(max_length=100)

  def __str__(self):
    return f'{self.first_name} {self.last_name}'


class Listing(models.Model):
  class SaleType(models.TextChoices):
    FOR_SALE = 'For Sale'
    FOR_RENT = 'For Rent'

  class HomeType(models.TextChoices):
    HOUSE = 'House'
    CONDO = 'Condo'
    TOWNHOUSE = 'Townhouse'

  address = models.CharField(max_length=255)
  slug = models.SlugField(unique=True)
  realtor = models.ForeignKey(Realtor, on_delete=models.SET_NULL, null=True)
  city = models.CharField(max_length=255)
  state_province = models.CharField(max_length=255)
  postal_zip_code = models.CharField(max_length=255)
  photo = models.ImageField(upload_to='listings/')
  price = models.IntegerField()
  bedrooms = models.IntegerField()
  bathrooms = models.DecimalField(max_digits=3, decimal_places=1)
  taxes = models.IntegerField()
  walk_score = models.IntegerField()
  mls_number = models.CharField(max_length=50)
  mls_source = models.CharField(max_length=50)
  sqft = models.IntegerField()
  sale_type = models.CharField(max_length=20, choices=SaleType.choices, default=SaleType.FOR_SALE)
  home_type = models.CharField(max_length=20, choices=HomeType.choices, default=HomeType.HOUSE)
  open_house = models.BooleanField(default=False)
  is_published = models.BooleanField(default=True)
  date_created = models.DateField(auto_now_add=True)

  def delete(self):
    self.photo.storage.delete(self.photo.name)
    super().delete()

  def __str__(self):
    return self.address


class ListingPhoto(models.Model):
  listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='listing_photos')
  photo = models.ImageField(upload_to='listings/')
  alt = models.CharField(max_length=120)

  def delete(self):
    self.photo.storage.delete(self.photo.name)
    super().delete()

  def __str__(self):
    return self.alt
