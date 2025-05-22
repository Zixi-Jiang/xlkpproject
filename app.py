import os
import mysql.connector

def get_patterns():
    db_config = {
        'host': os.getenv('DATABASE_HOST', 'localhost'),
        'user': os.getenv('DATABASE_USER', 'root'),
        'password': os.getenv('DATABASE_PASSWORD', 'Mysql:112358'),
        'database': os.getenv('DATABASE_NAME', 'xilan_kapu')
    }
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT name, type, features, symbolic_meaning, background_story FROM patterns')
    patterns = cursor.fetchall()
    cursor.close()
    conn.close()
    return patterns