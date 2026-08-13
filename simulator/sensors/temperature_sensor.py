
import random
from .base_sensor import BaseSensor


class TemperatureSensor(BaseSensor):
    def __init__(self, sensor_id):
        super().__init__(sensor_id, "temperature")

    def generate(self):
        return round(random.uniform(18, 35), 2)