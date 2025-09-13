import { Dispatch, SetStateAction } from "react";

type CellProps = {
  id: number;
  go: string;
  setGo: Dispatch<SetStateAction<string>>;
  cells: string[];
  cell: string;
  setCells: Dispatch<SetStateAction<string[]>>;
  winningMessage: string;
};

const Cell = ({ go, setGo, id, cells, setCells, cell, winningMessage }: CellProps) => {
   const handleClick = () => {
  // 🔹 1) Stop if round already ended (board locked)
  if (winningMessage) {
    return; 
  }

  // 🔹 2) Prevent overwriting a filled cell
  const notTaken = !cells[id];
  if (!notTaken) return;

  // 🔹 3) Create a copy of the array so we don’t mutate the state directly
  const copyCells = [...cells];

  // 🔹 4) Place "circle" or "cross" depending on current turn
  if (go === "circle") {
    copyCells[id] = "circle";
    setGo("cross");   // switch turn
  } else {
    copyCells[id] = "cross";
    setGo("circle");  // switch turn
  }

  // 🔹 5) Update board
  setCells(copyCells);

  // 🔹 6) (Extra) Check if someone won here, then setWinningMessage("Circle Wins!") for example
};


  return (
    <div className={`square ${cell}`} onClick={handleClick}>
      {cell === "circle" ? "O" : cell === "cross" ? "X" : ""}
    </div>
  );
};

export default Cell;
