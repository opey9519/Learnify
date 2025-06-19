# Dependencies
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS, JWT_SECRET_KEY, OPEN_AI_KEY
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_jwt_extended import create_refresh_token
from datetime import datetime, timedelta, timezone
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import json
import openai

# Identity to fetch JWT token for Flask-Limiter (Uses IP Address if not found)


def get_identity():
    try:
        return get_jwt_identity() or get_remote_address()
    except Exception:
        return get_remote_address()


# Create instance of Flask
app = Flask(__name__)
# Allows Flask API to handle requests to React App
CORS(app, origins="http://localhost:5173")
limiter = Limiter(
    key_func=get_identity,
    app=app,
)

# OpenAPI Key from config
openai.api_key = OPEN_AI_KEY

# Configuring Flask to PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI  # Link Database
# Track modifications to database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODIFICATIONS
# JWT env key imported
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
# JWT Token expires after x time
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=15)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=7)
# app.config['JWT_TOKEN_LOCATION'] = ['cookies']
# Only allows cookies that contain your JWTs to be sent over HTTPs
# SET TO TRUE IN PRODUCTION
# app.config['JWT_COOKIE_SECURE'] = False
# SET TO TRUE IN PRODUCTION
# app.config['JWT_COOKIE_CSRF_PROTECT'] = False


# Creating objects
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


# User model for PostgreSQL database
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column(db.String(60))

    sets = db.relationship('FlashcardSet', backref='user',
                           cascade='all, delete-orphan')  # If User deleted, delete all FlashcardSets

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

# FlashcardSet Model (One-to-Many)


class FlashcardSet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    cards = db.relationship('Flashcard', backref='set',
                            cascade='all, delete-orphan')  # If FlashcardSet is deleted, delete all Flashcards

    def __repr__(self):
        return f"<FlashcardSet {self.title} - User {self.user_id}"

# Flashcard Model


class Flashcard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(255), nullable=False)
    answer = db.Column(db.String(255), nullable=False)
    set_id = db.Column(db.Integer, db.ForeignKey(
        'flashcard_set.id'), nullable=False)

    def __repr__(self):
        return f"<Flashcard Question {self.question} - Set {self.set_id}"

# Keep track of revoked JWT tokens


class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    token_type = db.Column(db.String(16), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)


################################################################ User Management ################################################################
# Blocklist callback
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()

    return token is not None

# Callback to refresh token within 30 minutes of expiring


# Handle Sign Up Process


@app.route('/signup', methods=['POST'])
@limiter.limit('5/minute')
def signUp():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')

    # Finds first existing username and email from JSON payload, if none - return none
    existing_user = User.query.filter(
        (User.username == username) | (User.email == email)).first()

    if existing_user:
        return jsonify({'message': 'User Already Exists'}), 409

    new_user = User(
        username=username,
        email=email
    )
    new_user.password = data.get('password')  # Calls setter to hash password

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User Successfully Created'}), 201

# Handle Login Authorization


@app.route("/signin", methods=["POST"])
@limiter.limit('10/minute')
def signin():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    existing_user = User.query.filter_by(username=username).first()

    if not existing_user or not existing_user.check_password(password):
        return jsonify({'message': 'Invalid Credentials'}), 401

    access_token = create_access_token(identity=username)
    refresh_token = create_refresh_token(identity=username)

    return jsonify({"access_token": access_token,
                    "refresh_token": refresh_token,
                    "username": username}), 200

# Refresh token before token expires


@app.route('/refresh', methods=["POST"])
@jwt_required()
def refresh():
    identity = get_jwt_identity()
    refresh_token = request.get_json().get("refresh_token")
    if not refresh_token:
        return jsonify({"message": "Invalid refresh token"}), 400

    access_token = create_access_token(identity=identity)

    return jsonify(access_token=access_token), 200

# Handle Logout
# Refresh and Access tokens


@app.route("/signout", methods=["POST"])
@jwt_required()
@limiter.limit('30/minute')
def signout():
    token = get_jwt()
    jti = token["jti"]
    ttype = token["type"]
    now = datetime.now(timezone.utc)

    refresh_jti = request.get_json().get("refresh_jti")

    db.session.add(TokenBlocklist(jti=jti, token_type=ttype, created_at=now))
    if refresh_jti:
        db.session.add(TokenBlocklist(jti=refresh_jti,
                       token_type="refresh", created_at=now))

    db.session.commit()
    response = jsonify({"message": f"Signed out and {ttype} token revoked"})
    return response, 200

#################################################################################################################################################

################################################################ Flashcard Set Management ################################################################

# Get all Flashcard sets


@app.route("/getflashcardsets", methods=["GET"])
@jwt_required()
def getFlashcardSets():
    # Authorization & get user_id associated w/ JWT Token
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    sets = FlashcardSet.query.filter_by(user_id=user.id).all()

    flashcard_sets = []

    for flash_set in sets:
        card_list = []
        for card in flash_set.cards:
            card_list.append({
                "id": card.id,
                "question": card.question,
                "answer": card.answer
            })

        flashcard_sets.append({
            "id": flash_set.id,
            "title": flash_set.title,
            "cards": card_list
        })

    return jsonify(flashcard_sets), 200

# Get specific Flashcard set


@app.route("/getflashcardset/<int:id>", methods=["GET"])
@jwt_required()
def getFlashcardSet(id):
    # Authorization and get respective user_id
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    if not user:
        return jsonify({"message": "User not found"}), 404
    user_id = user.id

    # Query and create flashcard set to return based on id's
    flash_set = FlashcardSet.query.filter_by(id=id, user_id=user_id).first()

    if not flash_set:
        return jsonify({'message': 'Flashcard set not found'}), 404

    card_list = []
    for card in flash_set.cards:
        card_list.append({
            "id": card.id,
            "question": card.question,
            "answer": card.answer
        })

    flashcard_set = {
        "id": flash_set.id,
        "title": flash_set.title,
        "cards": card_list
    }

    return jsonify(flashcard_set), 200


# Create Flashcard sets


@app.route("/createflashcardset", methods=["POST"])
@jwt_required()
def createFlashcardSet():
    username = get_jwt_identity()
    user = User.query.filter_by(username=username).first()
    user_id = user.id

    data = request.get_json()
    title = data.get('title')

    if not title:
        return jsonify({'message': 'Title required'}), 400

    flashcard_set = FlashcardSet(title=title, user_id=user_id)
    db.session.add(flashcard_set)
    db.session.commit()

    return jsonify({'message': 'Created Flashcard Set successfully', 'set_id': flashcard_set.id}), 201


# Edit FlashcardSet name
@app.route("/editflashcardset/<int:id>", methods=["PUT"])
@jwt_required()
def editFlashcardSet(id):
    # Authorization and get respective user_id
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404
    user_id = user.id

    # Query and create flashcard set to return based on id's
    flashcard_set = FlashcardSet.query.filter_by(
        id=id, user_id=user_id).first()

    if not flashcard_set:
        return jsonify({'message': 'Flashcard set not found'}), 404

    data = request.get_json()
    title = data.get('title')

    if not title or not title.strip():
        return jsonify({'message': 'Invalid title'}), 400

    flashcard_set.title = title.strip()
    db.session.commit()

    return jsonify({'message': 'Flashcard set title updated'}), 200

# Delete FlashcardSet


@app.route("/deleteflashcardset/<int:id>", methods=["DELETE"])
@jwt_required()
def deleteFlashcardSet(id):
    # Authorization and get respective user_id
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    user_id = user.id
    # Query and create flashcard set to return based on id's
    flashcard_set = FlashcardSet.query.filter_by(
        id=id, user_id=user_id).first()

    if not flashcard_set:
        return jsonify({"message": "Flashcard set not found"}), 404

    if flashcard_set.user_id != user_id:
        return jsonify({"message": "Unauthorized to delete this flashcard set"}), 403

    db.session.delete(flashcard_set)

    db.session.commit()

    return jsonify({"message": f"Flashcard set: {flashcard_set.title} successfully deleted"}), 200

#################################################################################################################################################


################################################################ Flashcard Management ################################################################

# Create Flashcard


@app.route('/createflashcard', methods=['POST'])
@jwt_required()
def createFlashcard():
    username = get_jwt_identity()
    user = User.query.filter_by(username=username).first()
    user_id = user.id

    data = request.get_json()
    question = data.get('question')
    answer = data.get('answer')
    set_id = data.get('set_id')

    if not FlashcardSet.query.filter_by(id=set_id, user_id=user_id).first():
        return jsonify({'message': 'Invalid Flashcard Set'}), 400

    if not question or not answer:
        return jsonify({'message': 'Question and Answer required'}), 400

    flashcard = Flashcard(question=question, answer=answer, set_id=set_id)
    db.session.add(flashcard)
    db.session.commit()

    return jsonify({'message': 'Created Flashcard successfully'}), 201

# Edit Flashcard


@app.route('/editflashcard/<int:id>', methods=['PUT'])
@jwt_required()
def editFlashcard(id):
    # Authorization and get respective user_id
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    if not user:
        return jsonify({"message": "User not found"}), 404
    user_id = user.id

    flashcard = Flashcard.query.filter_by(id=id).first()

    if not flashcard:
        return jsonify({"message": "Flashcard not found"}), 404

    if flashcard.set.user_id != user_id:
        return jsonify({"message": "Invalid"}), 400

    data = request.get_json()
    question = data.get('question')
    answer = data.get('answer')

    if question and answer:
        flashcard.question = question.strip()
        flashcard.answer = answer.strip()
    elif question and not answer:
        flashcard.question = question.strip()
    elif answer and not question:
        flashcard.answer = answer.strip()
    else:
        return jsonify({"message": "Invalid"}), 400

    db.session.commit()
    return jsonify({"message": "Flashcard updated successfully"}), 200

# Delete Flashcard


@app.route('/deleteflashcard/<int:id>', methods=['DELETE'])
@jwt_required()
def deleteFlashcard(id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    if not user:
        return jsonify({"message": "User not found"}), 404
    user_id = user.id

    flashcard = Flashcard.query.filter_by(id=id).first()

    if not flashcard:
        return jsonify({"message": "Flashcard not found"}), 404

    if flashcard.set.user_id != user_id:
        return jsonify({"message": "Unauthorized to delete this flashcard"}), 403

    db.session.delete(flashcard)

    db.session.commit()

    return jsonify({"message": f"Flashcard: {flashcard.id} successfully deleted"}), 200

# Generate flashcards using AI


@app.route('/generateflashcards', methods=['POST'])
@jwt_required()
@limiter.limit('7/minute')
def generateFlashcards():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    if not user:
        return jsonify({"message": "User not found"}), 404
    user_id = user.id

    data = request.get_json()
    prompt = data.get('prompt')
    num_cards = data.get('num_cards', 10)
    set_id = data.get('set_id')

    flash_set = FlashcardSet.query.filter_by(
        id=set_id, user_id=user_id).first()

    if not flash_set:
        return jsonify({"message": "Flashcard set not found"}), 404

    if not prompt or not prompt.strip():
        return jsonify({"message": "Invalid prompt"}), 400

    full_prompt = (
        f"Generate {num_cards} flashcards about the topic: '{prompt}'.\n"
        f"Format them as JSON list of objects like this:\n"
        f'[{{"question": "...", "answer": "..."}}]'
    )

    try:
        completion = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {'role': 'user', 'content': full_prompt}
            ],
            temperature=0.5,
            max_tokens=400
        )

        content = completion.choices[0].message.content

        # Checks if generated flashcards are correct format, otherwise throw error
        try:
            flashcards = json.loads(content)
            assert isinstance(flashcards, list)
        except Exception:
            return jsonify({"message": "Failed to parse flashcards. AI returned malformed JSON."}), 500

        for card in flashcards:
            new_flashcard = Flashcard(
                question=card["question"], answer=card["answer"], set_id=flash_set.id
            )
            db.session.add(new_flashcard)

        db.session.commit()

        return jsonify({'message': 'Created Flashcards successfully', 'set_id': flash_set.id}), 201

    except Exception as e:
        return jsonify({"message": "AI generation failed", "error": str(e)}), 500


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
