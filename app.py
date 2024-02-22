from flask import Flask, request, jsonify
import main
import balances
import minting
import voting
from tokenomics import get_supply, get_holders
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
    balance_list = balances.get_balances()
    return jsonify(balance_list)

@app.route('/get_wallet_balance', methods=['GET'])
def get_wallet_ballance():
    data = request.get_json()
    public_key = data.get('public_key')
    balance = balances.get_single_balance(public_key)
    return jsonify({"public_key": public_key, "balance": balance})

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

@app.route('/get_history', methods=['GET'])
def get_history():
    history = main.get_history()
    return jsonify(history)

# @app.route('/sign_purchase', methods=['POST'])
# def sign_purchase():
#     data = request.get_json()
#     sender_address = data['public_key']
#     signature = data['sender_signature']
#     message = data['message']
#     send_qty = data['send_qty']

#     minting.purchase(sender_address, signature, message, send_qty)

#     return jsonify({"message": "success"})

@app.route('/fetch_supply', methods = ['GET'])
def fetch_supply():
    supply = get_supply()
    return jsonify(supply)

@app.route('/fetch_holders', methods = ['GET'])
def fetch_holders():
    holders = get_holders()
    return jsonify(holders)

# @app.route('/send_signed_proposal', methods=['POST'])
# def send_signed_proposal():
#     data = request.get_json()
#     signiature = data.get('signiature')
#     response = voting.send_signed_transaction(signiature)
#     return jsonify(response)

@app.route('/fetch_all_proposals', methods=['GET'])
def fetch_all_proposals():
    proposals = voting.get_all_proposals()
    return jsonify(proposals)
