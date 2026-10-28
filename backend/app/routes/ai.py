
from datetime import datetime
from pathlib import Path

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.sensor import SensorData

# Update "anamoly" here if your anomaly script uses a different filename.
from ai.anamoly_prediction import predict_anomaly
from ai.occupancy_prediction import predict_from_sensor_values

router = APIRouter(prefix="/ai", tags=["AI Monitoring"])

# Used only when the database has no physical light reading.
# This is simulated input, not a real sensor measurement.
SIMULATED_LIGHT = 300.0


def get_latest_reading(db: Session, sensor_types: list[str]):
    return (
        db.query(SensorData)
        .filter(SensorData.type.in_(sensor_types))
        .order_by(SensorData.received_at.desc(), SensorData.id.desc())
        .first()
    )


@router.get("/predictions")
def get_predictions(db: Session = Depends(get_db)):
    temperature_reading = get_latest_reading(
        db, ["temperature", "temp"]
    )
    humidity_reading = get_latest_reading(
        db, ["humidity", "relative_humidity"]
    )
    motion_reading = get_latest_reading(
        db, ["motion", "pir", "occupancy"]
    )
    smoke_reading = get_latest_reading(
        db, ["smoke", "gas", "gas_level", "mq2"]
    )
    light_reading = get_latest_reading(
        db, ["light", "light_level", "lux", "ldr"]
    )

    temperature = (
        float(temperature_reading.value)
        if temperature_reading else None
    )
    humidity = (
        float(humidity_reading.value)
        if humidity_reading else None
    )
    motion = (
        int(motion_reading.value)
        if motion_reading else None
    )
    smoke = (
        float(smoke_reading.value)
        if smoke_reading else None
    )

    # Use real light data whenever available.
    # Simulate light only for the occupancy model if unavailable.
    light = (
        float(light_reading.value)
        if light_reading
        else SIMULATED_LIGHT
    )

    sensor_inputs = {
        "temperature": temperature,
        "humidity": humidity,
        "motion": motion,
        "light": light,
        "light_source": (
            "sensor" if light_reading else "simulated"
        ),
        "smoke": smoke,
    }

    # Run the trained anomaly model.
    try:
        anomaly_result = predict_anomaly(sensor_inputs)
    except Exception as exc:
        print(f"Anomaly inference failed: {exc}")
        anomaly_result = {
            "status": "error",
            "message": "Anomaly inference failed.",
            "anomaly": None,
            "anomaly_score": None,
        }

    # Run the trained occupancy model.
    try:
        occupancy_result = predict_from_sensor_values(sensor_inputs)
    except Exception as exc:
        print(f"Occupancy inference failed: {exc}")
        occupancy_result = {
            "status": "error",
            "message": "Occupancy inference failed.",
            "occupied": None,
            "occupancy_probability": None,
        }

    actions = []

    if (
        anomaly_result.get("status") == "success"
        and anomaly_result.get("anomaly") is True
    ):
        actions.append({
            "type": "anomaly_detected",
            "message": "The anomaly model flagged an unusual sensor pattern.",
            "created_at": datetime.utcnow().isoformat(),
        })

    if (
        occupancy_result.get("status") == "success"
        and occupancy_result.get("occupied") is True
    ):
        actions.append({
            "type": "occupancy_detected",
            "message": "The occupancy model predicts that the room is occupied.",
            "created_at": datetime.utcnow().isoformat(),
        })

    return {
        "status": "success",
        "generated_at": datetime.utcnow().isoformat(),
        "sensor_inputs": sensor_inputs,
        "occupancy": occupancy_result,
        "anomaly": anomaly_result,
        "actions": actions,
    }
