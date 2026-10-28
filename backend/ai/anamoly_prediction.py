from pathlib import Path
import joblib
import pandas as pd

PROJECT_ROOT = Path(__file__).resolve().parents[1]

MODEL_PATH = PROJECT_ROOT / "ai" / "anomaly_model.pkl"
CONFIG_PATH = PROJECT_ROOT / "ai" / "anomaly_model_config.pkl"

model = joblib.load(MODEL_PATH)
config = joblib.load(CONFIG_PATH)

FEATURES = config["features"]
THRESHOLD = config["threshold"]


def predict_anomaly(sensor_values):

    temperature = sensor_values.get("temperature")
    humidity = sensor_values.get("humidity")

    if temperature is None or humidity is None:
        return {
            "status": "insufficient_data"
        }

    # Physical MQ-2 uses a different scale from the
    # smoke values used during model training.
    smoke = 0.019

    input_data = pd.DataFrame([{
        "temp": temperature,
        "humidity": humidity,
        "smoke": smoke
    }])

    score = model.decision_function(input_data)[0]

    return {
        "status": "success",
        "anomaly": bool(score < THRESHOLD),
        "anomaly_score": float(score)
    }