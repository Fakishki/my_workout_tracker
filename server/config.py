from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

app.secret_key = b'\x96\x83\xfc\xe8X mJ\xb5\xfa\xe1s\xea?\xa2J'

db = SQLAlchemy()
migrate = Migrate(app, db)

db.init_app(app)

bcrypt = Bcrypt(app)

# DO I REALLY NEED THIS?
# monkeypatch flask-rest Api class to bypass its error routing
Api.error_router = lambda self, hnd, e: hnd(e)
api = Api(app)