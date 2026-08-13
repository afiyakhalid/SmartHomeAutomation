from .base_device import BaseDevice

class Curtain(BaseDevice):
    def __init__(self, device_id):
        super().__init__(device_id, "curtain")
        self.position = "CLOSED"

    def execute_command(self, command, value=None):
        if command == "open":
            self.position = "OPEN"

        elif command == "close":
            self.position = "CLOSED"

        return self.get_status()