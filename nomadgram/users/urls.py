from django.urls import path

from nomadgram.users.views import (
    explore_users_view,
    follow_user_view,
    unfollow_user_view,
    user_profile_view,
    user_followers_view,
)

app_name = "users"
urlpatterns = [
    path("explore", view=explore_users_view, name="explore_users"),
    path("<int:user_id>/follow", view=follow_user_view, name="follow_user"),
    path("<int:user_id>/unfollow", view=unfollow_user_view, name="unfollow_user"),
    path("<str:username>", view=user_profile_view, name="user_profile"),
    path("<str:username>/followers", view=user_followers_view, name="user_followers"),
]
