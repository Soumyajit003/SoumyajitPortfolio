import os
from pathlib import Path
from dotenv import load_dotenv

# Get the backend root directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from backend/.env
ENV_PATH = BASE_DIR/".env"
load_dotenv(ENV_PATH)

# Application configuration
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

MODEL_NAME = os.getenv("MODEL_NAME")

def validate_config():
    if not GROQ_API_KEY:
        raise ValueError("GROQ_API_KEY is missing. Check your .env file!!!")

