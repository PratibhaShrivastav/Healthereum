from rest_framework.response import Response
from web3 import Web3
import io
import json

def add_data_block(data):

    """
    Blockchain on duty
    """
    w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))       #Creating Instance of web3 object
    with open("contracts/data.json", 'r') as f:
        datastore = json.load(f)
        abi = datastore["abi"]
        contract_address = datastore["contract_address"]

    w3.eth.defaultAccount = w3.eth.accounts[1]                      #Selecting an account with which trancsactions would happen
    instance = w3.eth.contract(address=contract_address, abi=abi)   #Getting the instance of deployed contract using ABI and address

    #Saving data to Blockchain
    instance.functions.addData(data["hospital_name"], data["doc_name"] , data["doc_skill"], data["address"],
    data["date"], data["patient_name"], data["age"], data["gender"], data["disease"], data["medicines"]).transact()
    
    block_id = instance.functions.recordCount().call()
    #print("Data stored in Blockchain successfully, id = ", block_id)
    #print("Fetching Data ...")
    
    data = instance.functions.showData(int(block_id)).call()
    data.append(block_id)

    return data

def show_data(block_id):

    """
    Blockchain on duty
    """
    w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))       #Creating Instance of web3 object
    with open("contracts/data.json", 'r') as f:
        datastore = json.load(f)
        abi = datastore["abi"]
        contract_address = datastore["contract_address"]

    w3.eth.defaultAccount = w3.eth.accounts[1]                      #Selecting an account with which trancsactions would happen
    instance = w3.eth.contract(address=contract_address, abi=abi)   #Getting the instance of deployed contract using ABI and address
    
    data = instance.functions.showData(int(block_id)).call()
    data.append(block_id)

    return data