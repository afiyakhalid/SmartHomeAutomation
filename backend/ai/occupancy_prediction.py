import joblib
import pandas as pd


MODEL_PATH = "ai/occupancy_model.pkl"
MODEL_INFO_PATH = "ai/occupancy_model_info.pkl"


# Load the trained model
model = joblib.load(MODEL_PATH)

# Load model information
model_info = joblib.load(MODEL_INFO_PATH)

FEATURES = model_info["features"]
THRESHOLD = model_info["threshold"]


def predict_occupancy(
    pir_1,
    pir_2,
    temperature,
    light
):
    """
    Predict occupancy using the trained Random Forest model.
    """

    input_data = pd.DataFrame([{
        "S6_PIR": pir_1,
        "S7_PIR": pir_2,
        "Avg_Temperature": temperature,
        "Avg_Light": light
    }])

    probability = model.predict_proba(input_data)[0][1]

    occupied = probability >= THRESHOLD

    return {
        "occupancy_probability": float(probability),
        "occupied": bool(occupied)
    }


# def predict_from_sensor_values(sensor_values):
#     """
#     Predict occupancy directly from the latest sensor readings.
#     """

#     motion = sensor_values.get("motion")
#     temperature = sensor_values.get("temperature")
#     light = sensor_values.get("light")

#     if motion is None or temperature is None or light is None:
#         return {
#             "status": "insufficient_data",
#             "message": "Motion, temperature and light readings are required."
#         }

#     # The trained model expects two PIR sensors.
#     # Our current system has one motion sensor,
#     # so the same motion value is used for both PIR inputs.
#     result = predict_occupancy(
#         pir_1=motion,
#         pir_2=motion,
#         temperature=temperature,
#         light=light
#     )

#     return {
#         "status": "success",
#         **result
#     }


def predict_from_sensor_values(sensor_values):
    """Determine occupancy using PIR first, then the trained model."""

    motion = sensor_values.get("motion")

    if motion is None:
        return {
            "status": "insufficient_data",
            "message": "No physical PIR reading is available.",
            "occupied": None,
            "occupancy_probability": None,
        }

    # PIR = 0 means display Unoccupied immediately.
    if float(motion) == 0:
        return {
            "status": "success",
            "occupied": False,
            "occupancy_probability": 0.0,
            "message": "No motion detected by the physical PIR sensor.",
        }

    temperature = sensor_values.get("temperature")
    light = sensor_values.get("light")

    if temperature is None or light is None:
        return {
            "status": "insufficient_data",
            "message": "Temperature and light are required when motion is detected.",
            "occupied": None,
            "occupancy_probability": None,
        }

    result = predict_occupancy(
        pir_1=motion,
        pir_2=motion,
        temperature=temperature,
        light=light,
    )

    return {
        "status": "success",
        **result,
    }
