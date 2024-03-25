from flask import (
    Blueprint, request, render_template, jsonify
)
from .cookies import exists_cookie, get_cookie
from .db import place
import os

bp = Blueprint(f"{os.path.basename(__file__)[:-3]}", __name__,
               template_folder='templates', static_folder='static')


@bp.route('/travel/planForm', methods=["GET"])
def index():
    response = None
    isLoggedIn = False
    if exists_cookie(request, 'userID'):
        response = get_cookie(request, 'userID')
        isLoggedIn = True
    return render_template('planForm.html', isLoggedIn=isLoggedIn, userID=response)


@bp.route('/travel/hotel', methods=["GET"])
def hotel():
    response = None
    isLoggedIn = False
    if exists_cookie(request, 'userID'):
        response = get_cookie(request, 'userID')
        isLoggedIn = True
    return render_template('hotel.html', isLoggedIn=isLoggedIn, userID=response)


@bp.route('/AIPlan', methods=["GET", "POST"])
def AIPlan():
    data = request.get_json()
    # file_path = os.path.join(os.path.dirname(__file__), 'AIPlanJson', 'inputTemplates.json')
    # with open(file_path, 'r', encoding='utf-8') as f:
    #     data = json.load(f)
    response = place.getRandomPlan(data)
    return jsonify(response), 200


@bp.route('/saveAIPlan', methods=["GET", "POST"])
def saveAIPlan():
    if request.method == "GET":
        userID = request.args.get('userID')
        plan = request.args.get('plan')
        title = request.args.get('title')
        imageURL = request.args.get('imageURL')
        description = request.args.get('description')
    else:
        data = request.get_json()
        userID = data.get('userID')
        plan = data.get('plan')
        title = data.get('title')
        imageURL = data.get('imageURL')
        description = data.get('description')
    response = place.savePlan(userID, plan, title, imageURL, description)
    return response

@bp.route('/editPlan', methods=["GET", "POST"])
def editPlan():
    if request.method == "GET":
        plan = request.args.get('plan')
    else:
        data = request.get_json()  
        plan = data.get('plan')
    # file_path = os.path.join(os.path.dirname(__file__), 'AIPlanJson', 'data_8.json')
    # with open(file_path, 'r', encoding='utf-8') as f:
    #     plan = json.load(f)
    response = place.editPlan(plan)
    return response

@bp.route('/getAIPlanByUser', methods=["GET", "POST"])
def getAIPlanByUser():
    if request.method == "GET":
        userID = request.args.get('userID')
    else:
        data = request.get_json()
        userID = data.get('userID')
    response = place.getSavedPlanByUserID(userID)
    return response


@bp.route('/getAIPlanByID', methods=["GET", "POST"])
def getAIPlanByID():
    if request.method == "GET":
        planID = request.args.get('planID')
    else:
        data = request.get_json()
        planID = data.get('planID')
    response = place.getSavedPlanByID(planID)
    return response