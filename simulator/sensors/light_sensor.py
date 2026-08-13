import random
from .base_sensor import BaseSensor


class LightSensor(BaseSensor):
    def __init__(self, sensor_id):
        super().__init__(sensor_id, "light")

    def generate(self):
        return random.randint(0, 1000)