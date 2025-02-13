import os
from dotenv import load_dotenv
from urllib.parse import quote

load_dotenv() # Loads environment variables from external file

# Database credentials with Environment Variables
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = quote(os.getenv("DB_PASSWORD", "your_secure_password"))
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "learnify_db")

# Connection string SQLAlchemy uses to connect to PostgreSQL
SQLALCHEMY_DATABASE_URI = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
SQLALCHEMY_TRACK_MODIFICATIONS = False # Disables Flask-SQLAlchemy event tracking for performance

# JWT Enviornment Variables
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")