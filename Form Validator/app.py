from flask import Flask, render_template, request
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('localhost', 27017)
db = client.forms

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/signup', methods=['POST'])
def insert():
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']
    gender = request.form['gender']

    saved = {
        'name': name,
        'email': email,
        'password': password,
        'gender': gender
    }

    db.form.insert_one(saved)
    return {'result': 'success','msg':'connected'}

if __name__ == '__main__':
    app.run('127.0.0.1', port=8080, debug=True)