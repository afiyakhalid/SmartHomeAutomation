import random
from datetime import datetime


class BaseSensor:
    def __init__(self, sensor_id, sensor_type):
        self.sensor_id = sensor_id
        self.sensor_type = sensor_type

    def generate(self):
        raise NotImplementedError

    def read(self):
        return {
            "sensor_id": self.sensor_id,
            "type": self.sensor_type,
            "value": self.generate(),
            "timestamp": datetime.utcnow().isoformat()
        }