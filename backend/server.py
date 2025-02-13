# Dependencies
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS, JWT_SECRET_KEY
from flask_jwt_extended import JWTManager, create_access_token, jwt_required

# Fake Database
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


# Configuring Flask to PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODIFICATIONS
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY

# Creating objects
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)  # Allows Flask API to handle requests to React App


# User model for PostgreSQL database
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column(db.String(60))

    @property
    def password(self):
        raise AttributeError("Password: write-only field")

    @password.setter
    def password(self, password):
        self._password_hash = bcrypt.generate_password_hash(
            password).decode("utf-8")

    def check_password(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
    
    def __repr__(self):
        return f"<User {self.username}>"


# Get all flashcards
@app.route("/api/flashcards", methods=["GET"])
def get_flashcards():
    return jsonify(flashcards)

# Handle Sign Up Process
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    user_exists = User.query.filter(
        (User.username == username) | (User.email == email)).first()
    if user_exists:
        return jsonify({"error": "User already exists"}), 400

    new_user = User(username=username, email=email)
    new_user.password = password

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

# Handle Login Authorization
@app.route("/login", methods=[""])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"message": "Invalid email or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token": access_token}), 200


if __name__ == "__main__":
    app.run(debug=True)