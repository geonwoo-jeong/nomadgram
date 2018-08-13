from django.urls import path

from nomadgram.users.views import (
    explore_users_view,
    follow_user_view,
)

app_name = "users"
urlpatterns = [
    path("explore", view=explore_users_view, name="explore_users"),
    path("<int:user_id>", view=follow_user_view, name="follow_user"),
]
