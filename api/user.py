from flask import jsonify
from sqlalchemy import create_engine, Column, String, DateTime, or_, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from typing import Optional
import bcrypt

# database connection

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

# user class
class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, autoincrement=True)
    userName = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(252), nullable=False)
    phoneNumber = Column(String(20), nullable=False)
    createTime = Column(DateTime, nullable=False, default=datetime.utcnow)

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

def check_login(id: Optional[int or str], password: str):
    try:
        # Find user by id or email
        user = session.query(User).filter(
            or_(User.email == id, User.id == id, User.userName == id)).first()

        if user and user.check_password(password):
            return jsonify({'message': 'Login successfully', 'userID': user.id, 'login': True})
        else:
            return jsonify({'message': 'Invalid username or password.', 'login': False})
    except Exception as e:
        print(e)
        return jsonify({'message': str(e), 'login': False})


def register(userName: str, password: str, email: str, phoneNumber: str):
    if session.query(User).filter(or_(User.userName == userName)).first() is None:
        # create new user
        if len(phoneNumber) < 3 or len(phoneNumber) > 20:
            return jsonify({'message': 'phoneNumber must be between 3 and 20 characters.'}), 400
        try:
            new_user = User(userName=userName, email=email, password=bcrypt.hashpw(
                password.encode('utf-8'), bcrypt.gensalt()), phoneNumber=phoneNumber)
            session.add(new_user)
            session.commit()
            if new_user is not None:
                return jsonify({'message': 'Sign Up successfully', 'signUp': True}), 201
        except Exception as e:
            return jsonify({'message': 'Error occurred during sign up.', 'error': str(e)}), 500
    else:
        return jsonify({'message': 'User already exists.'}), 409


def update_user(id: Optional[int or str], userName, email, phoneNumber):
    try:
        # find user by id
        user = session.query(User).filter(or_(User.id == id, User.userName == id)).first()
        if len(phoneNumber) < 3 or len(phoneNumber) > 20:
            return jsonify({'message': 'phone must be between 3 and 20 characters.'}), 400
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


def forgot_password(id: Optional[int or str], password: str):
    try:
        # Find user by id or email
        user = session.query(User).filter(
            or_(User.email == id, User.id == id, User.userName == id)).first()

        if user:
            # Update password
            user.password = bcrypt.hashpw(
                password.encode('utf-8'), bcrypt.gensalt())
            session.commit()
            return jsonify({'message': 'User updated password successfully', 'resetPassword': True})
        else:
            return jsonify({'message': 'User not found', 'resetPassword': False})
    except Exception as e:
        print(e)
        return jsonify({'message': str(e), 'resetPassword': False})


def get_all_users():
    try:
        users = session.query(User).all()
        user_list = []
        for user in users:
            user_data = {
                'id': user.id,
                'userName': user.userName,
                'email': user.email,
                'phoneNumber': user.phoneNumber,
                'createTime': user.createTime
            }
            user_list.append(user_data)
        return jsonify({'users': user_list}), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error occurred while retrieving users.', 'error': str(e)}), 500


def get_user(id: Optional[int or str]):
    try:
        # Find user by id or email
        user = session.query(User).filter(
            or_(User.email == id, User.id == id, User.userName == id)).first()

        if user:
            user_data = {
                'id': user.id,
                'userName': user.userName,
                'email': user.email,
                'phoneNumber': user.phoneNumber,
                'createTime': user.createTime
            }
            return jsonify({'user': user_data}), 200
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'message': str(e)}), 500


def delete_user(id: Optional[int or str]):
    try:
        # Find user by id or email
        user = session.query(User).filter(
            or_(User.email == id, User.id == id, User.userName == id)).first()

        if user:
            session.delete(user)
            session.commit()
            return jsonify({'message': 'User deleted successfully'}), 200
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'message': str(e)}), 500