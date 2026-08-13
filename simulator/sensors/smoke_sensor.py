import random
from .base_sensor import BaseSensor


class SmokeSensor(BaseSensor):
    def __init__(self, sensor_id):
        super().__init__(sensor_id, "smoke")

    def generate(self):
        return random.choice([0, 0, 0, 1])