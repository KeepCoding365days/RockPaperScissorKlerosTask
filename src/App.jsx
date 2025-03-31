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

function App() {
  const address = useSelector((state) => state.accountAddress.value);
  console.log({ address });
  const [gameAdd, setgameAdd] = useState("");
  const [connect, setConnect] = useState(false);
  const [getGame, setgetGame] = useState(false);
  //const [address,setAddress]=useState('');
  const dispatch = useDispatch();

  useEffect(() => {
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

  return (
    <>
      <ToastContainer />
      <div>
        <h1 className="font-extrabold text-black text-9xl m-5">
          Rock Paper Scissor
        </h1>
        <div className="flex flex-row h-full">
          <div className="flex-1/2 align-middle content-center">
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
          </div>

          <div className="flex-1/2 m-5 align-middle content-center">
          <h2 className="text-2xl font-bold"> Create a new Challenge</h2>
          <Game />
          </div>
        </div>
        <div className="m-5">
          <label htmlFor="gameAdd">Enter Contract Address:</label>
          <input
            id="gameAdd"
            onChange={(e) => {
              setgameAdd(e.target.value);
            }}
          ></input>
          <button
            onClick={(e) => {
              setgetGame(true);
            }}
          >
            Get Game
          </button>
          {getGame ? 
            <GameCard contractAddress={gameAdd} />
          : 
            <p>Add address to play existing game</p>
          }
        </div>
      </div>
    </>
  );
}

export default App;
