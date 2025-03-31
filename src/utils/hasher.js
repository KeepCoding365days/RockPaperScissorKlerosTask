import { ethers } from "ethers";
import { HASH_ABI } from "../../contract_data";

const env = await import.meta.env;
const provider = new ethers.JsonRpcProvider(env.VITE_ALCHEMY_KEY);
const contract = new ethers.Contract(env.VITE_HASH_CON_ADD, HASH_ABI, provider);

export const CalculateHash = async (_c, salt) => {
  _c = parseInt(_c);
  salt = parseInt(salt);
  console.log(_c);
  console.log(salt);
  try {
    const val = await contract.hash(_c, salt);
    return val;
  } catch (err) {
    console.log("Hashing Failed:", err);
  }
};
