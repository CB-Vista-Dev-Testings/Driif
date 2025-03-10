import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# Load .env file from the root directory
load_dotenv(dotenv_path=os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../.env"))


class Settings(BaseSettings):
    API_V1_STR: str = os.getenv("API_V1_STR")
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    REDIS_HOST: str = os.getenv("REDIS_HOST")
    REDIS_PORT: int = os.getenv("REDIS_PORT")
    REDIS_PASSWORD_REQUIRED: bool = os.getenv("REDIS_PASSWORD_REQUIRED")
    REDIS_PASSWORD: str = os.getenv("REDIS_PASSWORD")

    # Logging configuration
    LOG_TO_CONSOLE: bool = os.getenv("LOG_TO_CONSOLE", False)
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")

    class Config:
        env_file = "../../.env"


settings = Settings()
