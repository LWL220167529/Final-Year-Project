from flask import (
    Blueprint, request
)
from .db import collect
import os

bp = Blueprint(f"{os.path.basename(__file__)[:-3]}", __name__,
               template_folder='templates', static_folder='static')


@bp.route('/setCollection', methods=["GET", "POST"])
def collation():
    if request.method == "GET":
        userID = request.args.get('userID')
        placeID = request.args.get('placeID')
        rating = request.args.get('rating')
        like = request.args.get('like')
        collection = request.args.get('collection')
    else:
        data = request.get_json()
        userID = data.get('userID')
        placeID = data.get('placeID')
        rating = data.get('rating')
        like = data.get('like')
        collection = data.get('collection')
    return collect.addNewCollection(userID, placeID, rating, like, collection)


@bp.route('/getCollectionByID', methods=["GET", "POST"])
def getCollectionByID():
    if request.method == "GET":
        userID = request.args.get('userID')
    else:
        data = request.get_json()
        userID = data.get('userID')
    return collect.getCollectionByID(userID)