from flask import Flask
from controller import collection, cookies, index, login, plan, schedule, user, view, __init__

def create_app():
    app = Flask(__name__)

    blueprints = [collection, cookies, index, login, plan, schedule, user, view, __init__]

    for blueprint in blueprints:
        app.register_blueprint(blueprint.bp)

    return app
