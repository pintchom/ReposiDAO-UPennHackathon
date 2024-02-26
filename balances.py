from web3 import Web3
import json
from firebase_admin import firestore as fs
import contract_info as ci

def get_balances():
    db = fs.client()
    cont_logged_in_ref = db.collection('cont_logged_in')
    docs = cont_logged_in_ref.stream()
    balances = {}
    for doc in docs:
        balances[doc.id] = get_single_balance(doc.to_dict()['public_key'])
        print(f'Email: {doc.id}, Public Keys: {doc.to_dict()}')
    return balances


def get_single_balance(public_key):
    web3 = Web3(Web3.HTTPProvider(ci.infura_url))
    contract_address = web3.to_checksum_address(ci.contract_address)
    contract_abi = json.loads(ci.contract_abi)
    contract = web3.eth.contract(address=contract_address, abi=contract_abi)
    address = web3.to_checksum_address(public_key)
    balance = contract.functions.balanceOf(address).call()
    balance_in_ether = web3.from_wei(balance, 'ether')
    print(f"Address: {public_key}, Balance: {balance_in_ether}")
    return balance_in_ether
