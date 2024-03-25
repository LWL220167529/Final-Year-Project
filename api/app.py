from flask import Flask
from controller import collection, cookies, index, login, plan, schedule, user, view, __init__

def create_app():
    app = Flask(__name__)

    views = [collection, cookies, index, login, plan, schedule, user, view, __init__]

    for view in views:
        app.register_blueprint(view.bp)

    return app
