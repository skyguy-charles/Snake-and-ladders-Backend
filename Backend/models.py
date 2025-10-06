from db import db

class Game(db.Model):
    __tablename__ = "games"   # plural table name is best practice
    id = db.Column(db.Integer, primary_key=True)  # PRIMARY KEY
    name = db.Column(db.String(100), nullable=False)
    is_finished = db.Column(db.Boolean, default=False)
    current_turn = db.Column(db.Integer, default=0)

    players = db.relationship("Player", backref="game", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "is_finished": self.is_finished,
            "current_turn": self.current_turn,
            "players": [p.to_dict() for p in self.players]
        }

class Player(db.Model):
    __tablename__ = "players"
    id = db.Column(db.Integer, primary_key=True)  # 🔑 PRIMARY KEY
    name = db.Column(db.String(100), nullable=False)
    position = db.Column(db.Integer, default=1)

    game_id = db.Column(db.Integer, db.ForeignKey("games.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "position": self.position,
            "game_id": self.game_id
        }
























