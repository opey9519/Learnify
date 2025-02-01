# Dependencies
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/newuser')
def get_new_user():
    pass
