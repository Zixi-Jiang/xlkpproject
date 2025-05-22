from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

def get_patterns():
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='Mysql:112358',  # 替换为你的MySQL密码
        database='xilan_kapu'
    )
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