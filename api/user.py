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
            or_(User.email == id, User.userName == id)).first()

        if user is None or not user.check_password(password):
            return jsonify({'message': 'Invalid username or password.', 'login': False})

        return jsonify({'message': 'Login successfully', 'userID': user.id, 'login': True})
    except Exception as e:
        print(e)
        session.rollback()
        return jsonify({'message': 'Error occurred during login.', 'error': str(e), 'login': False})


def register(userName: str, password: str, email: str, phoneNumber: str):
    try:
        existing_user = session.query(User).filter(
            User.userName == userName).first()
        if existing_user:
            return jsonify({'message': 'User already exists.'}), 409

        if len(phoneNumber) < 3 or len(phoneNumber) > 20:
            return jsonify({'message': 'Phone number must be between 3 and 20 characters.'}), 400

        new_user = User(
            userName=userName,
            email=email,
            password=bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()),
            phoneNumber=phoneNumber
        )
        session.add(new_user)
        session.commit()

        return jsonify({'message': 'Sign Up successfully', 'signUp': True})
    except Exception as e:
        session.rollback()
        print(e)
        return jsonify({'message': 'Error occurred during sign up.', 'error': str(e)})


def update_user(id: Optional[int or str], userName, email, phoneNumber):
    try:
        # Find user by id or username
        user = session.query(User).filter(
            or_(User.id == id, User.userName == id)).first()

        if not user:
            return jsonify({'message': 'User not found'}), 404

        if len(phoneNumber) < 3 or len(phoneNumber) > 20:
            return jsonify({'message': 'Phone number must be between 3 and 20 characters.'}), 400

        user.userName = userName
        user.email = email
        user.phoneNumber = phoneNumber
        session.commit()

        return jsonify({'message': 'User updated successfully', 'updateUser': True}), 200
    except Exception as e:
        session.rollback()
        print(e)
        return jsonify({'message': 'Error occurred while updating user.', 'error': str(e), 'updateUser': False})


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
            return jsonify({'message': 'User password reset successfully', 'resetPassword': True})
        else:
            return jsonify({'message': 'User not found', 'resetPassword': False})
    except Exception as e:
        session.rollback()
        print(e)
        return jsonify({'message': 'Error occurred while resetting password.', 'error': str(e), 'resetPassword': False})


def get_all_users():
    try:
        users = session.query(User).all()
        user_list = [
            {
                'id': user.id,
                'userName': user.userName,
                'email': user.email,
                'phoneNumber': user.phoneNumber,
                'createTime': user.createTime
            }
            for user in users
        ]
        return jsonify({'users': user_list}), 200
    except Exception as e:
        session.rollback()
        print(e)
        return jsonify({'message': 'Error occurred while retrieving users.', 'error': str(e)}), 500


def get_user(id: Optional[int or str]):
    try:
        # Find user by id or email
        user = session.query(User).get(id)

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
        session.rollback()
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
        session.rollback()
        print(e)
        return jsonify({'message': str(e)}), 500
