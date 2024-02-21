from flask import Flask, request, jsonify
import main
from balances import balances
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/update-git-log', methods=['GET'])
def update_git_log():
    result = main.git_log()
    if result == 1:
        return jsonify({'message': "Minted for existing wallet"})
    elif result == 2:
        return jsonify({'message': "Added to account balance - has not connected wallet yet"})
    else:
        return jsonify({'message': "Brand new contributor, added to DB"})


@app.route('/get_balances', methods=['GET'])
def get_balances():
    balance_list = balances()
    return jsonify(balance_list)

@app.route('/connect_wallet_login', methods=['POST'])
def connect_wallet_login():
    data = request.get_json()
    email = data.get('email')
    public_key = data.get('public_key')
    print(email, public_key)
    main.add_wallet(email, public_key)
    if main == 0:
        print("FOUND A BAD EMAIL")
        return jsonify({'message': "bad email", "status": 0})
    print("Yipee, wallet updated!")
    return jsonify({'message': "Wallet Updated", "status": 1})

@app.route('/verify_email', methods=['GET'])
def verify_email():
    data = request.get_json()
    email = data.get('email')
    if main.check_email(email):
        return jsonify({'message': "Email is good", "status": 1})
    else:
        return jsonify({'message': "Email not found, try again", "status": 0})

#asodubfkhjsdbfblsdfg
