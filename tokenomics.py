from web3 import Web3
import json
from firebase_admin import firestore as fs
import contract_info as ci

def get_supply():
    web3 = Web3(Web3.HTTPProvider(ci.infura_url))
    contract_address = web3.to_checksum_address(ci.contract_address)
    contract_abi = json.loads(ci.contract_abi)
    contract = web3.eth.contract(address=contract_address, abi=contract_abi)
    total_supply = contract.functions.totalSupply().call()
    total_supply = web3.from_wei(total_supply, 'ether')
    return total_supply

def get_holders():
    web3 = Web3(Web3.HTTPProvider(ci.infura_url))
    contract_address = web3.to_checksum_address(ci.contract_address)
    contract_abi = json.loads(ci.contract_abi)
    contract = web3.eth.contract(address=contract_address, abi=contract_abi)
