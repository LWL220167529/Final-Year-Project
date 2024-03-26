from flask import (
    Blueprint, request, render_template
)

bp = Blueprint("test", __name__,
               template_folder='templates', static_folder='static')

@bp.route('/')
def index():
    return 'hello world'