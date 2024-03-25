from flask import Flask
from controller import collection, cookies, index, login, plan, schedule, user, view, __init__

def create_app():
    app = Flask(__name__)
    
    app.register_blueprint(collection.bp)
    app.register_blueprint(cookies.bp)
    app.register_blueprint(index.bp)
    app.register_blueprint(login.bp)
    app.register_blueprint(plan.bp)
    app.register_blueprint(schedule.bp)
    app.register_blueprint(user.bp)
    app.register_blueprint(view.bp)
    app.register_blueprint(__init__.bp)

    return app
