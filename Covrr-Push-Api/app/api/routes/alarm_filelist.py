import json
from fastapi import APIRouter, Form
from app.core.logging_config import logger

router = APIRouter()


@router.post("/pushIothubEvent")
async def handle_push_iot_hub_event(
    token: str = Form(...),
    data_list: str = Form(...)
):
    try:
        data_list_json = json.loads(data_list)
        return {"code": 0, "msg": "success"}
    except json.JSONDecodeError as e:
        logger.error(f"Error decoding pushIothubEvent JSON data: {e}")
        return {"code": 0, "msg": "success"}
    except ValueError as e:
        logger.error(f"Error parsing pushIothubEvent data: {e}")
        return {"code": 0, "msg": "success"}
    except Exception as e:
        logger.error(f"Error processing pushIothubEvent data: {e}")
        return {"code": 0, "msg": "success"}

