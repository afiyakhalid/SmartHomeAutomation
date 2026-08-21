from fastapi import APIRouter

from app.schemas.automation import SensorSnapshot
from app.automation.engine import evaluate_automation


router = APIRouter(
    prefix="/automation",
    tags=["Automation"]
)


@router.post("/evaluate")
def evaluate(
    sensor_data: SensorSnapshot
):

    actions = evaluate_automation(
        sensor_data.model_dump()
    )

    return {
        "actions": actions
    }