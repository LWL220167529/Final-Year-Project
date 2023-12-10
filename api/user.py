import databaseClass
from flask import jsonify

def checkLogin(userID, password):
    try:
        #find user by userID or email
        userEmail = databaseClass.session.query(databaseClass.User).filter(databaseClass.User.email==userID).first()
        userId = databaseClass.session.query(databaseClass.User).filter(databaseClass.User.userID==userID).first()
        #check password
        if userId and userId.checkPassword(password) or userEmail and userEmail.checkPassword(password):
            return jsonify({'message': 'Login successfully', 'login': True})
        return jsonify({'message': 'Invalid username or password.', 'login': False})
    except Exception as e:
        print(e)

def signUpUser(userID, userName, password, email, phone):
    if databaseClass.session.query(databaseClass.User).filter(databaseClass.User.userID == userID).first() is None:
        #create new user
        try:
            new_user = databaseClass.User(userID=userID, userName=userName, email=email, password=password, phoneNumber=phone)
            databaseClass.session.add(new_user)
            databaseClass.session.commit()
            if new_user is not None:
                return jsonify({'message': 'Sign Up successfully', 'signUp': True}), 201
        except Exception as e:
            return jsonify({'message': 'Error occurred during sign up.', 'error': str(e)}), 500
    else:
        return jsonify({'message': 'User already exists.'}), 409
    
def updateUser(userID, userName, email, phoneNumber):
    try:
        #find user by userID
        user = databaseClass.session.query(databaseClass.User).filter(databaseClass.User.userID == userID).first()
        if not user:
            return jsonify({'message': 'User not found'}), 404
        user.userName = userName
        user.email = email
        user.phoneNumber = phoneNumber
        databaseClass.session.commit()
        return jsonify({'message': 'User updated successfully', 'updateUser': True}), 200
    except Exception as e:
        print(e)

def forgotPassword(userID, password):
    try:
        #find user by userID or email
        userEmail = databaseClass.session.query(databaseClass.User).filter(databaseClass.User.email==userID).first()
        userId = databaseClass.session.query(databaseClass.User).filter(databaseClass.User.userID==userID).first()
        #check password
        if userId:
            userId.password = password
            databaseClass.session.commit()
            return jsonify({'message': 'User updated password successfully', 'resetPassword': True})
        elif userEmail:
            userEmail.password = password
            databaseClass.session.commit()
            return jsonify({'message': 'User updated password successfully', 'resetPassword': True})
        return jsonify({'message': 'User not found'})
    except Exception as e:
        print(e)