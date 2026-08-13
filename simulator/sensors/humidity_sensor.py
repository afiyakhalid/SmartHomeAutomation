import random
from .base_sensor import BaseSensor


class HumiditySensor(BaseSensor):
    def __init__(self, sensor_id):
        super().__init__(sensor_id, "humidity")

    def generate(self):
        return round(random.uniform(30, 80), 2)