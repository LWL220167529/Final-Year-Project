from flask import (
    Blueprint, request, render_template, redirect, url_for, make_response, jsonify, abort
)
from .cookies import exists_cookie
from .__init__ import get_destinations_filter_by_rating, get_destinations
from .db import user

bp = Blueprint("login", __name__,
               template_folder='templates', static_folder='static')

@bp.route('/travel/sign-in', methods=["GET", "POST"])
def index():
    if 'userID' in request.cookies:
        return redirect(url_for('index.index'))
    if request.method == "POST":
        userName = request.form['id']
        password = request.form['password']
        # Check if "Remember Me" is selected
        remember_me = request.form.get('rememberMe')

        response = user.check_login(userName, password)
        if response.json['login'] == True:
            redirect_url = url_for('index.index')
            # Set a cookie to remember the user
            resp = make_response(redirect(redirect_url))
            if remember_me:
                resp.set_cookie('userID', value=str(
                    response.json['userID']), max_age=60*60*24*30)  # Cookie expires in 30 days
            else:
                resp.set_cookie('userID', value=str(
                    response.json['userID']))  # Cookie expires when the browser is closed
            return resp
        else:
            return render_template('sign-in.html', message=response.json['message'])
    else:
        return render_template('sign-in.html')


@bp.route('/travel/sign-out', methods=["GET"])
def sign_out():
    response = make_response(redirect(url_for('index.index')))
    response.set_cookie('userID', '', expires=0)
    return response


@bp.route('/travel/sign-up', methods=["GET"])
def sign_up():
    return render_template('sign-up.html')

@bp.route('/login', methods=["GET", "POST"])
def login():
    try:
        if request.method == "GET":  # get request from url
            userName = request.args.get('userName')
            password = request.args.get('password')
        else:  # post request from body
            data = request.get_json()
            userName = data.get('userName')
            password = data.get('password')
        return user.check_login(userName, password)
    except Exception as e:
        print(e)
        abort(500)