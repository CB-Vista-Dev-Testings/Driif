import json
from fastapi import APIRouter, Form
from app.core.logging_config import logger

router = APIRouter()

@router.post("/pushfaultinfo")
async def handle_push_fault_info(
    token: str = Form(...),
    data_list: str = Form(...),
):
    try:
        data_list_json = json.loads(data_list)
        return {"code": 0, "msg": "success"}
    except json.JSONDecodeError as e:
        logger.error(f"Error decoding pushfaultinfo JSON data: {e}")
        return {"code": 0, "msg": "success"}
    except ValueError as e:
        logger.error(f"Error parsing pushfaultinfo data: {e}")
        return {"code": 0, "msg": "success"}
    except Exception as e:
        logger.error(f"Error processing pushfaultinfo data: {e}")
        return {"code": 0, "msg": "success"}
