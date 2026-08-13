from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from datetime import datetime, timezone

from app.database.db import get_db
from app.models.sensor import SensorData
from app.schemas.sensor import SensorDataCreate


router = APIRouter(
    prefix="/sensors",
    tags=["Sensors"]
)


@router.post("/data")
def receive_sensor_data(
    data: SensorDataCreate,
    db: Session = Depends(get_db)
):

    sensor = SensorData(
        device_id=data.device_id,
        room_id=data.room_id,
        type=data.type,
        value=data.value,
        received_at=datetime.now(timezone.utc)
    )

    db.add(sensor)
    db.commit()
    db.refresh(sensor)

    return {
        "status": "ok",
        "data": {
            "id": sensor.id,
            "device_id": sensor.device_id,
            "room_id": sensor.room_id,
            "type": sensor.type,
            "value": sensor.value,
            "received_at": sensor.received_at.isoformat()
        }
    }


@router.get("/data")
def get_sensor_data(
    db: Session = Depends(get_db)
):

    sensors = (
        db.query(SensorData)
        .order_by(SensorData.received_at.desc())
        .all()
    )

    return [
        {
            "id": sensor.id,
            "device_id": sensor.device_id,
            "room_id": sensor.room_id,
            "type": sensor.type,
            "value": sensor.value,
            "received_at": sensor.received_at.isoformat()
        }
        for sensor in sensors
    ]