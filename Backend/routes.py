from flask import Blueprint, request, jsonify
from models import User, Game, Player, Snake, Ladder
from db import db
from flask_bcrypt import Bcrypt
import jwt
from functools import wraps
from datetime import datetime, timedelta
import random

bp = Blueprint("routes", __name__)
bcrypt = Bcrypt()

SECRET_KEY = "your_secret_key_here"  # Replace with environment variable in production

# --- JWT decorator ---
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"message": "Token is missing"}), 401
        try:
            token = token.replace("Bearer ", "")
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = User.query.get(data["user_id"])
        except:
            return jsonify({"message": "Token is invalid"}), 401
        return f(current_user, *args, **kwargs)
    return decorated

# --- Registration ---
@bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "User already exists"}), 400
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

# --- Login ---
@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    user = User.query.filter_by(username=username).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Invalid credentials"}), 401
    token = jwt.encode(
        {"user_id": user.id, "exp": datetime.utcnow() + timedelta(hours=24)},
        SECRET_KEY,
        algorithm="HS256",
    )
    return jsonify({"token": token, "user": user.to_dict()}), 200

# --- Create Game ---
@bp.route("/games", methods=["POST"])
@token_required
def create_game(current_user):
    data = request.get_json()
    name = data.get("name", "New Game")
    game = Game(name=name)
    db.session.add(game)
    db.session.commit()
    return jsonify(game.to_dict()), 201

# --- Add Player ---
@bp.route("/games/<int:game_id>/players", methods=["POST"])
@token_required
def add_player(current_user, game_id):
    game = Game.query.get_or_404(game_id)
    data = request.get_json()
    player = Player(name=data.get("name"), game_id=game.id)
    db.session.add(player)
    db.session.commit()
    return jsonify({"id": player.id, "name": player.name, "position": player.position}), 201

# --- Add Snake ---
@bp.route("/games/<int:game_id>/snakes", methods=["POST"])
@token_required
def add_snake(current_user, game_id):
    data = request.get_json()
    snake = Snake(start=data["start"], end=data["end"], game_id=game_id)
    db.session.add(snake)
    db.session.commit()
    return jsonify({"id": snake.id, "start": snake.start, "end": snake.end}), 201

# --- Add Ladder ---
@bp.route("/games/<int:game_id>/ladders", methods=["POST"])
@token_required
def add_ladder(current_user, game_id):
    data = request.get_json()
    ladder = Ladder(start=data["start"], end=data["end"], game_id=game_id)
    db.session.add(ladder)
    db.session.commit()
    return jsonify({"id": ladder.id, "start": ladder.start, "end": ladder.end}), 201

# --- Roll Dice ---
@bp.route("/games/<int:game_id>/roll/<int:player_id>", methods=["POST"])
@token_required
def roll_dice(current_user, game_id, player_id):
    game = Game.query.get_or_404(game_id)
    player = Player.query.get_or_404(player_id)
    dice = random.randint(1, 6)
    new_pos = player.position + dice

    # Check for snakes
    snake = Snake.query.filter_by(game_id=game.id, start=new_pos).first()
    if snake:
        new_pos = snake.end

    # Check for ladders
    ladder = Ladder.query.filter_by(game_id=game.id, start=new_pos).first()
    if ladder:
        new_pos = ladder.end

    player.position = new_pos
    db.session.commit()

    return jsonify({
        "player": {"id": player.id, "name": player.name, "position": player.position},
        "dice": dice
    }), 200

# --- Get game state ---
@bp.route("/games/<int:game_id>", methods=["GET"])
@token_required
def get_game(current_user, game_id):
    game = Game.query.get_or_404(game_id)
    players = Player.query.filter_by(game_id=game.id).all()
    snakes = Snake.query.filter_by(game_id=game.id).all()
    ladders = Ladder.query.filter_by(game_id=game.id).all()
    return jsonify({
        "game": game.to_dict(),
        "players": [{"id": p.id, "name": p.name, "position": p.position} for p in players],
        "snakes": [{"start": s.start, "end": s.end} for s in snakes],
        "ladders": [{"start": l.start, "end": l.end} for l in ladders]
    })






























































































 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 