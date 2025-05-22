from flask import Flask, jsonify
from flask_cors import CORS
import os
import mysql.connector

app = Flask(__name__)
CORS(app)

def get_patterns():
    db_config = {
        'host': os.getenv('MYSQLHOST'),
        'user': os.getenv('MYSQLUSER'),
        'password': os.getenv('MYSQLPASSWORD'),
        'database': os.getenv('MYSQLDATABASE')
    }
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT name, type, features, symbolic_meaning, background_story FROM patterns')
    patterns = cursor.fetchall()
    cursor.close()
    conn.close()
    return patterns

@app.route('/patterns', methods=['GET'])
def patterns():
    try:
        patterns = get_patterns()
        return jsonify(patterns)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
