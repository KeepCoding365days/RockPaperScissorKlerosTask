import React, { useEffect } from "react";
import { useState } from "react";
import {
  getVal,
  getCreator,
  getOpponent,
  TimeOut,
  Solve,
  Play,
  Status,
  TimeOutCheck,
} from "../utils/InteractRPS";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export function GameCard(props) {
  const account_address = useSelector((state) => state.accountAddress.value);
  const moves = ["Rock", "Paper", "Scissors", "Spock", "Lizard"];
  const [salt, setSalt] = useState(0);
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState("");
  const [creator, setCreator] = useState("");
  const [OpponentAddress, setOpponentAddress] = useState("");
  const [move, setMove] = useState(1);
  const [timeOut, setTimeOut] = useState(false);
  const getValue = async function () {
    const a = await getVal(props.contractAddress);
    setValue(a);
  };
  const getCreaterAdd = async function () {
    const a = await getCreator(props.contractAddress);
    setCreator(a);
  };
  const getOpponentAdd = async function () {
    const a = await getOpponent(props.contractAddress);
    setOpponentAddress(a);
  };
  const getStatus = async function () {
    const a = await Status(props.contractAddress);
    setStatus(a);
  };
  const getTimeOut = async function () {
    const a = await TimeOutCheck(props.contractAddress,account_address);
    setTimeOut(a);
  };

  useEffect(() => {
    getValue();
    getCreaterAdd();
    getOpponentAdd();
    getStatus();
    getTimeOut();
  }, []);

  useEffect(() => {
    document.getElementById("playBtn").value =
      account_address === creator ? "Solve" : "Play";
  }, [account_address, creator, OpponentAddress]);

  return (
    <div className="border-4 rounded-2xl border-amber-100">
      <button
        className="m-2"
        onClick={(e) => {
          getValue();
          getStatus();
          getTimeOut();
        }}
      >
        Refresh
      </button>
      <h1 className="font-bold">{props.contractAddress}</h1>

      <p className="font-bold text-2xl">{value} Tx</p>
      <p>Creator:{creator}</p>
      <p>Opponent:{OpponentAddress}</p>
      {status !== 'disabled'?
      <div className="flex flex-col">
        
      <div hidden={!((status === "solvable" & parseInt(creator)===parseInt(account_address)) ||(status === "playable" & parseInt(OpponentAddress)===parseInt(account_address)))}>
        <label htmlFor="move">Select Move:</label>
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
            <option value={val + 1}>{k}</option>
          ))}
        </select>
      </div>
      
        <div hidden={(status !== "solvable" || parseInt(creator)!==parseInt(account_address))}>
          <label htmlFor="salt">Secret Code:</label>
          <input
            className="border-black h-10 p-2 m-2  border-2 border-s-2 rounded-2xl bg-amber-50 text-black"
            id="salt"
            type="number"
            onChange={(e) => {
              setSalt(e.target.value);
            }}
          ></input>
        </div>

        <button
          disabled={!timeOut}
          onClick={(e) => {
            TimeOut(props.contractAddress, account_address);
          }}
        >
          TimeOut
        </button>
        <button
          disabled={!((status === "solvable" & parseInt(creator)===parseInt(account_address)) ||(status === "playable" & parseInt(OpponentAddress)===parseInt(account_address)))}
          onClick={(e) => {
            if (
              (parseInt(account_address) === parseInt(creator)) &
              (status === "solvable")
            ) {
              console.log(move);
                console.log(salt);
              if ( move!=0 & salt!=0) {
                
                Solve(props.contractAddress, account_address, move, salt);
                getStatus();
                getTimeOut();
              } else {
                toast.error("Please choose a move and enter secret code.");
              }
            } else if (
              (parseInt(account_address) === parseInt(OpponentAddress)) &
              (status === "playable")
            ) {
              if (move) {
                Play(props.contractAddress, account_address, move);
                getStatus();
                getTimeOut();
              } else {
                toast.error("Please choose a move.");
              }
            }
            console.log(creator);
            console.log(account_address);
          }}
          id="playBtn"
        >
          {parseInt(account_address) === parseInt(creator) ? "Solve" : "Play"}
        </button>
      </div> :''}
    </div>
  );
}

export default GameCard;
