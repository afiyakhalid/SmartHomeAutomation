from fastapi import Depends
from fastapi import HTTPException

from fastapi.security import (
    HTTPBearer,
    HTTPAuthorizationCredentials
)

from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.user import User

from app.auth.jwt import verify_token


security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    token = credentials.credentials

    print("TOKEN:", token)   # ✅ correct place

    payload = verify_token(token)

    print("PAYLOAD:", payload)  # ✅ correct place

    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    email = payload.get("sub")

    user = db.query(User).filter(User.email == email).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return user

def get_current_admin(
    current_user: User = Depends(
        get_current_user
    )
):

    if current_user.role != "ADMIN":

        raise HTTPException(
            status_code=403,
            detail="Admins only"
        )

    return current_user