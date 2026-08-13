from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import DateTime

from app.database.db import Base


class SensorData(Base):

    __tablename__ = "sensor_data"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    device_id = Column(
        Integer,
        nullable=True
    )

    room_id = Column(
        Integer,
        nullable=True
    )

    type = Column(
        String,
        nullable=False
    )

    value = Column(
        Float,
        nullable=False
    )

    received_at = Column(
        DateTime,
        nullable=False
    )