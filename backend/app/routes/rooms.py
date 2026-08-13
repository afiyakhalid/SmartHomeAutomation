from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.room import Room
from app.models.homes import Home
from app.schemas.room import RoomCreate


router = APIRouter(
    prefix="/rooms",
    tags=["Rooms"]
)


@router.get("/")
def get_rooms(
    db: Session = Depends(get_db)
):

    rooms = db.query(Room).all()

    return rooms


@router.post("/")
def create_room(
    room: RoomCreate,
    db: Session = Depends(get_db)
):

    home = db.query(Home).filter(
        Home.id == room.home_id
    ).first()

    if not home:
        raise HTTPException(
            status_code=404,
            detail="Home not found"
        )

    new_room = Room(
        name=room.name,
        home_id=room.home_id
    )

    db.add(new_room)
    db.commit()
    db.refresh(new_room)

    return new_room