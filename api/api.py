from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from flask_bcrypt import generate_password_hash, check_password_hash
import place
import user

app = Flask(__name__)
CORS(app)
<<<<<<< HEAD
=======
#database connection

# Remote database configuration
db_port = 3306
db_host = 'localhost'
db_username = 'root'
db_password = 'fypproject'
db_name = 'FYP'
# Create SQLAlchemy engine
engine = create_engine(
    f'mysql+mysqlconnector://{db_username}:{db_password}@{db_host}:{db_port}/{db_name}'
)
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
Base = declarative_base()

Session = sessionmaker(bind=engine)
session = Session()

#user class
class User(Base):
    __tablename__ = 'user'
    userID = Column(String(255), primary_key=True)
    userName = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(252), nullable=False)
    phoneNumber = Column(String(20), nullable=False)
    createTime = Column(DateTime, nullable=False, default=datetime.utcnow)
    #Base.metadata.create_all(engine)
    def __init__(self, userID, userName, email, password, phoneNumber):
        self.userID = userID
        self.userName = userName
        self.email = email
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self.phoneNumber = phoneNumber

    def checkPassword(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

#attraction class
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
    #Base.metadata.create_all(engine)
    def __init__(self, attractionID, attractionName, location, country, region, description, image):
        self.attractionID = attractionID
        self.attractionName = attractionName
        self.location = location
        self.country = country
        self.region = region
        self.description = description
        self.image = image
>>>>>>> 82c3dfcff9a19043c6d6cc56d97d45f81a9d7a40

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
        return user.checkLogin(userName, password)
    except Exception as e:
        print(e)
        abort(500)

#sign up user

@app.route('/signUp', methods=["GET", "POST"])
def signUpUser():
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
    return user.signUpUser(userID, userName, password, email, phone)

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
        return user.updateUser(userID, userName, email, phoneNumber)
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
        return user.forgotPassword(userID, password)
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500

# Get attractions


# Flask routes
@app.route('/getAttraction')
def getAttractions():
        try:
            return place.getPlace()
        except Exception as e:
            print(e)
            return jsonify({'message': 'Internal server error'}), 500


<<<<<<< HEAD
=======
@app.route('/test')
def test():
    return "test 1.0"

session.close()
>>>>>>> 82c3dfcff9a19043c6d6cc56d97d45f81a9d7a40

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


