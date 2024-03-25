import importlib
from flask import Flask
# from controller import __init__, index, cookies, plan

views = [
    'collection.py', 
    'cookies.py', 
    'index.py', 
    'login.py', 
    'plan.py', 
    'schedule.py', 
    'user.py', 
    'view.py', 
    '__init__.py'
]

def create_app():
    app = Flask(__name__)

    for view in views:
        module = importlib.import_module(f"controller.{view[:-3]}")
        app.register_blueprint(module.bp)

    return app