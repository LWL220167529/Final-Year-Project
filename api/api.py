from flask import Flask, request, jsonify, abort, render_template, redirect, url_for, session, make_response
from flask_limiter.util import get_remote_address
from flask_cors import CORS, cross_origin
from flask_limiter import Limiter
from flask_caching import Cache
from flask_limiter.util import get_remote_address
from redis import Redis
import random
import user
import place
import collect
import userSchedule
import serverAutoStart
import json
import threading
import os

# connect database
# Remote database configuration
db_port = 3306  # Change the port to an integer
db_host = '159.223.94.246'
db_username = 'root'
db_password = 'fypproject'
db_name = 'FYP'



app = Flask(__name__, template_folder='templates', static_folder='static')

limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    storage_uri='redis://localhost:6379'
)
CORS(app)

# Configure caching
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

# Load destinations data and cache it


def load_destinations():
    return place.get_all_cities_place().json

# Access destinations from cache


def get_destinations():
    destinations = cache.get('destinations')
    if destinations is None:
        destinations = load_destinations()
        cache.set('destinations', destinations, timeout=3600)
    return destinations


def load_destinations_filter_by_rating():
    return place.filter_cities_place("rating", 4).json

# Access destinations from cache


def get_destinations_filter_by_rating():
    destinations = cache.get('destinations_by_rating')
    if destinations is None:
        destinations = load_destinations_filter_by_rating()
        cache.set('destinations_by_rating', destinations, timeout=3600)
    return destinations


@app.route('/')
@app.route('/travel', methods=["GET"])
def index():
    if 'userID' in request.cookies:
        response = request.cookies.get('userID')
        isLoggedIn = True
    else:
        # Handle the case when the 'userID' cookie does not exist
        response = None
        isLoggedIn = False
    filtered_destinations = get_destinations_filter_by_rating()
    top_destinations = random.sample(filtered_destinations, k=10)
    return render_template('index.html', isLoggedIn=isLoggedIn, userID=response,
                           top_destinations=top_destinations)


@app.route('/travel/view', methods=["GET"])
def indexView():
    if 'userID' in request.cookies:
        response = request.cookies.get('userID')
        isLoggedIn = True
    else:
        # Handle the case when the 'userID' cookie does not exist
        response = None
        isLoggedIn = False
    total_pages = len(get_destinations()) // 24 + 1
    attractions = get_destinations()[:24]
    filtered_destinations = get_destinations_filter_by_rating()
    top_destinations = random.sample(filtered_destinations, k=10)
    maxPage = min(total_pages, 1 + 5)
    minPage = 2
    return render_template('view.html', isLoggedIn=isLoggedIn, userID=response,
                           top_destinations=top_destinations, attractions=attractions,
                           count=int(total_pages), max=maxPage, min=minPage)


@app.route('/travel/<int:current_page>', methods=["GET"])
def indexPage(current_page):
    if current_page < 1:
        return redirect(url_for('index'))
    # Check if current_page is out of bounds
    total_pages = len(get_destinations()) // 24 + 1
    if current_page > total_pages:
        return jsonify({'message': 'Page not found'}), 404

    # Calculate the start and end indices for attractions
    start_index = 24 * (current_page - 1)
    end_index = min(24 * current_page, len(get_destinations()))

    maxPage = min(total_pages, current_page + 5)
    minPage = max(1, current_page - 5)

    attractions = get_destinations()[start_index:end_index]
    filtered_destinations = get_destinations_filter_by_rating()

    response = {
        'attractions': attractions,
        'count': total_pages,
        'current_page': current_page,
        'max': maxPage,
        'min': minPage
    }

    return jsonify(response)


@app.route('/travel/sign-in', methods=["GET", "POST"])
def loginPage():
    if request.method == "POST":
        userName = request.form['id']
        password = request.form['password']
        # Check if "Remember Me" is selected
        remember_me = request.form.get('rememberMe')

        response = user.check_login(userName, password)
        if response.json['login'] == True:
            redirect_url = url_for('index')
            # Set a cookie to remember the user
            resp = make_response(redirect(redirect_url))
            resp.set_cookie('userID', value=str(
                response.json['userID']), max_age=60*60*24*30)  # Cookie expires in 30 days
            return resp
        else:
            return render_template('sign-in.html', message=response.json['message'])
    else:
        return render_template('sign-in.html')


@app.route('/travel/sign-out', methods=["GET"])
def sign_out():
    response = make_response(redirect(url_for('index')))
    response.set_cookie('userID', '', expires=0)
    return response


@app.route('/travel/sign-up', methods=["GET"])
def sign_up():
    return render_template('sign-up.html')


@app.route('/travel/planForm', methods=["GET"])
def planForm():
    return render_template('planForm.html')


@app.route('/travel/hotel', methods=["GET"])
def hotel():
    return render_template('hotel.html')


@app.route('/travel/planSave', methods=["GET"])
def planSave():
    if request.method == "POST":
        if 'userID' in request.cookies:
            userID = request.cookies.get('userID')
            data = request.get_json()
            plan = {
                "userID": '',
                "destination": data.get('destination'),
                "Country": data.get('Country'),
                "TravelDate": data.get('travelDate'),
                "numberOfDays": data.get('numOfDays'),
                "AllTravelDates": data.get('allTravelDates'),
                "selectedActivities": data.get('selectedActivities'),
                "budget": data.get('budget'),
                "destinationlatitude": data.get('destinationlatitude'),
                "destinationlongitude": data.get('destinationlongitude'),
                "hotel": "",
            }

            redirect_url = url_for('hotel')
            # Set a cookie to remember the user
            resp = make_response(redirect(redirect_url))
            resp.set_cookie('plan', value=json.dumps(plan), max_age=60*60*24*30)  # Cookie expires in 30 days
            return resp
        return jsonify({'message': 'Please log in first', 'save': False}), 400
    else:
        return jsonify({'message': 'Invalid request', 'save': False}), 400


@app.route('/travel/results', methods=["GET"])
def results():
    if 'userID' in request.cookies and 'planID' in request.cookies:
        if request.method == "POST":
            data = request.get_json()
            userID = request.cookies.get('userID')
            plan = request.cookies.get('plan')
            if plan:
                plan = json.loads(plan)
                plan['userID'] = userID
                plan['hotel'] = data.get('hotel')
                
                planID = place.setPlan(userID)
                
                return render_template('results.html', planID=planID)
    return redirect(url_for('index'))

def onloadResultsPage():
    return render_template('results.html')

def finishResultsPage(response):
    return render_template('results.html')

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404
# api part
# account api
# login


@app.route('/login', methods=["GET", "POST"])
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

# sign up user
@app.route('/register', methods=["GET", "POST"])
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


@app.route('/updateUser', methods=["GET", "POST"])
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


@app.route('/forgotPassword', methods=["GET", "POST"])
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

# Get user by userID


@app.route('/getUserByID', methods=["GET", "POST"])
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


@app.route('/getAllUser', methods=["GET"])
def getAllUser():
    try:
        return user.get_all_users()
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500

# Flask routes


@app.route('/addNewCitiesPlace', methods=["GET", "POST"])
def addNewCitiesPlace():
    try:
        if request.method == "GET":  # get request from url
            data = request.args.to_dict()  # Get the GET request data as a dictionary
            # Call the add_new_cities_place function with the data
            return place.add_new_cities_place(data)
        else:  # post request from body
            data = request.get_json()
            return place.add_new_cities_place(data)
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500


@app.route('/updateCitiesPlace/<int:place_id>', methods=["GET", "POST"])
def updateCitiesPlace(place_id):
    try:
        if request.method == "GET":  # get request from url
            data = request.args.to_dict()  # Get the GET request data as a dictionary
        else:  # post request from body
            data = request.get_json()
        return place.update_cities_place(place_id, data)
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500


@app.route('/getAllPlace')
def getAllPlace():
    try:
        return place.get_all_cities_place()
    except Exception as e:
        print(e)
        return jsonify({'message': e}), 500


@app.route('/searchPlace', methods=["GET", "POST"])
def getPlaceByID():
    try:
        if request.method == "GET":  # get request from url
            searchPlace = request.args.get('searchPlace')
        else:  # post request from body
            data = request.get_json()
            searchPlace = data.get('searchPlace')
        return place.get_by_input(searchPlace)
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500


@app.route('/AIPlan', methods=["GET", "POST"])
def AIPlan():
    data = request.get_json()
    # file_path = os.path.join(os.path.dirname(__file__), 'AIPlanJson', 'inputTemplates.json')
    # with open(file_path, 'r', encoding='utf-8') as f:
    #     data = json.load(f)
    response = place.getRandomPlan(data)
    return jsonify(response), 200


@app.route('/saveAIPlan', methods=["GET", "POST"])
def saveAIPlan():
    if request.method == "GET":
        userID = request.args.get('userID')
        plan = request.args.get('plan')
    else:
        data = request.get_json()
        userID = data.get('userID')
        plan = data.get('plan')
        title = data.get('title')
        imageURL = data.get('imageURL')
    response = place.savePlan(userID, plan, title, imageURL)
    return response


@app.route('/getAIPlanByUser', methods=["GET", "POST"])
def getAIPlanByUser():
    if request.method == "GET":
        userID = request.args.get('userID')
    else:
        data = request.get_json()
        userID = data.get('userID')
    response = place.getSavedPlanByUserID(userID)
    return response


@app.route('/getAIPlanByID', methods=["GET", "POST"])
def getAIPlanByID():
    if request.method == "GET":
        planID = request.args.get('planID')
    else:
        data = request.get_json()
        planID = data.get('planID')
    response = place.getSavedPlanByID(planID)
    return response


@app.route('/estimatePlace', methods=["GET", "POST"])
@limiter.limit("1/second")  # Limit to 1 request per second
def estimatePlace():
    if request.method == "GET":
        city = request.args.get('city')
    else:
        data = request.get_json()
        city = data.get('city')
    response = place.estimate_place(city)
    return jsonify(response), 200


@app.route('/setCollection', methods=["GET", "POST"])
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


@app.route('/getCollectionByID', methods=["GET", "POST"])
def getCollectionByID():
    if request.method == "GET":
        userID = request.args.get('userID')
    else:
        data = request.get_json()
        userID = data.get('userID')
    return collect.getCollectionByID(userID)


@app.route('/addSchedule', methods=["GET", "POST"])
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
    response = userSchedule.add_schedule(
        userID, title, description, startTime, endTime, places)

    return jsonify(response), 200


@app.route('/updateSchedule', methods=["GET", "POST"])
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
    response = userSchedule.update_schedule(
        userID, scheduleID, title, description, startTime, endTime, places)

    return jsonify(response), 200

# @app.route('/tripPlan', methods=["GET", "POST"])
# def tripPlan():
#     if request.method == "GET":
#         userID = request.args.get('userID')
#         scheduleID = request.args.get('scheduleID')
#         day = request.args.get('day')
#     else:
#         data = request.get_json()
#         userID = data.get('userID')
#         scheduleID = data.get('scheduleID')
#         day = data.get('day')

#     # Call the trip_plan function with the provided parameters
#     response = gpt.gpt_plan_trip(data)

#     return jsonify(response), 200


if __name__ == '__main__':
    try:
        app.run(debug=True, host='0.0.0.0', port=5000)
    except Exception as e:
        print(e)
        print(
            "Server is exited unexpectedly. Please check the error and restart the server.")
        serverAutoStart.restartServer()
