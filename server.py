# Dependencies
from flask import Flask

# Objects & Variables
app = Flask(__name__)

# API Endpoints
# Get flashcards
@app.route('/flashcards')
def get_flashcards():
    pass

# Get progress to show progress of study
@app.route('/progress')
def get_progress():
    pass

# Add a flashcard to existing
@app.route('/flashcards')
def add_flashcard():
    pass

# Authenticate users for unique flashcards
@app.route('/login')
def authenticate_user():
    pass

# Register new users
@app.route('/register')
def register_user():
    pass