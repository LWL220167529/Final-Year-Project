from flask import (
    Blueprint, request, jsonify
)
from .db import schedule
import os

bp = Blueprint(f"{os.path.basename(__file__)[:-3]}", __name__,
               template_folder='templates', static_folder='static')




@bp.route('/addSchedule', methods=["GET", "POST"])
def addSchedule():
    if request.method == "GET":
        userID = request.args.get('userID')
        title = request.args.get('title')
        description = request.args.get('description')
        startTime = request.args.get('startTime')
        endTime = request.args.get('endTime')
        places = request.args.get('places')
    else:
        data = request.get_json()
        userID = data.get('userID')
        title = data.get('title')
        description = data.get('description')
        startTime = data.get('startTime')
        endTime = data.get('endTime')
        places = data.get('places')

    # Call the add_schedule function with the provided parameters
    response = schedule.add_schedule(
        userID, title, description, startTime, endTime, places)

    return jsonify(response), 200


@bp.route('/updateSchedule', methods=["GET", "POST"])
def updateSchedule():
    if request.method == "GET":
        userID = request.args.get('userID')
        title = request.args.get('title')
        scheduleID = request.args.get('scheduleID')
        description = request.args.get('description')
        startTime = request.args.get('startTime')
        endTime = request.args.get('endTime')
        places = request.args.get('places')
    else:
        data = request.get_json()
        userID = data.get('userID')
        title = data.get('title')
        scheduleID = data.get('scheduleID')
        description = data.get('description')
        startTime = data.get('startTime')
        endTime = data.get('endTime')
        places = data.get('places')

    # Call the update_schedule function with the provided parameters
    response = schedule.update_schedule(
        userID, scheduleID, title, description, startTime, endTime, places)

    return jsonify(response), 200