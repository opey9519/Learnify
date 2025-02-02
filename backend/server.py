# Dependencies
from flask import Flask, request, jsonify
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

# API route to get all flashcards


@app.route("/api/flashcards", methods=["GET"])
def get_flashcards():
    return jsonify(flashcards)


if __name__ == "__main__":
    app.run()
