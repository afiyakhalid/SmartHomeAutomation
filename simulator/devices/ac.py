from .base_device import BaseDevice

class AC(BaseDevice):
    def __init__(self, device_id):
        super().__init__(device_id, "ac")
        self.temperature = 24

    def execute_command(self, command, value=None):
        if command == "turn_on":
            self.state = "ON"

        elif command == "turn_off":
            self.state = "OFF"

        elif command == "set_temp":
            if 16 <= value <= 30:
                self.temperature = value

        return self.get_status()