from flask import Flask, request, jsonify
import main
from balances import balances

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/update-git-log', methods=['GET'])
def update_git_log():
    main.git_log()
    return jsonify({'message': "Git log updated"})

@app.route('/get_balances', methods=['GET'])
def get_balances():
    balance_list = balances()
    return jsonify(balance_list)
