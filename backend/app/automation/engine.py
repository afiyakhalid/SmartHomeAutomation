from app.automation.rules import (
    motion_lighting_rule,
    no_motion_lighting_rule,
    temperature_fan_rule,
    temperature_fan_off_rule,
    gas_safety_rule,
    door_lighting_rule,
)


def evaluate_automation(sensor_data: dict):

    actions = []

    motion = sensor_data.get("motion")
    light_level = sensor_data.get("light_level")
    temperature = sensor_data.get("temperature")
    occupied = sensor_data.get("occupied")
    gas_level = sensor_data.get("gas_level")
    door_open = sensor_data.get("door_open")

    # -------------------------
    # Motion + Lighting
    # -------------------------

    if motion is not None and light_level is not None:

        action = motion_lighting_rule(
            motion,
            light_level
        )

        if action:
            actions.append(action)

        if not motion:

            action = no_motion_lighting_rule(
                motion,
                light_level
            )

            if action:
                actions.append(action)

    # -------------------------
    # Temperature + Fan
    # -------------------------

    if temperature is not None and occupied is not None:

        action = temperature_fan_rule(
            temperature,
            occupied
        )

        if action:
            actions.append(action)

    if temperature is not None:

        action = temperature_fan_off_rule(
            temperature
        )

        if action:
            actions.append(action)

    # -------------------------
    # Gas Safety
    # -------------------------

    if gas_level is not None:

        action = gas_safety_rule(
            gas_level
        )

        if action:
            actions.append(action)

    # -------------------------
    # Entrance
    # -------------------------

    if door_open is not None:

        action = door_lighting_rule(
            door_open
        )

        if action:
            actions.append(action)

    return actions