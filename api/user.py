from flask import jsonify
from sqlalchemy import create_engine, Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import bcrypt
#database connection

# Remote database configuration
db_port = 3306
db_host = '159.223.94.246'
db_username = 'root'
db_password = 'fypproject'
db_name = 'FYP'
# Create SQLAlchemy engine
engine = create_engine(
    f'mysql+mysqlconnector://{db_username}:{db_password}@{db_host}:{int(db_port)}/{db_name}'
)

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

    def __init__(self, userID, userName, email, password, phoneNumber):
        self.userID = userID
        self.userName = userName
        self.email = email
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self.phoneNumber = phoneNumber

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))
    
    def check_login(userID, password):
        try:
            # find user by userID or email
            userEmail = session.query(User).filter(User.email == userID).first()
            userId = session.query(User).filter(User.userID == userID).first()
            # check password
            if userId and userId.check_password(password) or userEmail and userEmail.check_password(password):
                return jsonify({'message': 'Login successfully', 'login': True})
            return jsonify({'message': 'Invalid username or password.', 'login': False})
        except Exception as e:
            print(e)
            return jsonify({'message': e, 'login': False})
        
    def sign_up_user(userID, userName, password, email, phone):
        if session.query(User).filter(User.userID == userID).first() is None:
            #create new user
            try:
                new_user = User(userID=userID, userName=userName, email=email, password=password, phoneNumber=phone)
                session.add(new_user)
                session.commit()
                if new_user is not None:
                    return jsonify({'message': 'Sign Up successfully', 'signUp': True}), 201
            except Exception as e:
                return jsonify({'message': 'Error occurred during sign up.', 'error': str(e)}), 500
        else:
            return jsonify({'message': 'User already exists.'}), 409
        
    def update_user(userID, userName, email, phoneNumber):
        try:
            #find user by userID
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
            return jsonify({'message': e, 'updateUser': False})

    def forgot_password(userID, password):
        try:
            #find user by userID or email
            userEmail = session.query(User).filter(User.email==userID).first()
            userId = session.query(User).filter(User.userID==userID).first()
            #check password
            if userId:
                userId.password = password
                session.commit()
                return jsonify({'message': 'User updated password successfully', 'resetPassword': True})
            elif userEmail:
                userEmail.password = password
                session.commit()
                return jsonify({'message': 'User updated password successfully', 'resetPassword': True})
            return jsonify({'message': 'User not found', 'resetPassword': False})
        except Exception as e:
            print(e)
            return jsonify({'message': e, 'resetPassword': False})