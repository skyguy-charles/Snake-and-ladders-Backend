from db import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def to_dict(self):
        return {"id": self.id, "username": self.username}


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    current_turn = db.Column(db.Integer, default=0)
    is_finished = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "current_turn": self.current_turn,
            "is_finished": self.is_finished,
        }


class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    position = db.Column(db.Integer, default=0)
    game_id = db.Column(db.Integer, db.ForeignKey("game.id"))


class Snake(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start = db.Column(db.Integer, nullable=False)
    end = db.Column(db.Integer, nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey("game.id"))


class Ladder(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start = db.Column(db.Integer, nullable=False)
    end = db.Column(db.Integer, nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey("game.id"))







































