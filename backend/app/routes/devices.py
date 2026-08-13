from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.devices import Device
from app.models.room import Room
from app.schemas.device import DeviceCreate

from app.auth.dependencies import (
    get_current_user,
    get_current_admin
)


router = APIRouter(
    prefix="/devices",
    tags=["Devices"]
)


@router.get("/")
def get_devices(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return db.query(Device).all()


@router.post("/")
def create_device(
    device: DeviceCreate,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):

    room = db.query(Room).filter(
        Room.id == device.room_id
    ).first()

    if not room:
        raise HTTPException(
            status_code=404,
            detail="Room not found"
        )

    new_device = Device(
        name=device.name,
        type=device.type,
        room_id=device.room_id,
        status=device.status
    )

    db.add(new_device)
    db.commit()
    db.refresh(new_device)

    return new_device


@router.get("/room/{room_id}")
def get_room_devices(
    room_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    room = db.query(Room).filter(
        Room.id == room_id
    ).first()

    if not room:
        raise HTTPException(
            status_code=404,
            detail="Room not found"
        )

    return db.query(Device).filter(
        Device.room_id == room_id
    ).all()


@router.get("/{device_id}")
def get_device(
    device_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    device = db.query(Device).filter(
        Device.id == device_id
    ).first()

    if not device:
        raise HTTPException(
            status_code=404,
            detail="Device not found"
        )

    return device


@router.put("/{device_id}/toggle")
def toggle_device(
    device_id: int,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):

    device = db.query(Device).filter(
        Device.id == device_id
    ).first()

    if not device:
        raise HTTPException(
            status_code=404,
            detail="Device not found"
        )

    device.status = not device.status

    db.commit()
    db.refresh(device)

    return device