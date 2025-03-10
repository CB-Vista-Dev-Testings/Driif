from fastapi import FastAPI
from app.api.routes import login_logout, heartbeat, gps, obd, \
    lbs, alarm, alarm_filelist, file_storage, \
    fault_info, trip_info, ftp_upload, pass_through
from app.core.config import settings
from app.core.logging_config import logger
from app.utils.dependencies import redis_cache

app = FastAPI()


@app.on_event("startup")
async def startup_event():
    logger.info("Starting up the FastAPI application")


@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down the FastAPI application")


@app.on_event("startup")
async def check_redis_connection_at_startup():
    """
    Called automatically by FastAPI when the application starts.
    If we cannot connect to Redis, raise an error to stop the app.
    """
    try:
        await redis_cache.ping()
    except Exception as ex:
        logger.error(f"Unexpected error connecting to Redis - {ex}")
        #print(f"Unexpected error connecting to Redis - {ex}", file=sys.stderr)
        raise SystemExit("Terminating app due to unexpected Redis Connection error.") from ex


# Include routers
app.include_router(login_logout.router, prefix=settings.API_V1_STR)
app.include_router(heartbeat.router, prefix=settings.API_V1_STR)
app.include_router(gps.router, prefix=settings.API_V1_STR)
app.include_router(obd.router, prefix=settings.API_V1_STR)
app.include_router(lbs.router, prefix=settings.API_V1_STR)
app.include_router(alarm.router, prefix=settings.API_V1_STR)
app.include_router(alarm_filelist.router, prefix=settings.API_V1_STR)
app.include_router(file_storage.router, prefix=settings.API_V1_STR)
app.include_router(fault_info.router, prefix=settings.API_V1_STR)
app.include_router(trip_info.router, prefix=settings.API_V1_STR)
app.include_router(ftp_upload.router, prefix=settings.API_V1_STR)
app.include_router(pass_through.router, prefix=settings.API_V1_STR)
