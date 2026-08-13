from .base_device import BaseDevice

class Fan(BaseDevice):
    def __init__(self, device_id):
        super().__init__(device_id, "fan")
        self.speed = 0

    def execute_command(self, command, value=None):
        if command == "turn_on":
            self.state = "ON"
            self.speed = 1

        elif command == "turn_off":
            self.state = "OFF"
            self.speed = 0

        elif command == "set_speed":
            if 1 <= value <= 5:
                self.speed = value

        return self.get_status()