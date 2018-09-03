from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_auth.registration.views import SocialLoginView
from nomadgram.notifications import views as notifications_views
from . import models, serializers


class ExploreUsers(APIView):

    def get(self, request, format=None):

        last_five = models.User.objects.all().order_by('-date_joined')[:5]

        serializer = serializers.ListUserSerializer(last_five, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


explore_users_view = ExploreUsers.as_view()


class FollowUser(APIView):

    def post(self, request, user_id, format=None):

        user = request.user

        try:
            user_to_follow = models.User.objects.get(id=user_id)
        except models.User.objects.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user.following.add(user_to_follow)

        user.save()

        notifications_views.create_notification(user, user_to_follow, 'follow')

        return Response(status=status.HTTP_200_OK)


follow_user_view = FollowUser.as_view()


class UnFollowUser(APIView):

    def post(self, request, user_id, format=None):

        user = request.user

        try:
            user_to_follow = models.User.objects.get(id=user_id)
        except models.User.objects.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user.following.remove(user_to_follow)

        user.save()

        return Response(status=status.HTTP_200_OK)


unfollow_user_view = UnFollowUser.as_view()


class UserProfile(APIView):

    def get_user(self, username):
        try:
            found_user = models.User.objects.get(username=username)
            return found_user
        except models.User.DoesNotExist:
            return None

    def get(self, request, username, format=None):

        found_user = self.get_user(username)

        if found_user is None:

            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.UserProfileSerializer(found_user)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, username, format=None):

        user = request.user

        found_user = self.get_user(username)

        if found_user is None:

            return Response(status=status.HTTP_404_NOT_FOUND)

        elif found_user.username != user.username:

            return Response(status=status.HTTP_400_BAD_REQUEST)

        else:

            serializer = serializers.UserProfileSerializer(found_user, data=request.data, partial=True)

            if serializer.is_valid():

                serializer.save()

                return Response(data=serializer.data, status=status.HTTP_200_OK)

            else:

                return Response(data=serializer.error, status=status.HTTP_400_BAD_REQUEST)


user_profile_view = UserProfile.as_view()


class UserFollowers(APIView):

    def get(self, request, username, format=None):

        try:
            found_user = models.User.objects.get(username=username)
        except models.User.objects.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_followers = found_user.followers.all()

        serializer = serializers.ListUserSerializer(user_followers, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


user_followers_view = UserFollowers.as_view()


class UserFollowing(APIView):

    def get(self, request, username, format=None):

        try:
            found_user = models.User.objects.get(username=username)
        except models.User.objects.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_following = found_user.following.all()

        serializer = serializers.ListUserSerializer(user_following, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


user_following_view = UserFollowing.as_view()


class Search(APIView):

    def get(self, request, format=None):

        username = request.query_params.get('username', None)

        if username is not None:

            users = models.User.objects.filter(username__icontains=username)[:10]

            serializer = serializers.ListUserSerializer(users, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)

        else:

            return Response(status=status.HTTP_400_BAD_REQUEST)


user_search_view = Search.as_view()


class ChangePassword(APIView):

    def put(self, request, username, format=None):

        user = request.user

        if user.username == username:

            current_password = request.data.get('current_password', None)

            if current_password is not None:

                password_match = user.check_password(current_password)

                if password_match:

                    new_password = request.data.get('new_password', None)

                    if new_password is not None:

                        user.set_password(new_password)

                        user.save()

                        return Response(status=status.HTTP_200_OK)

                    else:

                        return Response(status=status.HTTP_400_BAD_REQUEST)

                else:

                    return Response(status=status.HTTP_400_BAD_REQUEST)

            else:

                return Response(status=status.HTTP_400_BAD_REQUEST)

        else:

            return Response(status=status.HTTP_400_BAD_REQUEST)


change_password_view = ChangePassword.as_view()


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


facebook_login_view = FacebookLogin.as_view()
