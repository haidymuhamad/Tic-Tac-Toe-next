"use client";
import { useState, useEffect } from "react";
import Cell from "./components/cell";
const winningCombos=[
  [0,1,2],
  [3,4,5],
  [6,7,8], 
  [0,3,6],
  [1,4,7],
  [2,5,8], 
  [0,4,8],
  [2,4,6] 
]
export default function Home() {
  const [cells, setCells] = useState(Array(9).fill("")); 
  const [go, setGo] = useState("circle");
  const[winningMessage,setWinningMessage]=useState("");
  const [circleScore ,setCircleScore]=useState(0);
  const [crossScore ,setCrossScore]=useState(0);
  useEffect(() => {
    let winnerFound = false;//why can't i just use let normally?
    winningCombos.forEach((combo) => {
const circleWins = combo.every((cell) => cells[cell] === "circle");
const crossWins = combo.every((cell) => cells[cell] === "cross");
if(circleWins){
  setWinningMessage("Circle Wins") ;
  setCircleScore(circleScore + 1);
  winnerFound = true;
}else if(crossWins){
 setWinningMessage("Cross Wins");
  setCrossScore(crossScore + 1);
  winnerFound = true;
}
    });
if(!winnerFound && cells.every((cell) => cell !== "")){
setWinningMessage("It's a Draw");
}
  }, [cells]);

  return (
    <div className="container">

      <div className="gameboard">
        {cells.map((cell, index) => (
          <Cell
            key={index}
            id={index}
            go={go}
            setGo={setGo}
            cells={cells}
            setCells={setCells}
            cell={cell}
            winningMessage={winningMessage}
          />
        ))}
      </div>
      <div className="message">{winningMessage}</div>
        {!winningMessage && <div className="message">{`its now ${go} turn!`}</div>}
      <button className="button" onClick={()=> {
        setCells(Array(9).fill(""));
        setGo("circle");
        setWinningMessage("");
      }}>Refresh</button>
      <button className="button" onClick={()=> {
          setCircleScore(0);
          setCrossScore(0);
      }}>Refresh Score</button>
      <div className="scoreboard">
        <p> ⭕ Circle: {circleScore} </p>
        <p>❌Cross:{crossScore} </p>     
      </div>
    </div>
  );
}
