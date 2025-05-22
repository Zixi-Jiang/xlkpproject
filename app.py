import os
import mysql.connector

def get_patterns():
    db_config = {
        'host': os.getenv('mysql.railway.internal'),
        'user': os.getenv('root'),
        'password': os.getenv('RIeDpcEJUEPzlunnHczZcoflosDYZWSY'),
        'database': os.getenv('patterns')
    }
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT name, type, features, symbolic_meaning, background_story FROM patterns')
    patterns = cursor.fetchall()
    cursor.close()
    conn.close()
    return patterns
