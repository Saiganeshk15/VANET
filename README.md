# Secure Blockchain-Enhanced Machine Learning Model for UAV-VANET Data Transfer

## 🚀 Overview
This project integrates **Machine Learning (ML) and Blockchain** to detect and prevent malicious messages in **UAV-VANET (Vehicular Ad Hoc Networks)**. It uses an **ML model** to classify messages as **Malicious, Safety, or Traffic Update** and employs **Ethereum Blockchain** to record and block malicious users.

## 📌 Features
- **🚗 Vehicle Registration:** Vehicles register with the system before sending messages.
- **🛡️ Malicious Message Detection:** A trained **Support Vector Machine (SVM) model** identifies malicious messages.
- **🔗 Blockchain Integration:** Malicious messages are stored on **Ethereum (Ganache) blockchain**.
- **⛔ Blocking Mechanism:** Vehicles sending malicious messages are permanently blocked.
- **🌐 Web App (React + Material UI):** Users can interact with the system through a **React-based UI**.

---

## 🏗️ Project Structure
```
VANET-Project/
│── backend_api.py          # Flask API for ML and Blockchain interactions
│── ml_model.pkl            # Trained ML model for message classification
│── MaliciousMessageStorage.sol # Solidity Smart Contract
│── frontend/               # React Frontend
│   │── src/
│   │   │── pages/
│   │   │   ├── HomePage.js  # Main message submission page
│   │   │   ├── Register.js  # Vehicle registration page
│   │   │   ├── Blocked.js   # Page for blocked users
│   │   │── utils/
│   │   │   ├── api.js       # API functions to communicate with Flask backend
│   │── public/
│   │── package.json
│── README.md               # Project Documentation
```

---

## 🔧 Tech Stack
### **Frontend (React + Material UI)**
- **React.js** (with React Router)
- **Material UI** (UI Components)

### **Backend (Flask + Web3.py)**
- **Flask** (REST API)
- **Scikit-learn** (Machine Learning)
- **Web3.py** (Blockchain Integration)
- **Ganache** (Ethereum Blockchain for testing)
- **Solidity** (Smart Contract)

### **ML Model**
- **Support Vector Machine (SVM)**
- **Non-overlapped K-means Clustering**
- **TF-IDF Vectorization**

---

## 🛠️ Setup Instructions

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-repo/VANET-Project.git
cd VANET-Project
```

### **2️⃣ Backend Setup (Flask API + ML Model + Blockchain)**
#### **Install Dependencies**
```sh
pip install -r requirements.txt
```
#### **Run Flask Server**
```sh
python backend_api.py
```

### **3️⃣ Smart Contract Deployment**
#### **Compile and Deploy Smart Contract**
1. Start **Ganache** and get the RPC URL (e.g., `http://127.0.0.1:7545`).
2. Use **Remix IDE** or **Hardhat** to deploy `MaliciousMessageStorage.sol`.
3. Copy the **contract address** and update it in `backend_api.py`.

### **4️⃣ Frontend Setup (React App)**
```sh
cd frontend
npm install
npm start
```

---

## 📡 API Endpoints
### 🚗 **Vehicle Registration**
- **`POST /api/register`**
```json
{
  "vehicleId": "ABC123",
  "owner": "John Doe"
}
```

### 📝 **Check Message**
- **`POST /api/check-message`**
```json
{
  "message": "There is an accident ahead!",
  "vehicleId": "ABC123"
}
```

### 🔗 **Get Blockchain Records**
- **`GET /api/records`**

### ⛔ **Blocked Users**
- **`GET /api/blocked-users`**

---

## 🔥 Demo Workflow
1. **Register a vehicle** using `/register` endpoint.
2. **Send a message** using `/check-message`. If malicious, it's stored on blockchain, and the sender is blocked.
3. **Check blockchain records** using `/records`.
4. **Blocked users can't send messages** and are redirected to `/blocked` in UI.

---

## ⚡ Future Enhancements
✅ Deploy smart contract on **Ethereum Testnet** (e.g., **Goerli or Sepolia**).  
✅ Implement **IPFS** for decentralized storage.  
✅ Improve **ML Model** with deep learning for better accuracy.  
✅ Add **Admin Dashboard** to manage vehicles and messages.  

---

## 👨‍💻 Author
Project developed by **[Your Name]**

📌 **Contact:** [saiganeshk15@gmail.com] | [LinkedIn](https://www.linkedin.com/in/saiganesh-kemburu)

