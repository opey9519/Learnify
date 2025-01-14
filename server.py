from flask import Flask

app = Flask(__name__)

@app.route('/flashcards')
def get_flashcards():
    pass