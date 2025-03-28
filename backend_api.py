from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
from web3 import Web3
import json
from sklearn.feature_extraction.text import TfidfVectorizer  # Importing TF-IDF

# Load ABI
with open("MaliciousMessageStorage_abi.json", "r") as abi_file:
    ABI = json.load(abi_file)

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

# Load ML model and vectorizer
model = joblib.load("ml_model.pkl")  # Ensure correct path
vectorizer = joblib.load("vectorizer.pkl")  # Ensure correct path

# Blockchain Setup
web3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))
contract_address = "0x7056BED1b0DD2fB744756Bc185DB0b49c269d5D2"
contract = web3.eth.contract(address=contract_address, abi=ABI)

registered_vehicles = {}
blocked_users = set()

# 📩 Check Message API
@app.route("/api/check-message", methods=["POST"])
def check_message():
    data = request.json
    message = data.get("message")
    vehicle_id = data.get("vehicleId")

    if not message or not vehicle_id:
        return jsonify({"error": "Message and Vehicle ID are required!"}), 400

    if vehicle_id in blocked_users:
        return jsonify({"error": "Vehicle is blocked!"}), 403

    if vehicle_id not in registered_vehicles:
        return jsonify({"error": "Vehicle is not registered!"}), 401

    # 🛠 Transform message using TF-IDF
    message_transformed = vectorizer.transform([message]).toarray()

    # 🛠 Add dummy numerical feature values
    dummy_numerical_features = np.array([[1, 40.7128, -74.0060, 60, 2, 3]])  # Example values

    # 🔥 Combine numerical + text features
    final_input = np.hstack((dummy_numerical_features, message_transformed))

    # 🚀 Predict using the model
    prediction = model.predict(final_input)[0]

    if prediction == 1:  # 1 = Malicious
        sender_account = web3.eth.accounts[0]
        tx_hash = contract.functions.storeMessage("Malicious", message).transact({"from": sender_account})
        web3.eth.wait_for_transaction_receipt(tx_hash)
        blocked_users.add(vehicle_id)
        return jsonify({"result": "Malicious", "status": "Blocked", "tx_hash": tx_hash.hex()})

    return jsonify({"result": "Safe", "status": "Allowed"})

# 🚗 Register Vehicle API
@app.route("/api/register", methods=["POST"])
def register_vehicle():
    data = request.json
    vehicle_id = data.get("vehicleId")
    owner = data.get("owner")

    if not vehicle_id or not owner:
        return jsonify({"error": "Vehicle ID and Owner are required!"}), 400

    if vehicle_id in blocked_users:
        return jsonify({"error": "Vehicle is blocked!"}), 403
    
    if vehicle_id in registered_vehicles:
        return jsonify({"message": "Vehicle is already registered!", "success": True})

    registered_vehicles[vehicle_id] = owner
    print(registered_vehicles)
    return jsonify({"message": "Vehicle registered successfully!", "vehicles": registered_vehicles, "success": True})

# 🔗 Get Blockchain Records
@app.route("/api/records", methods=["GET"])
def get_records():
    count = contract.functions.getMaliciousCount().call()
    records = []

    for i in range(count):
        entry = contract.functions.messages(i).call()
        records.append({"id": entry[0], "type": entry[1], "hash": entry[2], "sender": entry[3]})

    return jsonify(records)

# 🚫 Get Blocked Users
@app.route("/api/blocked-users", methods=["GET"])
def get_blocked_users():
    return jsonify(list(blocked_users))

@app.route("/api/is-blocked/<vehicle_id>", methods=["GET"])
def is_vehicle_blocked(vehicle_id):
    is_blocked = vehicle_id in blocked_users
    print(is_blocked)
    return jsonify({"isBlocked": is_blocked})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
