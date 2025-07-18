import os
from dotenv import load_dotenv
from urllib.parse import quote

# Disabled for production
# load_dotenv()  # Loads environment variables from external file

# Database credentials with Environment Variables
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = quote(os.getenv("DB_PASSWORD"))
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "learnify_db")
RENDER_EXTERNAL_URI = os.getenv("DATABASE_URI")

# Connection string SQLAlchemy uses to connect to PostgreSQL
# SQLALCHEMY_DATABASE_URI = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
SQLALCHEMY_DATABASE_URI = RENDER_EXTERNAL_URI
# Disables Flask-SQLAlchemy event tracking for performance
SQLALCHEMY_TRACK_MODIFICATIONS = False

# CORS Environment variable
CORS_ORIGIN = os.getenv("CORS_ORIGIN")

# JWT Environnment Variables - Set this in .env
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
# OpenAI API Key - Generate this from OpenAPI (https://openai.com/api/) and set in .env
OPEN_AI_KEY = os.getenv("OPEN_AI_KEY")
