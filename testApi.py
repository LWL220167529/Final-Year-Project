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
def hello_world():
    with SSHTunnelForwarder(
        (ssh_host, 22),
        ssh_username=ssh_username,
        ssh_password=ssh_password,
        remote_bind_address=('localhost', 3306)
    ) as tunnel:
        cnx = mysql.connector.connect(
            user=database_username,
            password=database_password,
            host='127.0.0.1',
            port=tunnel.local_bind_port,
            database=database_name
        )
        cursor = cnx.cursor()
        cursor.execute("SELECT * FROM user")  # replace with your SQL query
        results = cursor.fetchall()
        cnx.close()

        data_dict = []
        for row in results:
            data = {'id': row[0], 'name': row[1], 'email': row[2], 'password': row[3]}
            data_dict.append(data)
    return jsonify(data_dict)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)