"""
Module: push_alarm.py

This module handles incoming alarm data from vehicles. It provides an API endpoint to receive,
process, and store alarm data. The data includes alert types, descriptions, and file names which
are used to monitor and respond to various vehicle and driver-related events.

Functions:
----------
1. handle_push_alarm(token: str, data_list: str, kafka_producer: AIOKafkaProducer, db: AsyncSession) -> dict:
    FastAPI endpoint to handle incoming alarm data. It processes each alarm data item by sending it to Kafka
    and storing it in the Redis cache.

2. process_item(item: dict, kafka_producer: AIOKafkaProducer):
    Processes individual alarm data items. This includes fetching vehicle and driver details, mapping alert types to descriptions,
    and handling special cases based on alert types (e.g., downloading files and uploading to S3).

Dependencies:
-------------
- FastAPI for defining API routes and dependencies.
- aiokafka for asynchronous Kafka producer.
- SQLAlchemy's AsyncSession for database interactions.
- Custom utilities for handling Redis operations, S3 interactions, and time conversions.
"""
import json
from datetime import datetime
from fastapi import APIRouter, Form
from app.utils.dependencies import push_data_in_redis_stream
from app.core.logging_config import logger

router = APIRouter()


def get_current_timestamp():
    """Returns the current date and time as a formatted string."""
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')


@router.post("/pushalarm")
async def handle_push_alarm(
        token: str = Form(...),
        data_list: str = Form(...),
):
    """
    Endpoint to handle incoming alarm data for publishing to Redis Stream.
    The alarm data is published to Redis streams for processing by the alarmAPI microservice.

    Parameters:
    -----------
    token : str
        A string token for authentication or identification purposes, received from the client.

    data_list : str
        A string containing a JSON-encoded list of alarm data dictionaries. Each dictionary represents an alarm event.

    Returns:
    --------
    dict
        A dictionary containing a status code and a message:
        - {"code": 0, "msg": "success"}: Indicates that the alarm data was successfully published to Redis streams.
    """
    try:
        # logger.info(f">>> {get_current_timestamp()} - Received pushalarm request with token: {token}")
        data_list_json = json.loads(data_list)  # Convert data_list string to JSON

        for item in data_list_json:
            logger.info(f"Alarm Data got : {item}")
            # Send the heartbeat to Redis Stream
            await push_data_in_redis_stream(
                item['imei'],
                item,
                stream_name="alarm_stream"
            )

        logger.info(f"<<< {get_current_timestamp()} - Successfully published all alarm data to Redis streams")
        return {"code": 0, "msg": "success"}

    except json.JSONDecodeError as e:
        logger.error(f"!!! {get_current_timestamp()} - Error decoding pushalarm JSON data: {e}")
        return {"code": 0, "msg": "success"}
    except Exception as e:
        logger.error(f"!!! {get_current_timestamp()} - Error processing pushalarm data: {e}")
        return {"code": 0, "msg": "success"}
