import random
from .base_sensor import BaseSensor


class MotionSensor(BaseSensor):
    def __init__(self, sensor_id):
        super().__init__(sensor_id, "motion")

    def generate(self):
        return random.choice([0, 1])