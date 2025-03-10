# app/core/logging_config.py
import logging
from logging.handlers import RotatingFileHandler
from app.core.config import settings

# Create logger
logger = logging.getLogger("push_api_microservice")
logger.setLevel(logging.INFO)

# Define log format
formatter = logging.Formatter("%(asctime)s [%(levelname)s] %(name)s: %(message)s")

if settings.LOG_TO_CONSOLE:
    # Log only to the console (stdout)
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)
else:
    # Log to file with rotation: 1GB max per file, 3 backups
    file_handler = RotatingFileHandler("gps_microservice.log", maxBytes=1024*1024*1024, backupCount=3)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)
