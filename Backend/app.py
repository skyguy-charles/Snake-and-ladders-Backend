from flask import Flask
from db import db
from routes import routes

def create_app(database_uri="sqlite:///snakes_and_ladders.db"):
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres.zgmtrrxjkxahpwdbjzay:NqQsvbt30e1qYFRC@aws-1-eu-north-1.pooler.supabase.com:5432/postgres"

    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()

    app.register_blueprint(routes)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="0.0.0.0")

print("ROUTES REGISTERED:", app.url_map)
















