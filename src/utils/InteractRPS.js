import { ethers } from "ethers";
import { CalculateHash } from "./hasher.js";
import { RPS_ABI } from "../../contract_data.js";
import { toast } from "react-toastify";

const getContract = async (address) => {
    try{
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(address, RPS_ABI, provider);
  return contract;
}
    catch(err){
        toast.error("Can't Access account."+ err)
    }
};
const getSignedContract = async (address) => {
    try{
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(address, RPS_ABI, signer);
  return contract;
    }
    catch(err){
        toast.error("Can't Access account."+err);
    }
};

export const getVal = async (address) => {
  const contract = await getContract(address);
  let val = await contract.stake();
  console.log(val);
  val = parseFloat(val) / parseFloat(1000000000000000000n);
  console.log(val);

  return val;
};
export const getCreator = async (address) => {
  try {
    const contract = await getContract(address);
    const creator = await contract.j1();
    return creator;
  } catch (err) {
    console.log("Can't access the contract!");
  }
};
export const getOpponent = async (address) => {
  try {
    const contract = await getContract(address);
    const oponent = await contract.j2();
    return oponent;
  } catch (err) {
    console.log("Can't access the contract!");
  }
};

export const TimeOut = async (address, account) => {
  try {
    const contract = await getSignedContract(address);
    const j1 = await contract.j1();
    const j2 = await contract.j2();
    if (parseInt(j1) === parseInt(account) & !(contract.c2())) {
      await contract.j2Timeout();
      toast.done("Timout Successful! Check Your wallet :)");
      return;
    } else if (parseInt(j2) === parseInt(account) & (contract.c2()) ) {
      await contract.j1Timeout();
      toast.done("Timout Successful! Check Your wallet :)");
      return;
    } else {
      toast.error("You are not allowed to use this feature now.");
    }
  } catch (err) {
    console.log("Can't access the contract!" + { err });
    toast.error("Can't Access contract."+err);
  }
};

export const Play = async (address, account, move) => {
  try {
    const contract = await getSignedContract(address);
    const j2 = await contract.j2();
    const value = await contract.stake();
    const options = { value: value };
    if (parseInt(j2) === parseInt(account)) {
      await contract.play(move, options);
      toast.done("Your move has been save. Let's wait for opponent to reveal their trick..");
      return;
    } else {
      alert("You are not allowed to use this feature.");
    }
  } catch (err) {
    console.log("Can't access the contract!" +  err );
    toast.error("Can't Access contract."+err);
  }
};

export const Solve = async (address, account, move, salt) => {
  try {
    const contract = await getSignedContract(address);
    const j1 = await contract.j1();
    console.log('contract mil gia');
    console.log(move);
    console.log(salt);

    if (parseInt(j1) === parseInt(account)) {
      await contract.solve(move, salt);
      toast.done("Game Finished. Check your wallet for rewards");
      return;
    } else {
      alert("You are not allowed to use this feature.");
      toast.error("You are not allowed to use this feature.");
    }
  } catch (err) {
    console.log("Can't access the contract!" +  err );
    toast.error("Can't Access contract."+err);
  }
};
export const Status= async(address)=>{
    try{
        let status='';
        const contract=await getContract(address);

        if (await contract.stake()===0n){
            
            status='disabled';
        }
        else{
            if (await contract.c1Hash()){
                status='playable';
            }
            if (await contract.c2()){
                status='solvable';
            }
        }
        return status;
    }
    catch(err){
        console.log("Can't access the contract!" + err);
        
    }

};

export const AllowTimeOut= async(address)=>{
    try{
        console.log(address)
        let status='';
        const contract=await getContract(address);
        const lastAction=await contract.lastAction();
        console.log(lastAction);
    }
    catch(err){
        console.log("Can't access the contract!" + err);
        
    }

};
export const TimeOutCheck = async (address, account) => {
  try {
    const contract = await getContract(address);
   
    const j1 = await contract.j1();
    const j2 = await contract.j2();
    let check=false;
    if (await contract.stake()===0n){
      return check;
    }
    console.log(j1);
    console.log(account);
    if (parseInt(j1) === parseInt(account) ) {
      if(!(await contract.c2())){
        check=true;
      }
    } else if (parseInt(j2) === parseInt(account)  ) {
      if (await contract.c2()){
      check=true;
      }
    } 
    return check;
  } catch (err) {
    console.log("Can't access the contract!" + err );

  }
};