import { ethers } from "ethers";
import { CalculateHash } from "./hasher.js";
import { RPS_ABI } from "../../contract_data.js";
import { RPS_BYTECODE } from "../../contract_data.js";
import { generateSalt } from "../salt.js";
export const CreateRPS = async (move, value, oppAdd) => {
  //const salt=generateSalt();
  //console.log(typeof(salt));
  const salt = Math.floor(Math.random() * 4e58) + 1;
  
  console.log(salt);
  try {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      alert("MetaMask not detected");
      return;
    }

    // Request MetaMask connection
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    // Get signer (MetaMask account)
    const signer = await provider.getSigner();

    // Create contract factory
    const contractFactory = new ethers.ContractFactory(
      RPS_ABI,
      RPS_BYTECODE,
      signer
    );
    console.log(move);
    console.log(salt);
    const hashval = await CalculateHash(move, salt);
    const options = { value: ethers.parseEther(value) };

    // Deploy contract with constructor args
    const contract = await contractFactory.deploy(hashval, oppAdd, options);

    console.log("Deploying contract...");
    await contract.waitForDeployment();
    console.log("Contract deployed at:", contract.target);
    const data = { address: contract.target, salt: salt };
    return data;
  } catch (error) {
    console.error("Error deploying contract:", error);
  }
};
