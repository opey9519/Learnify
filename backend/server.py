# Dependencies
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS, JWT_SECRET_KEY
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from datetime import datetime, timedelta, timezone

# Fake Database
# flashcards = {
#     "set_info": {
#         "set_title": "Animals",
#         "num_cards": 2,
#         "user": "Gavin",
#         "cards": [
#             {
#                 "id": 1,
#                 "question": "What is the fastest land animal?",
#                 "answer": "Cheetah"
#             },
#             {
#                 "id": 2,
#                 "question": "What is the tallest bird?",
#                 "answer": "North African Ostrich"
#             }
#         ]
#     },
# }

# Create instance of Flask
app = Flask(__name__)


# Configuring Flask to PostgreSQL
ACCESS_EXPIRES = timedelta(hours=1)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODIFICATIONS
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = ACCESS_EXPIRES

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
    created_at = db.Column(db.DateTime, nullable=False)


################################################################ User Management ################################################################
# Blocklist callback
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()

    return token is not None

# Handle Sign Up Process


@app.route('/signup', methods=['POST'])
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

    return jsonify(access_token=access_token), 200

# Handle Logout


@app.route("/signout", methods=["POST"])
@jwt_required()
def signout():
    jti = get_jwt()["jti"]  # Search for JWT token ID
    now = datetime.now(timezone.utc)
    db.session.add(TokenBlocklist(jti=jti, created_at=now))
    db.session.commit()
    identity = get_jwt_identity()
    return jsonify({"message": f"JWT for {identity} Revoked"})

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

    return jsonify({'message': 'Flashcard title updated'}), 200

# Delete FlashcardSet


@app.route("/deleteflashcardset/<int:id>", methods=["DELETE"])
@jwt_required()
def deleteFlashcardSet(id):
    pass

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


@app.route('/editflashcard/<card_id>', methods=['PUT'])
@jwt_required()
def editFlashcard():
    pass

# Delete Flashcard


@app.route('/deleteflashcard/<card_id>', methods=['DELETE'])
@jwt_required()
def deleteFlashcard():
    pass


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
