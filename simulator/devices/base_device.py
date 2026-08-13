class BaseDevice:
    def __init__(self, device_id, name):
        self.device_id = device_id
        self.name = name
        self.state = "OFF"

    def get_status(self):
        return {
            "device_id": self.device_id,
            "name": self.name,
            "state": self.state
        }

    def execute_command(self, command: str, value=None):
        raise NotImplementedError