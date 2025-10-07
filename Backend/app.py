from flask import Flask
from db import db
from routes import bp  # import the Blueprint object
from models import Game, Player, Snake, Ladder

def create_app():
    app = Flask(__name__)
    # Replace this with your correct Supabase/Postgres credentials
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres.zgmtrrxjkxahpwdbjzay:NqQsvbt30e1qYFRC@aws-1-eu-north-1.pooler.supabase.com:5432/postgres'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()  # Create tables if they don't exist

    app.register_blueprint(bp)  # register your blueprint
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)








































































































