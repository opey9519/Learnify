# Dependencies
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS


flashcards = {
    "set_info": {
        "set_title": "Animals",
        "num_cards": 2,
        "user": "Gavin",
        "cards": [
            {
                "id": 1,
                "question": "What is the fastest land animal?",
                "answer": "Cheetah"
            },
            {
                "id": 2,
                "question": "What is the tallest bird?",
                "answer": "North African Ostrich"
            }
        ]
    },
}

# Create instance of Flask
app = Flask(__name__)
CORS(app)  # Allows Flask API to handle requests to React App

# Configuring Flask to PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI # Imported from config
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODIFICATIONS # imported from config

# Creating SQLAlchemy Object
# Also creates engine automatically
db = SQLAlchemy(app) 


# User model for database
class User(db.Model):
    pass

# API route to get all flashcards
@app.route("/api/flashcards", methods=["GET"])
def get_flashcards():
    return jsonify(flashcards)


if __name__ == "__main__":
    app.run()
