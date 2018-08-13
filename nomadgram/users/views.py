from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers


class ExploreUsers(APIView):

    def get(self, request, format=None):

        last_five = models.User.objects.all().order_by('-date_joined')[:5]

        serializer = serializers.ExploreUserSerializer(last_five, many=True)

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
