import { BrowserProvider } from "ethers";
import { toast } from "react-toastify";
let provider;
const initialize = async () => {
  if (typeof (window.ethereum !== undefined)) {
    provider = new BrowserProvider(window.ethereum);
  } else {
    toast("Please install MetaMask");
  }
};
initialize();

export const requestAcount = async () => {
  try {
    const accounts = await provider.send("eth_requestAccounts", []);
    console.log("check");
    console.log(accounts[0]);
    console.log(parseInt(accounts[0]));
    return accounts[0];
  } catch (error) {
    toast("Error in requesting account");
    return null;
  }
};
