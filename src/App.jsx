import { config } from "dotenv";
import { useEffect, useState } from "react";
import { requestAcount } from "./utils/walletConnect";
import Game from "./components/game";
import "./App.css";
import GameCard from "./components/game_card";
import { useSelector, useDispatch } from "react-redux";
import { update } from "./features/accountAddressSice";
import { ToastContainer } from "react-toastify";
import "tailwindcss";
import { getContracts,getChallenges } from "./utils/api";

function App() {
  const address = useSelector((state) => state.accountAddress.value);
  const [connect, setConnect] = useState(false);
  const [myContracts, setMyContracts] = useState([]);
  const [myChallenges,setMyChallenges] =useState([]);
  const dispatch = useDispatch();
  const [myContractComponents, setmyContractComponents] = useState([]);
  const [myChallengeComponents, setmyChallengeComponents]=useState([]);

  useEffect(() => { //to be called initially to connect metamask
    const fetchAccount = async () => {
      const acc = await requestAcount();
      dispatch(update(acc));
    };
    const handleAccountChanged = (newAccounts) =>
      dispatch(update(newAccounts.length > 0 ? newAccounts[0] : null));
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChanged);
    }
    fetchAccount();

    //return () => {
    //window.ethereum?.removeListener("accountsChanged", handleAccountChanged);
    //};
  }, []);

  const listContracts = () => { //to be called to update contracts
    console.log("called");
    setmyContractComponents([]);
    //myContractComponents
    myContracts.forEach((element) => {
      //
      setmyContractComponents((curr) => [
        curr,
        <GameCard contractAddress={element} key={element} />,
      ]);
      //setmyContractComponents(<GameCard contractAddress={element} key={element}/>);
    });
  };

  const listChallenges = () => { //tp be called to update challenges
    setmyChallengeComponents([]);
    myChallenges.forEach((element) => {

      setmyChallengeComponents((curr) => [
        curr,
        <GameCard contractAddress={element} key={element} />,
      ]);
    });
  };
  useEffect(() => {
    listContracts();
    console.log(myContractComponents);
  }, [myContracts]);
  useEffect(()=>{
    listChallenges();
  },[myChallenges])
  useEffect(() => {
    setConnect(false);
    const fetchAccount = async () => {
      const acc = await requestAcount();
      dispatch(update(acc));
    };
    const handleAccountChanged = (newAccounts) =>
      dispatch(update(newAccounts.length > 0 ? newAccounts[0] : null));
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChanged);
    }
    if (connect) {
      fetchAccount();
    }
  }, [connect]);
  const fetchContracts = async () => {
    const conts = await getContracts(address);
    setMyContracts(conts);
  };
  const fetchChallenges = async () => {
    const conts = await getChallenges(address);
    setMyChallenges(conts);
  };

  useEffect(() => { //to update challenges
    fetchContracts();
    fetchChallenges();
  }, [address]);
 

  return (
    <div className="h-screen min-h-screen flex flex-col">
      <ToastContainer />
      <div>
        <h1 className="font-extrabold text-black text-9xl m-5">
          Rock Paper Scissor
        </h1>
        <div className="flex flex-row mt-10">
          <div className="flex-1/2 align-middle content-center">
          <h2 className="text-2xl font-bold"> My Wallet</h2>
            <p className="text-2xl font-bold m-5 al">{address}</p>

            <button
              className=""
              disabled={address}
              onClick={(e) => {
                setConnect(true);
              }}
            >
              Connect Wallet
            </button>
            <button
              className=""
              onClick={(e) => {
                fetchContracts()
                fetchChallenges();
              }}
            >
              Refresh Games
            </button>
          </div>

          <div className="flex-1/2 m-5 align-middle content-center">
            <h2 className="text-2xl font-bold"> Create a new Challenge</h2>
            <Game />
          </div>
        </div>
        {myContractComponents.length!==0?<h1 className="text-5xl m-3">Your Games</h1>:''}

        <div className="grid grid-cols-1 md:grid-cols-2 align-middle items-center">
          {myContractComponents}</div>

          { myChallengeComponents.length!==0?
      <h1 className="text-5xl m-3">Your Challenges</h1>:''}
      <div className="grid grid-cols-1 md:grid-cols-2 align-middle items-center">
      {myChallengeComponents}</div>
      </div>

        <p className="text-white font-bold align-bottom justify-items-end mt-auto ">Coded by <a href='https://www.linkedin.com/in/muhammad-affan-tech/'>Affan</a> for Kleros Internship</p>

    
      
    </div>
  );
}

export default App;
