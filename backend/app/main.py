from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import Base
from app.database.db import engine

from app.models.user import User

from app.models.room import Room
from app.models.devices import Device
from app.models.homes import Home
from app.models.sensor import SensorData

from app.routes.devices import router as device_router
from app.routes.homes import router as home_router
from app.routes.rooms import router as room_router
from app.routes.auth import router as auth_router
from app.routes.sensors import router as sensor_router
from app.routes.automation import router as automation_router


Base.metadata.create_all(bind=engine)


app = FastAPI(title="Smart Home API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(device_router)
app.include_router(home_router)
app.include_router(room_router)
app.include_router(auth_router)
app.include_router(sensor_router)
app.include_router(automation_router)


@app.get("/")
def root():
    return {
        "message": "Smart Home API Running"
    }