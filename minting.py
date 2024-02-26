from web3 import Web3
import json
from eth_account.messages import encode_defunct
import contract_info as ci

def mint(recipient_public_key, mint_qty):
    web3 = Web3(Web3.HTTPProvider(ci.infura_url))
    contract_address = web3.to_checksum_address(ci.contract_address)
    contract_abi = json.loads(ci.contract_abi)
    public_key = web3.to_checksum_address("0x76a89dBd709835b9D1A3D60eE31f9e6C54CC8ac6")
    private_key = ci.private_key
    recipient_public_key = web3.to_checksum_address(recipient_public_key)
    contract = web3.eth.contract(address=contract_address, abi=contract_abi)
    mint_amount = web3.to_wei(mint_qty, 'ether')

    nonce = web3.eth.get_transaction_count(public_key)
    transaction = contract.functions.mint(recipient_public_key, mint_amount).build_transaction({
        'chainId': web3.eth.chain_id,
        'gas': 2000000,
        'gasPrice': web3.to_wei('50', 'gwei'),
        'nonce': nonce,
    })

    signed_txn = web3.eth.account.sign_transaction(transaction, private_key=private_key)
    tx_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)
    tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
    print(f"Transaction successful with hash: {web3.to_hex(tx_hash)}")

# def purchase(sender_address, signature, message, send_qty):
#     infura_url = ci.infura_url
#     web3 = Web3(Web3.HTTPProvider(infura_url))
#     contract_address = web3.to_checksum_address("0xc1fbe8D5B560b1359376e5D00d83ad8816e26d3D")
#     contract_abi =
#     contract = web3.eth.contract(address=contract_address, abi=contract_abi)
#     message_encoded = encode_defunct(text=message)
#     signer = web3.eth.account.recover_message(message_encoded, signature=signature)
#     recipient_address = web3.to_checksum_address("0x76a89dBd709835b9D1A3D60eE31f9e6C54CC8ac6")
#     send_qty = web3.to_wei(send_qty, 'ether')

#     nonce = web3.eth.get_transaction_count(sender_address)
#     tx = {
#         'nonce': nonce,
#         'to': contract_address,
#         'value': send_qty,
#         'gas': 2000000,
#         'gasPrice': web3.to_wei('50', 'gwei')
#     }

#     if signer.lower() == sender_address.lower():

#         return {'status': 'success', 'message': 'Signature verified, transfer initiated.'}
#     else:
#         return {'status': 'error', 'message': 'Signature verification failed.'}
