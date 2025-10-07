from flask import Flask
from db import db
from routes import bp
from flask_bcrypt import Bcrypt
from flask_cors import CORS  # import CORS

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///snakes_ladders.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = "your_secret_key_here"

db.init_app(app)
bcrypt = Bcrypt(app)
bp.bcrypt = bcrypt
app.register_blueprint(bp)

# Enable CORS for all routes and origins (for development)
CORS(app, resources={r"/*": {"origins": "*"}})

if __name__ == "__main__":
    app.run(debug=True)



















































































































