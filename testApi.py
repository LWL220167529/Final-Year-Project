from flask import *
from flask_cors import CORS
from sshtunnel import SSHTunnelForwarder
import mysql.connector

app = Flask(__name__)
CORS(app)

ssh_host = '157.230.39.43'
ssh_username = 'root'
ssh_password = '@2Fypdroplets'

database_username = 'fyp'
database_password = '@2Fypdroplets'
database_name = 'FYP'

@app.route('/')
def hello():
    return "Hello World!"

@app.route('/getUsers')
def get_users():
    try:
        with SSHTunnelForwarder(
            (ssh_host, 22),
            ssh_username=ssh_username,
            ssh_password=ssh_password,
            remote_bind_address=('localhost', 3306)
        ) as tunnel:
            print("SSH tunnel created successfully.")
            
            cnx = mysql.connector.connect(
                user=database_username,
                password=database_password,
                host='127.0.0.1',
                port=tunnel.local_bind_port,
                database=database_name
            )
            print("Database connected successfully.")
            
            cursor = cnx.cursor()
            cursor.execute("SELECT * FROM user")
            print("SQL query executed successfully.")
            
            results = cursor.fetchall()
            cnx.close()

            data_dict = []
            for row in results:
                data = {'id': row[0], 'name': row[1], 'email': row[2], 'password': row[3]}
                data_dict.append(data)
            return jsonify(data_dict)
    except Exception as e:
        print("Error connecting to database: ", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)





#from flask import *
# from flask_cors import CORS
# import mysql.connector

# app = Flask(__name__)
# CORS(app)

# database_username = 'fyp'
# database_password = '@2Fypdroplets'
# database_name = 'FYP'

# @app.route('/')
# def hello():
#     return "Hello World!"

# @app.route('/getUsers')
# def get_users():
#     try:
#         cnx = mysql.connector.connect(
#             user=database_username,
#             password=database_password,
#             host='127.0.0.1',
#             database=database_name
#         )
#         print("Database connected successfully.")

#         cursor = cnx.cursor()
#         cursor.execute("SELECT * FROM user")
#         print("SQL query executed successfully.")

#         results = cursor.fetchall()
#         cnx.close()

#         data_dict = []
#         for row in results:
#             data = {'id': row[0], 'name': row[1], 'email': row[2], 'password': row[3]}
#             data_dict.append(data)
#         return jsonify(data_dict)
#     except Exception as e:
#         print("Error connecting to database: ", e)
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=5000)