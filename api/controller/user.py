from flask import (
    Blueprint, request, jsonify, abort
)
from .db import user

bp = Blueprint("user", __name__,
               template_folder='templates', static_folder='static')

# sign up user
@bp.route('/register', methods=["GET", "POST"])
def register():
    if request.method == "GET":
        userName = request.args.get('userName')
        password = request.args.get('password')
        email = request.args.get('email')
        phone = request.args.get('phone')
    elif request.method == "POST":
        if request.is_json:
            data = request.get_json()
            userName = data.get('userName')
            password = data.get('password')
            email = data.get('email')
            phone = data.get('phone')
        else:
            userName = request.form.get('userName')
            password = request.form.get('password')
            email = request.form.get('email')
            phone = request.form.get('phone')
    return user.register(userName, password, email, phone), 200

# update user


@bp.route('/updateUser', methods=["GET", "POST"])
def updateUser():
    try:
        if request.method == "GET":  # get request from url
            userID = request.args.get('userID')
            userName = request.args.get('userName')
            email = request.args.get('email')
            phoneNumber = request.args.get('phoneNumber')
        else:  # post request from body
            data = request.get_json()
            userID = data.get('userID')
            userName = data.get('userName')
            email = data.get('email')
            phoneNumber = data.get('phoneNumber')
        return user.update_user(userID, userName, email, phoneNumber)
    except Exception as e:
        print(e)
        abort(500)

# forgot password


@bp.route('/forgotPassword', methods=["GET", "POST"])
def resetPassword():
    try:
        if request.method == "GET":  # get request from url
            userID = request.args.get('userID')
            password = request.args.get('password')
        else:  # post request from body
            data = request.get_json()
            userID = data.get('userID')
            password = data.get('password')
        return user.forgot_password(userID, password)
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500


@bp.route('/getUserByID', methods=["GET", "POST"])
def getUserByID():
    try:
        if request.method == "GET":  # get request from url
            userID = request.args.get('userID')
        else:  # post request from body
            data = request.get_json()
            userID = data.get('userID')
        return user.get_user(userID)
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500

# Get all users


@bp.route('/getAllUser', methods=["GET"])
def getAllUser():
    try:
        return user.get_all_users()
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500