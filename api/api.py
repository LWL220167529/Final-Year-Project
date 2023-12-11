from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from flask_bcrypt import generate_password_hash, check_password_hash
import user, place #connect database

app = Flask(__name__)
CORS(app)
#account api
#login
@app.route('/login', methods=["GET", "POST"])
def login():
    try:
        if request.method == "GET":#get request from url
            userName = request.args.get('userName')
            password = request.args.get('password')
        else:#post request from body
            data = request.get_json()
            userName = data.get('userName')
            password = data.get('password')
        return user.User.check_login(userName, password)
    except Exception as e:
        print(e)
        abort(500)

#sign up user

@app.route('/register', methods=["GET", "POST"])
def register():
    if request.method == "GET":#get request from url
        userID = request.args.get('userID')
        userName = request.args.get('userName')
        password = request.args.get('password')
        email = request.args.get('email')
        phone = request.args.get('phone')
    else:#post request from body
        data = request.get_json()
        userID = data.get('userID')
        userName = data.get('userName')
        password = data.get('password')
        email = data.get('email')
        phone = data.get('phone')
    #check if user exists
    return user.User.register(userID, userName, password, email, phone)

#update user
@app.route('/updateUser', methods=["GET", "POST"])
def updateUser():
    try:
        if request.method == "GET":#get request from url
            userID = request.args.get('userID')
            userName = request.args.get('userName')
            email = request.args.get('email')
            phoneNumber = request.args.get('phoneNumber')
        else:#post request from body
            data = request.get_json()
            userID = data.get('userID')
            userName = data.get('userName')
            email = data.get('email')
            phoneNumber = data.get('phoneNumber')
        return user.User.update_user(userID, userName, email, phoneNumber)
    except Exception as e:
        print(e)
        abort(500)

#forgot password
@app.route('/forgotPassword', methods=["GET", "POST"])
def resetPassword():
    try:
        if request.method == "GET":#get request from url
            userID = request.args.get('userID')
            password = request.args.get('password')
        else:#post request from body
            data = request.get_json()
            userID = data.get('userID')
            password = data.get('password')
        return user.User.forgot_password(userID, password)
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500

# Get attractions


# Flask routes
@app.route('/getAllPlace')
def getAllPlace():
    try:
        return place.Place.get_all_place()
    except Exception as e:
        print(e)
        return jsonify({'message': e}), 500
        
@app.route('/getPlaceByID', methods=["GET", "POST"])
def getPlaceByID():
    try:
        if request.method == "GET":#get request from url
            getPlace = request.args.get('getPlace')
        else:#post request from body
            data = request.get_json()
            getPlace = data.get('getPlace')
        return place.Place.get_by_input(getPlace)
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


