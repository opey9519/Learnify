# Dependencies
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


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
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://learnify_user:securepassword@localhost/learnify_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app) # Creating SQLAlchemy Object


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"


# API route to get all flashcards
@app.route("/api/flashcards", methods=["GET"])
def get_flashcards():
    return jsonify(flashcards)


if __name__ == "__main__":
    app.run()
