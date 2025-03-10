import json
from fastapi import APIRouter, Form
from app.core.logging_config import logger

router = APIRouter()


@router.post("/pushTerminalTransInfo")
async def handle_push_terminal_trans_info(
    token: str = Form(...),
    data_list: str = Form(...),
):
    try:
        data_list_json = json.loads(data_list)
        return {"code": 0, "msg": "success"}
    except json.JSONDecodeError as e:
        logger.error(f"Error decoding pushTerminalTransInfo JSON data: {e}")
        return {"code": 0, "msg": "success"}
    except ValueError as e:
        logger.error(f"Error parsing pushTerminalTransInfo data: {e}")
        return {"code": 0, "msg": "success"}
    except Exception as e:
        logger.error(f"Error processing pushTerminalTransInfo data: {e}")
        return {"code": 0, "msg": "success"}
