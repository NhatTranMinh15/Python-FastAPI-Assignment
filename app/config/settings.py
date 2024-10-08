""" Application Settings Module
"""

import os

from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext

load_dotenv()


def get_connection_string(async_mode: bool = False) -> str:
    """Get the connection string for the database

    Returns:
        string: The connection string
    """
    engine = (
        os.environ.get("DB_ENGINE")
        if not async_mode
        else os.environ.get("ASYNC_DB_ENGINE")
    )
    dbhost = os.environ.get("DB_HOST")
    username = os.environ.get("DB_USERNAME")
    password = os.environ.get("DB_PASSWORD")
    dbname = os.environ.get("DB_NAME")
    return f"{engine}://{username}:{password}@{dbhost}/{dbname}"


# Database Setting
SQLALCHEMY_DATABASE_URL = get_connection_string()
SQLALCHEMY_DATABASE_URL_ASYNC = get_connection_string(async_mode=True)

ADMIN_DEFAULT_PASSWORD = os.environ.get("DEFAULT_PASSWORD")

# Auth Setting
JWT_SECRET = os.environ.get("JWT_SECRET")
JWT_ALGORITHM = os.environ.get("JWT_ALGORITHM")
oa2_bearer = OAuth2PasswordBearer(tokenUrl="/auth/token")
bcrypt_context = CryptContext(schemes=["bcrypt"])
