from django.urls import path
from nomadgram.images.views import (
    feed_view,
    image_like_view,
    image_unlike_view,
    comment_on_image_view,
    comment_view,
    search_view,
    moderate_comment_view,
)


app_name = "images"
urlpatterns = [
    path("", view=feed_view, name="feed"),
    path("<int:image_id>/like", view=image_like_view, name="like_image"),
    path("<int:image_id>/unlike", view=image_unlike_view, name="unlike_image"),
    path("<int:image_id>/comments", view=comment_on_image_view, name="comment_image"),
    path("<int:image_id>/comments/<int:comment_id>", view=moderate_comment_view, name="moderate_comment"),
    path("comments/<int:comment_id>", view=comment_view, name="comment"),
    path("search/", view=search_view, name="search"),
]
