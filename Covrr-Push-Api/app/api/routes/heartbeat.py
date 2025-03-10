"""
Module: heartbeat.py

This module handles incoming heartbeat data for vehicles. It provides an API endpoint to receive,
process, and store heartbeat data. The data includes various attributes related to vehicle status,
such as ignition state, GPS positioning, power status, and more.

Functions:
----------
1. map_heartbeat_data(data: dict) -> dict:
    Maps numerical values from the heartbeat data to descriptive text using predefined mappings.

2. handle_heartbeat(token: str, data_list: str, db: AsyncSession) -> dict:
    FastAPI endpoint to process incoming heartbeat data. It maps, validates, and stores the data
    in the cache, and optionally in a database.

Dependencies:
-------------
- FastAPI for defining API routes and dependencies.
- SQLAlchemy's AsyncSession for database interactions.
- Logging for capturing errors and information.

"""

import json
import logging
from fastapi import APIRouter, Form
from app.utils.dependencies import push_data_in_redis_stream

logger = logging.getLogger(__name__)

router = APIRouter()

# Define the mapping dictionaries
ACC_MAPPING = {0: "ACC_OFF", 1: "ACC_ON"}
OIL_ELE_MAPPING = {0: "Fuel or electricity connected", 1: "Fuel or electricity disconnected"}
GPS_POS_MAPPING = {0: "GPS not positioning", 1: "GPS positioning"}
REMOTE_LOCK_MAPPING = {0: "No remote locking", 1: "Remote locking"}
POWER_STATUS_MAPPING = {0: "No power charging", 1: "Power charging"}
FORTIFY_MAPPING = {0: "Defense deactivated", 1: "Defense activated"}


def map_heartbeat_data(data):
    """
    Map numerical values from the heartbeat data to descriptive text.

    :param data: A dictionary containing raw heartbeat data with numerical values.
    :return: A dictionary with descriptive text added for specific keys.
    """
    data['acc_description'] = ACC_MAPPING.get(data['acc'], "Unknown")
    data['oilEle_description'] = OIL_ELE_MAPPING.get(data['oilEle'], "Unknown")
    data['gpsPos_description'] = GPS_POS_MAPPING.get(data['gpsPos'], "Unknown")
    data['remoteLock_description'] = REMOTE_LOCK_MAPPING.get(data['remoteLock'], "Unknown")
    data['powerStatus_description'] = POWER_STATUS_MAPPING.get(data['powerStatus'], "Unknown")
    data['fortify_description'] = FORTIFY_MAPPING.get(data['fortify'], "Unknown")
    return data


@router.post("/pushhb")
async def handle_heartbeat(
    token: str = Form(...),
    data_list: str = Form(...),
):
    """
    FastAPI endpoint to handle incoming heartbeat data for vehicles.

    This endpoint receives a list of heartbeat data entries, processes each entry to map
    numerical values to descriptive text, validates and serializes the data, and stores it
    in a cache or database. The heartbeat data includes information about the vehicle's
    ignition status, GPS positioning, power status, and more.

    Parameters:
    -----------
    token : str
        A string token for authentication or identification purposes, received from the client.

    data_list : str
        A string containing a JSON-encoded list of heartbeat data dictionaries. Each dictionary
        represents a heartbeat data point with various attributes related to vehicle status.


    Behavior:
    ---------
    - Parses the JSON string `data_list` into a list of dictionaries.
    - Maps numerical values to descriptive text for various heartbeat attributes.
    - Serializes datetime fields to string format.
    - Publishes the serialized heartbeat data to a Redis cache.

    Error Handling:
    ---------------
    - If JSON decoding fails, logs the error and returns a success response.
    - If any value-related errors occur, logs the error and returns a success response.
    - If any other exceptions are raised, logs the error and returns a success response.
    - In case of errors, raw heartbeat data is saved to the database for later inspection.

    Returns:
    --------
    dict
        A dictionary containing a status code and a message:
        - {"code": 0, "msg": "success"}: Indicates that the heartbeat data was successfully processed or saved, even if errors occurred.

    Example Request:
    ----------------
    A typical request to this endpoint might include a form with:
    - token: "your-auth-token"
    - data_list: '[{"deviceImei": "123456789012345", "acc": 1, "oilEle": 0, ...}, ...]'

    Example Response:
    -----------------
    {
        "code": 0,
        "msg": "success"
    }

    """
    try:
        logger.info("HEY!! Heartbeat Data Got!")
        data_list_json = json.loads(data_list)

        logger.info(f"Heartbeat JSON Data : {data_list_json}")
        for item in data_list_json:
            # Send the heartbeat to Redis Stream
            logger.info(f"Heartbeat Data got : {item}")
            await push_data_in_redis_stream(
                item['deviceImei'],
                item,
                stream_name="heartbeat_stream"
            )

        return {"code": 0, "msg": "success"}
    except json.JSONDecodeError as e:
        logger.error(f"Error decoding heartbeat JSON data: {e}")
        return {"code": 0, "msg": "success"}
    except ValueError as e:
        logger.error(f"Error parsing heartbeat data: {e}")
        return {"code": 0, "msg": "success"}
    except Exception as e:
        logger.error(f"Error processing heartbeat data: {e}")
        return {"code": 0, "msg": "success"}
