from app.automation.engine import evaluate_automation


data = {
    "motion": True,
    "light_level": 100,
    "temperature": 29,
    "occupied": True,
    "gas_level": 100,
    "door_open": False
}


actions = evaluate_automation(data)


for action in actions:
    print(action)