from flask import Blueprint, request, jsonify
from db import db
from models import Game, Player
import random

routes = Blueprint("routes", __name__)

BOARD_END = 100  # standard snake and ladder board size

# snakes and ladders mapping (example, you can adjust)
SNAKES = {16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78}
LADDERS = {1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100}


def roll_dice():
    return random.randint(1, 6)


def apply_snakes_ladders(position):
    if position in SNAKES:
        return SNAKES[position], "snake"
    elif position in LADDERS:
        return LADDERS[position], "ladder"
    return position, None


# ----------------------------
# Routes
# ---------------------------- 
@routes.route("/games", methods=["GET", "POST"])
def games():
    if request.method == "POST":
        data = request.get_json()
        if not data.get("name"):
            return {"error": "Game name is required"}, 400

        new_game = Game(name=data["name"], is_finished=False, current_turn=0)
        db.session.add(new_game)
        db.session.commit()
        return new_game.to_dict(), 201

    # Handle GET
    games = Game.query.all()
    return jsonify([g.to_dict() for g in games])

@routes.route("/games/<int:game_id>/players", methods=["POST"])
def add_player(game_id):
    print("Incoming request to add player...")  # 👈 debug
    data = request.get_json()
    print("Data received:", data)  # 👈 debug
    
    player_name = data.get("name") if data else None

    if not player_name:
        return jsonify({"error": "Player name is required"}), 400

    game = Game.query.get(game_id)
    if not game:
        return jsonify({"error": "Game not found"}), 404

    new_player = Player(name=player_name, position=0, game_id=game_id)
    db.session.add(new_player)
    db.session.commit()

    return jsonify({
        "id": new_player.id,
        "name": new_player.name,
        "position": new_player.position,
        "game_id": new_player.game_id
    }), 201


































@routes.route("/games/<int:game_id>/roll", methods=["POST"])
def roll_turn(game_id):
    game = Game.query.get_or_404(game_id)

    if game.is_finished:
        return jsonify({"error": "Game already finished"}), 400

    players = game.players
    if not players:
        return jsonify({"error": "No players in this game"}), 400

    current_player = players[game.current_turn % len(players)]

    dice = roll_dice()
    new_pos = current_player.position + dice
    jumped = None

    if new_pos >= BOARD_END:
        current_player.position = BOARD_END
        game.is_finished = True
        db.session.commit()
        return jsonify({
            "player_id": current_player.id,
            "player_name": current_player.name,
            "dice": dice,
            "new_position": current_player.position,
            "message": f"{current_player.name} wins!"
        })

    # Apply snakes or ladders
    final_pos, move_type = apply_snakes_ladders(new_pos)
    if final_pos != new_pos:
        jumped = {"from": new_pos, "to": final_pos, "type": move_type}
    current_player.position = final_pos

    # Advance turn
    game.current_turn = (game.current_turn + 1) % len(players)

    db.session.commit()

    return jsonify({
        "player_id": current_player.id,
        "player_name": current_player.name,
        "dice": dice,
        "new_position": current_player.position,
        "jumped": jumped,
        "next_player_id": players[game.current_turn % len(players)].id
    })


@routes.route("/games/<int:game_id>/reset", methods=["POST"])
def reset_game(game_id):
    game = Game.query.get_or_404(game_id)
    for p in game.players:
        p.position = 1
    game.is_finished = False
    game.current_turn = 0
    db.session.commit()
    return jsonify(game.to_dict())


@routes.route("/games/<int:game_id>", methods=["DELETE"])
def delete_game(game_id):
    game = Game.query.get_or_404(game_id)
    db.session.delete(game)
    db.session.commit()
    return jsonify({"deleted": True}), 200


    ...

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 