from pydantic import BaseModel
from typing import Optional


class SensorSnapshot(BaseModel):

    room_id: int

    motion: Optional[bool] = None

    light_level: Optional[float] = None

    temperature: Optional[float] = None

    humidity: Optional[float] = None

    gas_level: Optional[float] = None

    door_open: Optional[bool] = None

    occupied: Optional[bool] = None