from .base_device import BaseDevice

class Light(BaseDevice):
    def __init__(self, device_id):
        super().__init__(device_id, "light")
        self.brightness = 0

    def execute_command(self, command, value=None):
        if command == "turn_on":
            self.state = "ON"
            self.brightness = 70

        elif command == "turn_off":
            self.state = "OFF"
            self.brightness = 0

        elif command == "set_brightness":
            if 0 <= value <= 100:
                self.brightness = value

        return self.get_status()