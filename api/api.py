import mysql.connector
from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from flask_bcrypt import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

def databaseConnect():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='root',
        database='fyp'
    )

def closeDatabaseConnect(cursor,db):
    cursor.close()
    db.close()

#account api
#login
def login():
    with databaseConnect() as db:
        cursor = db.cursor()
        data = request.get_json()
        userName = data.get('userName')
        password = data.get('password')
        query = 'SELECT COUNT(*) FROM user WHERE userName = %s OR email = %s'
        values = (userName, userName)
        cursor.execute(query, values)
        count = cursor.fetchone()[0]
        if count == 1:
            query = 'SELECT password, userID FROM user WHERE userName = %s OR email = %s'
            cursor.execute(query, values)
            result = cursor.fetchone()
            if result and (result[0] == password):
                closeDatabaseConnect(cursor,db)
                return jsonify({'message': 'Login successful!', 'login': True, 'id': result[1]})
        return jsonify({'message': 'Invalid username or password.', 'login': False})

#sign up user

@app.route('/signUp', methods=['POST'])
def signUpUser():
    try:
        with databaseConnect() as db:
            cursor = db.cursor()
            data = request.get_json()
            userName = data.get('userName')
            password = data.get('password')
            userID = data.get('userID')
            email = data.get('email')
            phone = data.get('phone')
            cursor.execute('SELECT * FROM user WHERE userID = %s OR email = %s OR phoneNumber = %s', (userID, email, phone))
            results = cursor.fetchall() # read all results from previous query
            if cursor.rowcount == 0:
                cursor.execute('INSERT INTO user (`userID`, `userName`, `email`, `password`, `phoneNumber`) '+
                            'VALUES (%s, %s, %s, %s, %s);', (userID, userName, email, password, phone))
                db.commit()
                print(cursor.rowcount, 'record inserted.\nuserID: ' + userID)
                closeDatabaseConnect(cursor,db)
                if cursor.rowcount > 0:
                    return jsonify({'message': 'Sign Up successfully', 'signUp': True}), 201
                else:
                    abort(500)
            else:
                return jsonify({'message': 'User already exists.'}), 409
    except Exception as e:
        print(e)
        abort(500)
        
#update user
@app.route('/updateUser', methods=['POST'])
def updateUser():
    try:
        data = request.get_json()
        userID = data.get('userID')
        userName = data.get('userName')
        email = data.get('email')
        phoneNumber = data.get('phoneNumber')
        if not userExists(userID):
            return jsonify({'message': 'User not found'}), 404
        with databaseConnect() as db:
            cursor = db.cursor()
            cursor.execute('UPDATE user SET userName=%s, email=%s, phoneNumber=%s WHERE userID=%s', 
                           (userName, email, phoneNumber, userID))
            db.commit()
            if cursor.rowcount > 0:
                closeDatabaseConnect(cursor,db)
                return jsonify({'message': 'User updated successfully', 'updateUser': True}), 200
            else:
                closeDatabaseConnect(cursor,db)
                return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500

def userExists(user_id):
    with databaseConnect() as db:
        cursor = db.cursor()
        query = 'SELECT COUNT(*) FROM user WHERE userID = %s'
        values = (user_id,)
        cursor.execute(query, values)
        count = cursor.fetchone()[0]
        closeDatabaseConnect(cursor,db)
        return count == 1

#forgot password
@app.route('/forgotPassword', methods=['POST'])
def resetPassword():
    try:
        data = request.get_json()
        userID = data.get('userID')
        password = data.get('password')
        with databaseConnect() as db:
            cursor = db.cursor()
            cursor.execute('UPDATE user SET password=%s WHERE userID=%s', 
                           (password, userID))
            db.commit()
            if cursor.rowcount > 0:
                closeDatabaseConnect(cursor,db)
                return jsonify({'message': 'User updated password successfully', 'resetPassword': True})
            else:
                closeDatabaseConnect(cursor,db)
                return jsonify({'message': 'User not found'})
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500

# Get attractions
@app.route('/getAttaction', methods=['GET'])
def getAttractions():
    try:
        with databaseConnect() as db:
            cursor = db.cursor()
            cursor.execute("SELECT * FROM attraction")
            results = cursor.fetchall()
            attractions = []
            for result in results:
                attraction = {
                    'id': result[0],
                    'name': result[1],
                    'location': result[2],
                    'description': result[3],
                    'image': result[4],
                    'created_at': result[5],
                    'updated_at': result[6]
                }
                attractions.append(attraction)
            closeDatabaseConnect(cursor,db)
            return jsonify(attractions), 200
    except mysql.connector.Error as error:
        print(error)
        return jsonify({'message': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True)


