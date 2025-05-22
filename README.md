# Learnify

Learnify is a full-stack web application built to enhance the studying experience through AI-powered and manual flashcard creation. It features a React frontend, a Python Flask backend, and PostgreSQL for robust relational database management.

# Tech Stack
Frontend: React, HTML, CSS, JavaScript <br/>
Backend: Python (Flask) <br/>
Database: PostgreSQL <br/>
ORM: SQLAlchemy <br/>

# Key Libraries/Tools
SQLAlchemy – Handles database interaction through ORM abstraction

Flask-CORS – Enables secure Cross-Origin Resource Sharing

Bcrypt – Hashes user passwords for secure authentication

JSON Web Tokens (JWT) – Implements secure, stateless user authentication

Flask-JWT-Extended – Manages JWT creation and validation

Axios – Frontend library for making HTTP requests

# Features
🔐 Secure user registration & login system using JWT and Bcrypt

📚 Create and view custom flashcard sets

🧠 Study mode with interactive flashcards (click to flip, navigate through cards)

⚙️ Dynamic frontend experience powered by React state and context (AuthContext)

🗂️ PostgreSQL-backed persistence of user data and flashcard content

🔄 Fully connected frontend and backend via REST API

## Setup Instructions
1. Clone repo
2. Set up `.env`
3. Run `pip install -r requirements.txt`
4. Run `python3 server.py from `/backend`
5. Run `npm run dev` from `/learnify`
