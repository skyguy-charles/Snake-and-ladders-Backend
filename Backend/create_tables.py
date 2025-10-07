from app import app
from db import db
from models import User, Game, Player, Snake, Ladder

with app.app_context():
    db.create_all()
    print("Database tables created successfully!")
