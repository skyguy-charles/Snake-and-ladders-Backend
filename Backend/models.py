# models.py
from db import db

class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # auto-increment
    name = db.Column(db.String(100), nullable=False)
    is_finished = db.Column(db.Boolean, default=False)
    current_turn = db.Column(db.Integer, default=1)

    players = db.relationship("Player", backref="game", lazy=True)
    snakes = db.relationship("Snake", backref="game", lazy=True)
    ladders = db.relationship("Ladder", backref="game", lazy=True)

class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # auto-increment
    name = db.Column(db.String(50), nullable=False)
    position = db.Column(db.Integer, default=1)
    game_id = db.Column(db.Integer, db.ForeignKey("game.id"), nullable=False)

class Snake(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # auto-increment
    start = db.Column(db.Integer, nullable=False)
    end = db.Column(db.Integer, nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey("game.id"), nullable=False)

class Ladder(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # auto-increment
    start = db.Column(db.Integer, nullable=False)
    end = db.Column(db.Integer, nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey("game.id"), nullable=False)





























