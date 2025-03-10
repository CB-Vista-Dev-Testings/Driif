"""
Module: gps.py

This module handles incoming GPS data for vehicles. It provides an API endpoint to receive,
process, and store GPS data. The data includes attributes such as latitude, longitude,
timestamp, and acceleration status, which are used to monitor vehicle movements.

Functions:
----------
1. handle_gps_data(token: str, data_list: str, kafka_producer: AIOKafkaProducer, db: AsyncSession) -> dict:
    FastAPI endpoint to handle incoming GPS data. It processes each GPS data item by sending it to Kafka
    and storing it in the Redis cache.

2. process_gps_item(item: dict, kafka_producer: AIOKafkaProducer):
    Processes individual GPS data items. This includes fetching vehicle and driver details, calculating
    the distance traveled since the last GPS data point, and updating drive time and stop time based
    on acceleration status.

Dependencies:
-------------
- FastAPI for defining API routes and dependencies.
- aiokafka for asynchronous Kafka producer.
- SQLAlchemy's AsyncSession for database interactions.
- Custom utilities for handling Redis operations and time conversions.

"""
import json
from fastapi import APIRouter, Form
from app.core.logging_config import logger
from app.utils.dependencies import push_data_in_redis_stream


router = APIRouter()


@router.post("/pushgps")
async def handle_gps_data(
    token: str = Form(...),
    data_list: str = Form(...)
):
    """
    Endpoint to handle incoming GPS data for processing and storage.

    This endpoint receives GPS data, processes each GPS item, and stores the processed data in Kafka and a database.
    The GPS data is expected to be in JSON format and sent as a string in the `data_list` form parameter.

    Parameters:
    -----------
    token : str
        A string token for authentication or identification purposes, received from the client.

    data_list : str
        A string containing a JSON-encoded list of GPS data dictionaries. Each dictionary represents a GPS data point
        with various attributes like latitude, longitude, timestamp, and more.


    Behavior:
    ---------
    - Parses the JSON string `data_list` into a list of dictionaries.
    - Processes each GPS item asynchronously using the `process_gps_item` function, which sends the data to Kafka and possibly other systems.
    - Returns a success response if all tasks are completed successfully.

    Error Handling:
    ---------------
    - If JSON decoding fails, logs the error and returns a success response.
    - If any value-related errors occur, logs the error and returns a success response.
    - If any other exceptions are raised, logs the error and returns a success response.
    - In case of errors, raw GPS data is saved to the database for later inspection.

    Returns:
    --------
    dict
        A dictionary containing a status code and a message:
        - {"code": 0, "msg": "success"}: Indicates that the GPS data was successfully processed or saved, even if errors occurred.

    Example Request:
    ----------------
    A typical request to this endpoint might include a form with:
    - token: "your-auth-token"
    - data_list: '[{"deviceImei": "123456789012345", "lat": 37.7749, "lng": -122.4194, "gpsTime": "2024-08-24T12:00:00Z", "acc": 1}, ...]'

    Example Response:
    -----------------
    {
        "code": 0,
        "msg": "success"
    }

    """
    try:
        data_list_json = json.loads(data_list)

        for item in data_list_json:
            # Send the heartbeat to Redis Stream
            logger.info(f"GPS Data got : {item}")
            await push_data_in_redis_stream(
                item['deviceImei'],
                item,
                stream_name="gps_stream"
            )
        return {"code": 0, "msg": "success"}

    except json.JSONDecodeError as e:
        logger.error(f"Error decoding gps JSON data: {e}")
        return {"code": 0, "msg": "success"}
    except ValueError as e:
        logger.error(f"Error parsing gps data: {e}")
        return {"code": 0, "msg": "success"}
    except Exception as e:
        logger.error(f"Error processing gps data: {e}")
        return {"code": 0, "msg": "success"}

