from flask import (
    Blueprint, request, render_template
)
from .cookies import exists_cookie, get_cookie
from .__init__ import get_destinations_filter_by_rating
import random

bp = Blueprint("index", __name__,
               template_folder='templates', static_folder='static')


@bp.route('/')
@bp.route('/travel', methods=["GET"])
def index():
    if exists_cookie(request, 'userID'):
        response = get_cookie(request, 'userID')
        isLoggedIn = True
    else:
        response = None
        isLoggedIn = False
    filtered_destinations = get_destinations_filter_by_rating()
    top_destinations = random.sample(
        list(filtered_destinations), k=10) if filtered_destinations else []
    return render_template('index.html', isLoggedIn=isLoggedIn, userID=response,
                           top_destinations=top_destinations)
