import Web3 from "web3";
import ContractABI from "./MaliciousMessageStorage_abi.json";  // Ensure correct path

const web3 = new Web3("http://127.0.0.1:7545"); // Change if using a different RPC

const contractAddress = "0x56C69952e6a8F2bfA8E5803467D6C7B81EE86706"; // Replace with actual
const contractABI = ContractABI;

const contract = new web3.eth.Contract(contractABI, contractAddress);

export { web3, contract };