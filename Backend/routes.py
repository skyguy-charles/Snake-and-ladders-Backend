# routes.py
from flask import Blueprint, request, jsonify
from db import db
from models import Game, Player, Snake, Ladder

bp = Blueprint("bp", __name__)  # Blueprint variable is now 'bp'

# --- GAMES ---
@bp.route("/games", methods=["POST","GET"])
def create_game():
    data = request.get_json()
    game = Game(name=data["name"])
    db.session.add(game)
    db.session.commit()
    return jsonify({"id": game.id, "name": game.name})

@bp.route("/games/<int:game_id>/players", methods=["GET"])
def get_players(game_id):
    players = Player.query.filter_by(game_id=game_id).all()
    return jsonify([{"id": p.id, "name": p.name, "position": p.position} for p in players])

# --- PLAYERS ---
@bp.route("/players", methods=["POST","GET"])
def add_player():
    data = request.get_json()
    player = Player(name=data["name"], game_id=data["game_id"])
    db.session.add(player)
    db.session.commit()
    return jsonify({"id": player.id, "name": player.name})

# --- SNAKES ---
@bp.route("/snakes", methods=["POST","GET"])
def add_snake():
    data = request.get_json()
    snake = Snake(start=data["start"], end=data["end"], game_id=data["game_id"])
    db.session.add(snake)
    db.session.commit()
    return jsonify({"id": snake.id, "start": snake.start, "end": snake.end})

# --- LADDERS ---
@bp.route("/ladders", methods=["POST"])
def add_ladder():
    data = request.get_json()
    ladder = Ladder(start=data["start"], end=data["end"], game_id=data["game_id"])
    db.session.add(ladder)
    db.session.commit()
    return jsonify({"id": ladder.id, "start": ladder.start, "end": ladder.end})











































































 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 