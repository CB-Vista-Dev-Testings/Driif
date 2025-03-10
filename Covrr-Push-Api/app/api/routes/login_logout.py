import json
from fastapi import APIRouter, Form, Depends
from app.core.logging_config import logger

router = APIRouter()


@router.post("/pushevent")
async def handle_login_logout(
    token: str = Form(...),
    data_list: str = Form(...),
):
    try:
        # Parse the data_list as JSON
        data_list_json = json.loads(data_list)
        return {"code": 0, "msg": "success"}
    except json.JSONDecodeError as e:
        logger.error(f"Error decoding login/logout JSON data: {e}")
        return {"code": 0, "msg": "success"}
    except ValueError as e:
        logger.error(f"Error parsing login/logout data: {e}")
        return {"code": 0, "msg": "success"}
    except Exception as e:
        logger.error(f"Error processing login/logout data: {e}")
        return {"code": 0, "msg": "success"}
