from app import create_app, db, bcrypt
from models import User
import requests
import json

# Initialize Flask app context
app = create_app()
with app.app_context():
    # Create tables if they don't exist
    db.create_all()

    # Create test users
    users = [
        {"username": "alice", "password": "password123"},
        {"username": "bob", "password": "password456"}
    ]

    for u in users:
        existing_user = User.query.filter_by(username=u["username"]).first()
        if not existing_user:
            hashed_password = bcrypt.generate_password_hash(u["password"]).decode("utf-8")
            new_user = User(username=u["username"], password=hashed_password)
            db.session.add(new_user)
            print(f" User {u['username']} created")
        else:
            print(f"ℹ User {u['username']} already exists")

    db.session.commit()
    print(" All test users added!\n")

    # Now login as Alice to get JWT
    login_data = {"username": "alice", "password": "password123"}
    # Adjust the URL if your Flask app is running on a different host/port
    login_url = "http://127.0.0.1:5000/login"

    try:
        response = requests.post(login_url, json=login_data)
        if response.status_code == 200:
            token = response.json().get("token")
            print(" Login successful! JWT token for Alice:")
            print(token)
        else:
            print(f" Login failed! Status code: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(" Error connecting to backend:", e)
