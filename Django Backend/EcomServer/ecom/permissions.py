import os
from pymongo import MongoClient
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import BaseAuthentication

client = MongoClient(os.getenv("CONNECTION_STRING"))
database = client[os.getenv("DATABASE")]
customuser_collection = database.customuser


def get_user_by_id(self, user_id):
return customuser_collection.find_one({"_id": ObjectId(user_id)})


class MongoDBAuthentication(BaseAuthentication):
"""
Class to authenticate incoming requests.
"""

def authenticate_user(self, token):
try:
# checking if token is blacklisted
black_list_collection.find(
{"token": token}
)
if black_list_collection is not None:
raise ExpiredSignatureError

# decoding token to get user_id from token payload
user_id = jwt.decode(token, os.getenv("JWT_PUBLIC_KEY"), algorithms=["RS256"])

if user_id and user_id["token_type"] == "access":
# get user object from CustomUser collection and return
user_obj = get_user_by_id(user_id["id"])
user_obj.pop("password")

return user_obj
else:
raise AuthenticationFailed(
_("Given token not valid for any token type."),
)
except InvalidSignatureError:
raise AuthenticationFailed(
_("Given token not valid for any token type."),
)

except ExpiredSignatureError:
raise AuthenticationFailed(
_("Token is invalid or expired."),
)

def authenticate(self, request):
auth_header = request.META.get('HTTP_AUTHORIZATION')
if auth_header:
key, token = auth_header.split(' ')


if key == 'Bearer':
user_data = self.authenticate_user(token)
if user_data:
user_data["is_authenticated"] = True
return parse_json(user_data), None
else:
return None
else:
raise AuthenticationFailed(
_("Authorization header must contain two space-delimited values."),
)

return None