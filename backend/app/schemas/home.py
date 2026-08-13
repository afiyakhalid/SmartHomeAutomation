from pydantic import BaseModel


class HomeCreate(BaseModel):
    name: str


class HomeResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True