import json
from fastapi import APIRouter, Form
from app.core.logging_config import logger

router = APIRouter()


@router.post("/pushlbs")
async def handle_push_lbs(
    token: str = Form(...),
    data_list: str = Form(...),
):
    try:
        data_list_json = json.loads(data_list)
        return {"code": 0, "msg": "success"}
    except json.JSONDecodeError as e:
        logger.error(f"Error decoding pushlbs JSON data: {e}")
        return {"code": 0, "msg": "success"}
    except ValueError as e:
        logger.error(f"Error parsing pushlbs data: {e}")
        return {"code": 0, "msg": "success"}
    except Exception as e:
        logger.error(f"Error processing pushlbs data: {e}")
        return {"code": 0, "msg": "success"}
