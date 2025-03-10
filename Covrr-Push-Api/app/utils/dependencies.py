"""
Module: dependency.py

This module provides various utility functions and dependencies for the FastAPI application. It handles
the setup of Redis and Kafka connections, provides functions to interact with Redis for caching and streaming,
and includes helper functions for working with GPS and alarm data. The dependencies facilitate interaction
with the database, Redis cache, and Kafka message broker, enabling asynchronous processing of real-time data.

Functions:
----------
1. get_db():
    Provides an asynchronous SQLAlchemy session for database interactions. This function is intended for use
    with FastAPI's dependency injection system.

2. get_kafka_producer():
    Provides an asynchronous Kafka producer for sending messages to Kafka topics. It ensures that the producer
    is started and stopped correctly and handles any errors that occur during these operations.

3. cache_publish_device_heartbeat():
    Publishes heartbeat data for a device to a Redis channel. This function serializes the heartbeat data to JSON
    before publishing it.

4. cache_set_device_heartbeat():
    Stores heartbeat data in a Redis hash and sets an expiry for the individual device IMEI key.

5. get_company_vehicle_and_driver_data():
    Retrieves vehicle and driver information associated with a device IMEI from Redis.

6. save_raw_data():
    Saves raw JSON data to a SQLite database for testing or backup purposes.

7. store_alarm_in_redis():
    Stores alarm data in Redis using a composite key of IMEI and filename. The data is set with an expiration time.

8. fetch_alarm_from_redis():
    Fetches alarm data from Redis using a composite key of IMEI and filename. Returns the alarm data if found.

9. store_data_in_redis_stream():
    Stores data (e.g., GPS, alarm) in a Redis stream for real-time tracking or processing. It supports limiting
    the length of the stream.

10. delete_alarm_from_redis():
    Deletes alarm data from Redis based on the filename.

11. haversine():
    Calculates the great-circle distance between two points on the Earth's surface given their latitude and longitude.

12. get_previous_gps_data():
    Retrieves the previous GPS data for a specific device IMEI from Redis.

13. store_current_gps_data():
    Stores the current GPS data for a specific device IMEI in Redis.

Constants:
----------
- REDIS_PORT: The port used for the Redis connection, converted to an integer from the settings.
- redis_cache: An instance of Redis client configured with the appropriate URL based on the application settings.
- DATABASE_URL: URL for the SQLite database used for testing or local development.
- engine: SQLAlchemy engine created with the async connection to the SQLite database.
- SessionLocal: SQLAlchemy session maker for creating asynchronous database sessions.

Usage:
------
These functions are intended to be used as dependencies and utilities within the FastAPI application, allowing
for efficient handling of real-time data from GPS devices and alarms. They support caching, streaming, and storing
data, as well as interaction with external systems like Kafka and Redis.

Example:
--------
To use the Redis cache for storing heartbeat data:

    from dependency import cache_set_device_heartbeat

    await cache_set_device_heartbeat("123456789012345", heartbeat_data)

To get a Kafka producer and send a message:

    from dependency import get_kafka_producer

    kafka_producer = await get_kafka_producer()
    await kafka_producer.send_and_wait("topic_name", "message")
    await kafka_producer.stop()

Dependencies:
-------------
- FastAPI: Used for dependency injection.
- aiokafka: Kafka client for Python, supporting asynchronous communication with Kafka brokers.
- redis.asyncio: Redis client for asynchronous communication with Redis server.
- sqlalchemy.ext.asyncio: Provides support for asynchronous SQLAlchemy sessions and connections.
- json: Standard Python module for JSON serialization and deserialization.
- datetime: Standard Python module for date and time manipulation.
- math: Standard Python module for mathematical operations.
- app.core.config: Module for accessing application settings.
- app.core.logging_config: Module for logging configuration.
- app.core.models.raw_data: Module defining the RawData model for storing raw JSON data in the database.

"""
import redis.asyncio as aioredis
from app.core.config import settings
import json
from app.core.logging_config import logger


# Convert REDIS_PORT to int
REDIS_PORT = int(settings.REDIS_PORT)

# Initialize Redis connection using settings
if settings.REDIS_PASSWORD_REQUIRED:
    redis_url = f"redis://:{settings.REDIS_PASSWORD}@{settings.REDIS_HOST}:{REDIS_PORT}/0"
else:
    redis_url = f"redis://{settings.REDIS_HOST}:{REDIS_PORT}/0"

redis_cache = aioredis.from_url(redis_url)


async def push_data_in_redis_stream(imei: str,
                                     data: dict,
                                     stream_name: str = "vehicle_data_stream",
                                     maxlen: int = 10000):
    """
    Store GPS or other types of data in a Redis stream.

    :param imei: The IMEI number of the device.
    :param data: The data to store.
    :param stream_name: The name of the Redis stream (default: "vehicle_data_stream").
    :param data_type: The type of data being stored (e.g., "gps", "alarm").
    :param maxlen: The maximum length of the stream (default: 10000).
    """
    try:
        await redis_cache.xadd(
            name=stream_name,
            fields={
                "imei": imei,
                "data": json.dumps(data)
            },
            maxlen=maxlen,  # Optional: limit the stream length
            approximate=True
        )

        # Log success after storing data
        logger.info(
            f"Successfully stored data in Redis stream: {stream_name} for IMEI: {imei}")

    except Exception as e:
        logger.error(f"Error storing data in Redis stream {stream_name} for IMEI: {imei}")
        logger.error(f"ERROR : {str(e)}")
        raise  # Re-raise the exception so that upstream code can handle it.

