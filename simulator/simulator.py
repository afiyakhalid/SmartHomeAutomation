import time
import requests

from sensors.motion_sensor import MotionSensor
from sensors.humidity_sensor import HumiditySensor
from sensors.temperature_sensor import TemperatureSensor
from sensors.light_sensor import LightSensor
from sensors.smoke_sensor import SmokeSensor


API_URL = "http://127.0.0.1:8000/sensors/data"


sensors = [
    MotionSensor(1),
    HumiditySensor(2),
    TemperatureSensor(3),
    LightSensor(4),
    SmokeSensor(5)
]


def send_to_backend(data):
    try:
        requests.post(API_URL, json=data)
    except Exception as e:
        print("Error:", e)


def run():
    while True:
        print("\n--- Generating sensor data ---")

        for sensor in sensors:
            data = sensor.read()
            print(data)
            send_to_backend(data)

        time.sleep(3)  # every 3 seconds = fake real-time


if __name__ == "__main__":
    run()