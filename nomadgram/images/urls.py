from django.urls import path
from nomadgram.images.views import (
    feed_view,
    image_like_view,
)


app_name = "images"
urlpatterns = [
    path("", view=feed_view, name="feed"),
    path("<int:image_id>/like", view=image_like_view, name="like_image"),
]
