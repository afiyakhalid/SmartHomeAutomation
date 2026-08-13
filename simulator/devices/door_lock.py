from .base_device import BaseDevice

class DoorLock(BaseDevice):
    def __init__(self, device_id):
        super().__init__(device_id, "door_lock")
        self.state = "LOCKED"

    def execute_command(self, command, value=None):
        if command == "lock":
            self.state = "LOCKED"

        elif command == "unlock":
            self.state = "UNLOCKED"

        return self.get_status()