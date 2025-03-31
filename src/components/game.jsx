import { useState } from "react";
import { CalculateHash } from "../utils/hasher";
import { CreateRPS } from "../utils/rps";
import { toast,ToastContainer } from "react-toastify";

const Game = () => {
  const [hash, setHash] = useState(0);
  const [salt, setSalt] = useState(0);
  const [move, setMove] = useState(1);
  const [value, setValue] = useState(0);
  const [oppAdd, setoppAdd] = useState(0);
  const moves = ["Rock", "Paper", "Scissors", "Spock", "Lizard"];

  const getRPSAdd = async () => {
    console.log('constructor called')
    let val = await CreateRPS(move, value, oppAdd);
    setHash(val.address);
    setSalt(val.salt.toFixed());
    alert(`Your Contract is created. Remember your move and save Secret code:${val.salt.toFixed()}.
     Share address with your frnd:${val.address}`)
  };

  return (
    <div>
      <ToastContainer />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getRPSAdd();
        }}
      >
        <div className="flex flex-col m-5 justify-items-center">
          <label htmlFor="oppAdd">Opponent Account Address:</label>
          <input
            required
            id="oppAdd"
            className="border-black h-10 p-2 m-2 border-2 border-s-2 rounded-2xl bg-amber-50 text-black"
            onChange={(e) => {
              setoppAdd(String(e.target.value));
            }}
          ></input>
          <label htmlFor="move">Select Move</label>
          <select
            required
            id="move"
            className="border-black h-10 p-2 m-2  border-2 border-s-2 rounded-2xl bg-amber-50 text-black"
            onChange={(e) => {
              setMove(String(e.target.value));
              console.log(move);
            }}
          >
            {moves.map((k, val) => (
              <option value={val + 1} key={val}>{k}</option>
            ))}
          </select>

          <label htmlFor="value">Enter Bet Value</label>

          <input
            required
            id="value"
            className="border-black m-2 h-10 p-2 border-2 border-s-2 rounded-2xl bg-amber-50 text-black"
            onChange={(e) => {
              setValue(String(e.target.value));
            }}
          ></input>
          <button className="" type="submit">
            Submit
          </button>
        </div>
      </form>
      <p>Contract Address is: {hash}</p>
      <p>Secret Key is: {salt}</p>
    </div>
  );
};

export default Game;
