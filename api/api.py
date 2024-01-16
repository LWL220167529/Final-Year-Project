from flask import Flask, request, jsonify, abort
from flask_cors import CORS
import user
import place  
import collect
# connect database
app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return 'Hello World'
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
    if request.method == "GET":  # get request from url
        userName = request.args.get('userName')
        password = request.args.get('password')
        email = request.args.get('email')
        phone = request.args.get('phone')
    else:  # post request from body
        data = request.get_json()
        userName = data.get('userName')
        password = data.get('password')
        email = data.get('email')
        phone = data.get('phone')
    # check if user exists
    return user.register(userName, password, email, phone)

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


@app.route('/getAllPlace')
def getAllPlace():
    try:
        return place.CitiesPlace.get_all_cities_place()
    except Exception as e:
        print(e)
        return jsonify({'message': e}), 500


@app.route('/getPlaceByID', methods=["GET", "POST"])
def getPlaceByID():
    try:
        if request.method == "GET":  # get request from url
            getPlace = request.args.get('getPlace')
        else:  # post request from body
            data = request.get_json()
            getPlace = data.get('getPlace')
        return place.CitiesPlace.get_by_input(getPlace)
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500


@app.route('/AIPlan', methods=["GET", "POST"])
def AIPlan():
    if request.method == "GET":  # get request from url
        state_id = request.args.get('stateID')
        day = request.args.get('day')
        budget = request.args.get('budget')
        num_of_people = request.args.get('numOfPeople')
        start_date = request.args.get('startDate')
        activities = request.args.get('activities')
    else:  # post request from body
        data = request.get_json()
        state_id = data.get('stateID')
        day = data.get('day')
        budget = data.get('budget')
        num_of_people = data.get('numOfPeople')
        start_date = data.get('startDate')
        activities = data.get('activities')
    response = place.getRandomPlan(
        state_id, day, budget, num_of_people, start_date, activities)
    return jsonify(response), 200


@app.route('/estimatePlace', methods=["GET", "POST"])
def estimatePlace():
    if request.method == "GET":  # get request from url
        city = request.args.get('city')
    else:  # post request from body
        data = request.get_json()
        city = data.get('city')
    response = place.estimate_place(city)
    return jsonify(response), 200

@app.route('/getCollection', methods=["GET", "POST"])
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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
