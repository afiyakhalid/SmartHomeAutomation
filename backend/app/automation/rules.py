from typing import Optional


def motion_lighting_rule(
    motion: bool,
    light_level: float,
) -> Optional[dict]:

    if motion and light_level < 300:

        return {
            "action": "LIGHT_ON",
            "reason": "Motion detected in low light"
        }

    return None


def no_motion_lighting_rule(
    motion: bool,
    light_level: float,
) -> Optional[dict]:

    if not motion:

        return {
            "action": "LIGHT_OFF",
            "reason": "No motion detected"
        }

    return None


def temperature_fan_rule(
    temperature: float,
    occupied: bool,
) -> Optional[dict]:

    if temperature >= 28 and occupied:

        return {
            "action": "FAN_ON",
            "reason": "High temperature with occupancy"
        }

    return None


def temperature_fan_off_rule(
    temperature: float,
) -> Optional[dict]:

    if temperature < 26:

        return {
            "action": "FAN_OFF",
            "reason": "Temperature returned to normal"
        }

    return None


def gas_safety_rule(
    gas_level: float,
) -> Optional[dict]:

    if gas_level >= 400:

        return {
            "action": "GAS_ALERT",
            "devices": [
                "EXHAUST_ON",
                "BUZZER_ON"
            ],
            "reason": "Abnormal gas/smoke level detected"
        }

    return None


def door_lighting_rule(
    door_open: bool,
) -> Optional[dict]:

    if door_open:

        return {
            "action": "LIGHT_ON",
            "reason": "Entrance door opened"
        }

    return {
        "action": "LIGHT_OFF",
        "reason": "Entrance door closed"
    }