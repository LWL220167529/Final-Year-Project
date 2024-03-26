from flask import (
    Blueprint
)
import os

bp = Blueprint(f"{os.path.basename(__file__)[:-3]}", __name__,
               template_folder='templates', static_folder='static')


def set_cookie(response, key, value):
    response.set_cookie(key, value)
    return response

def exists_cookie(request, key) -> bool: 
    return key in request.cookies

def get_cookie(request, key):
    return request.cookies.get(key)

def delete_cookie(response, key):
    response.delete_cookie(key)
    return response