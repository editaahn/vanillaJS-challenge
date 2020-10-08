from flask import Flask, render_template, request
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('localhost', 27017)
db = client.movies

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/getmovies', methods=['GET'])
def getmovies():
    movies_list = list(db.movies_list.find({}, {'_id': False}))
    return {'result': 'success','movies_list': movies_list}

if __name__ == '__main__':
    app.run('127.0.0.1', port=8080, debug=True)
