from web3 import Web3
import json
from eth_account.messages import encode_defunct
import contract_info as ci

# def send_signed_transaction(signed_tx):
#     web3 = Web3(Web3.HTTPProvider(ci.infura_url))
#     tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
#     tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
#     return tx_receipt

# def propose_idea():
#     web3 = Web3(Web3.HTTPProvider(ci.infura_url))
#     contract_address = web3.to_checksum_address(ci.contract_address)
#     contract_abi = json.loads(ci.contract_abi)
#     contract = web3.eth.contract(address=contract_address, abi=contract_abi)

def get_all_proposals():
    web3 = Web3(Web3.HTTPProvider(ci.infura_url))
    contract_address = web3.to_checksum_address(ci.contract_address)
    contract_abi = json.loads(ci.contract_abi)
    contract = web3.eth.contract(address=contract_address, abi=contract_abi)
    proposal_count = contract.functions.proposalCount().call()
    proposals = []
    for proposal_id in range(proposal_count):
        proposal = contract.functions.proposals(proposal_id).call()
        proposals.append({
            'id': proposal_id,
            'description': proposal[0],
            'executed': proposal[2],
            'votesFor': proposal[3],
            'votesAgainst': proposal[4]
        })
    return proposals
