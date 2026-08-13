from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.homes import Home
from app.schemas.home import HomeCreate


router = APIRouter(
    prefix="/homes",
    tags=["Homes"]
)


@router.get("/")
def get_homes(
    db: Session = Depends(get_db)
):

    homes = db.query(Home).all()

    return homes


@router.post("/")
def create_home(
    home: HomeCreate,
    db: Session = Depends(get_db)
):

    new_home = Home(
        name=home.name
    )

    db.add(new_home)
    db.commit()
    db.refresh(new_home)

    return new_home