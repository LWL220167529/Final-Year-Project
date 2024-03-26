import os
import importlib
from flask import Flask
# from controller import __init__, index, cookies, plan

def create_app():
    app = Flask(__name__)

    views = [f for f in os.listdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'controller')) if f.endswith(".py")]
    for view in views:
        module = importlib.import_module(f"controller.{view[:-3]}")
        app.register_blueprint(module.bp)

    return app