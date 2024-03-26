from flask import Flask
import test
def create_app():
    app = Flask(__name__)
    
    app.register_blueprint(test.bp)
    
    return app
