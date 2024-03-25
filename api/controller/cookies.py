from flask import (
    Blueprint
)

bp = Blueprint('cookies', __name__)


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