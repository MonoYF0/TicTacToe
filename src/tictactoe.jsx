import React, { useState, useContext, useRef, useEffect } from "react";
function Cell({ onCellClick, value }) {
  return (
    <div onClick={onCellClick} className="cell">
      {value}
    </div>
  );
}

export default function Tictactoe() {
  let [xIN, setXIN] = useState(true);
  let [mtArr, setMtArr] = useState(Array(9).fill(null));
  let winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let running = true;
  function handleclick(i) {
    if (running) {
      let newArr = mtArr.slice();
      if (newArr[i]) {
        return;
      }
      if (xIN) {
        newArr[i] = "X";
        setXIN(false);
      } else {
        newArr[i] = "O";
        setXIN(true);
      }
      setMtArr(newArr);
    }
  }
  let status = document.querySelector(".status-text");
  function restBtn() {
    setMtArr(Array(9).fill(null));
    status.textContent = "X's Turn";
    setXIN(true);
  }
  useEffect(
    function () {
      for (let i = 0; i < winningConditions.length; i++) {
        let condition = winningConditions[i];
        let cellA = mtArr[condition[0]];
        let cellB = mtArr[condition[1]];
        let cellC = mtArr[condition[2]];
        if (cellA == cellB && cellB == cellC && cellA != null) {
          running = false;
          status.textContent = cellA + " Has Won"; 
        } else if (!mtArr.includes(null) && cellA != cellB) {
          status.textContent = "Draw!";
         
        }
      }
    },
    [mtArr]
  );

  return (
    <>
      <div className="the-game">
        <h1>
          <span>T</span>ic<span>T</span>ac<span>T</span>oe
        </h1>
        <div className="cells">
          <Cell onCellClick={() => handleclick(0)} value={mtArr[0]} />
          <Cell onCellClick={() => handleclick(1)} value={mtArr[1]} />
          <Cell onCellClick={() => handleclick(2)} value={mtArr[2]} />
          <Cell onCellClick={() => handleclick(3)} value={mtArr[3]} />
          <Cell onCellClick={() => handleclick(4)} value={mtArr[4]} />
          <Cell onCellClick={() => handleclick(5)} value={mtArr[5]} />
          <Cell onCellClick={() => handleclick(6)} value={mtArr[6]} />
          <Cell onCellClick={() => handleclick(7)} value={mtArr[7]} />
          <Cell onCellClick={() => handleclick(8)} value={mtArr[8]} />
        </div>
        <div className="status-text">{(xIN ? "X" : "O") + "'s Turn"}</div>
        <div onClick={restBtn} className="restart-btn">
          Restart
        </div>
      </div>
    </>
  );
}
