from datetime import datetime, timedelta
from typing import Optional, Union, Any

def create_access_token(subject: Union[str, Any], expires_delta: timedelta = None) -> str:
    """
    Create JWT access token.
    STUB: Returns a dummy token string.
    """
    return "dummy_token_xyz"

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify password against hash.
    STUB: Always returns True for dev.
    """
    return plain_password == "password" # simplified stub

def get_password_hash(password: str) -> str:
    """
    Hash a password.
    STUB: Returns dummy hash.
    """
    return f"hashed_{password}"
