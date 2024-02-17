from flask import Flask, request, jsonify
import main as m
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/update-git-log', methods=['GET'])
def update_git_log():
    m.git_log()
    return jsonify({'message': "Git log updated"})