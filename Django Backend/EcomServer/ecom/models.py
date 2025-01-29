from mongoengine import Document, fields


class User(Document):
    email = fields.EmailField(required=True, unique=True)
    password = fields.StringField(required=True)
    fullName = fields.StringField()
    phoneNumber = fields.StringField()
    address = fields.StringField()
    city = fields.StringField()
    country = fields.StringField()
    zip = fields.StringField()
    is_admin = fields.BooleanField(default=False)

    meta = {"collection": "users", "versioning": {"enabled": False}}


class Product(Document):
    productName = fields.StringField(required=True)
    des = fields.StringField(required=True)
    price = fields.FloatField(required=True)
    color = fields.StringField(required=True)
    badge = fields.BooleanField(required=True)
    imageUrl = fields.StringField(required=True)

    meta = {"collection": "products", "versioning": False}

