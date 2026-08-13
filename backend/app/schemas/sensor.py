from pydantic import BaseModel
from typing import Optional


class SensorDataCreate(BaseModel):

    device_id: Optional[int] = None

    room_id: Optional[int] = None

    type: str

    value: float


class SensorDataResponse(BaseModel):

    device_id: Optional[int] = None

    room_id: Optional[int] = None

    type: str

    value: float

    received_at: str