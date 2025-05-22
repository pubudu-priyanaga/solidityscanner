# 🔐 Solidity Vulnerability Scanner

A web-based tool to scan Solidity smart contracts for common vulnerabilities using static analysis.

---

## 🚨 Vulnerabilities Detected

This tool currently supports detection of the following vulnerabilities:

- ⚠️ `delegatecall`: Can lead to code execution in the context of the calling contract.
- ♻️ `reentrancy`: A common exploit where an external call can re-enter the same function before the previous invocation is complete.
- 💣 `selfdestruct`: Destroys a contract and sends its funds to a target address.
- 🚫 `unchecked external calls`: External calls that do not check return values can be dangerous.

---

## 🚀 Getting Started

### Backend (Server)

1. Navigate to the server folder:
   ```bash
   cd server
2. Start the backend:
   ```bash
   python app.py

### Frontend (Client)

1. Navigate to the client folder:
   ```bash
   cd client
2. Start the backend:
    ```bash
    npm install
    npm start

## 🧪 How It Works

- Upload your Solidity .sol file using the web interface.
- The backend will analyze the contract using static code analysis techniques.
- The frontend will display the vulnerable lines and code patterns found in the contract.
    
## 📌 Notes

- Make sure Python and Node.js are installed.
- This is an early-stage project; more features and vulnerability patterns will be added in future versions.
