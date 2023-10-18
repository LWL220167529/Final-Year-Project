from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from flask_bcrypt import generate_password_hash, check_password_hash
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import bcrypt

app = Flask(__name__)
CORS(app)
#database connection
engine = create_engine('mysql+mysqlconnector://root:root@localhost:3306/fyp')
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
Base = declarative_base()

Session = sessionmaker(bind=engine)
session = Session()


class User(Base):
    __tablename__ = 'user'
    userID = Column(String(255), primary_key=True)
    userName = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(252), nullable=False)
    phoneNumber = Column(String(20), nullable=False)
    createTime = Column(DateTime, nullable=False, default=datetime.utcnow)
    Base.metadata.create_all(engine)
    def __init__(self, userID, userName, email, password, phoneNumber):
        self.userID = userID
        self.userName = userName
        self.email = email
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self.phoneNumber = phoneNumber

    def checkPassword(self, password):
        return self.password.encode('utf-8') == password.encode('utf-8')
        #return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

class Attraction(Base):
    __tablename__ = 'attraction'
    attractionID = Column(String(255), primary_key=True)
    attractionName = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    country = Column(String(255), nullable=False)
    region = Column(String(255), nullable=False)
    description = Column(String(255), nullable=False)
    image = Column(String(255), nullable=False)
    createTime = Column(DateTime, nullable=False, default=datetime.utcnow)
    editTime = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    Base.metadata.create_all(engine)
    def __init__(self, attractionID, attractionName, location, country, region, description, image):
        self.attractionID = attractionID
        self.attractionName = attractionName
        self.location = location
        self.country = country
        self.region = region
        self.description = description
        self.image = image

#account api
#login
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        print(data)
        emailOrId = data.get('userName')
        password = data.get('password')
        userEmail = session.query(User).filter(User.email == emailOrId).first()
        userId = session.query(User).filter(User.userID == emailOrId).first()
        if userEmail and userEmail.checkPassword(password) or userId and userId.checkPassword(password):
            return jsonify({'message': 'Login successfully', 'login': True})
        return jsonify({'message': 'Invalid username or password.', 'login': False})
    except Exception as e:
        print(e)
        abort(500)

#sign up user

@app.route('/signUp', methods=['POST'])
def signUpUser():
    data = request.get_json()
    userID = data.get('userID')
    userName = data.get('userName')
    password = data.get('password')
    email = data.get('email')
    phone = data.get('phone')
    if session.query(User).filter(User.userID == userID).first() is None:
        new_user = User(userID=userID, userName=userName, email=email, password=password, phoneNumber=phone)
        session.add(new_user)
        session.commit()
        if new_user is not None :
            return jsonify({'message': 'Sign Up successfully', 'signUp': True}), 201
        else:
            abort(500)
    else:
        return jsonify({'message': 'User already exists.'}), 409

#update user
@app.route('/updateUser', methods=['POST'])
def updateUser():
    try:
        data = request.get_json()
        userID = data.get('userID')
        userName = data.get('userName')
        email = data.get('email')
        phoneNumber = data.get('phoneNumber')
        user = session.query(User).filter(User.userID == userID).first()
        if not user:
            return jsonify({'message': 'User not found'}), 404
        user.userName = userName
        user.email = email
        user.phoneNumber = phoneNumber
        session.commit()
        return jsonify({'message': 'User updated successfully', 'updateUser': True}), 200
    except Exception as e:
        print(e)
        abort(500)

#forgot password
@app.route('/forgotPassword', methods=['POST'])
def resetPassword():
    try:
        data = request.get_json()
        userID = data.get('userID')
        password = data.get('password')
        user = session.query(User).filter(User.userID == userID).first()
        if not user:
            return jsonify({'message': 'User not found'})
        user.password = password
        session.commit()
        return jsonify({'message': 'User updated password successfully', 'resetPassword': True})
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500

# Get attractions


# Flask routes
@app.route('/getAttraction')
def getAttractions():
    try:
        attractions = session.query(Attraction).all()
        print(attractions[0].attractionID)
        results = []
        for attraction in attractions:
            result = {
                'id': attraction.attractionID,
                'name': attraction.attractionName,
                'location': attraction.location,
                'description': attraction.description,
                'image': attraction.image,
                'created_at': attraction.createTime,
                'updated_at': attraction.editTime
            }
            results.append(result)
        return jsonify(results), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500

session.close()


if __name__ == '__main__':
    app.run(debug=True)


