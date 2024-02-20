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

@app.route('/connect_wallet_login', methods=['POST'])
def connect_wallet_login():
    data = request.get_json()
    email = data.get('email')
    public_key = data.get('public_key')
    main.add_wallet(email, public_key)
    return jsonify({'message': "Wallet Updated"})

@app.route('/verify_email', methods=['GET'])
def verify_email():
    data = request.get_json()
    email = data.get('email')
    if main.check_email(email):
        return jsonify({'message': "Email is good", "status": 1})
    else:
        return jsonify({'message': "Email not found, try again", "status": 0})
