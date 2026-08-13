from pydantic import BaseModel


class DeviceCreate(BaseModel):
    name: str
    type: str
    room_id: int
    status: bool = False

class DeviceResponse(BaseModel):
    id: int
    name: str
    type: str
    status: bool
    room_id: int

    class Config:
        from_attributes = True