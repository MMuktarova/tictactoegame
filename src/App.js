import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [player, setPlayer] = useState(true);
  const [playerX, setPlayerX] = useState([]);
  const [playerO, setPlayerO] = useState([]);
  const [theWinnerIs, setWinner] = useState("No Winner Yet");
  const [board, setBoard] = useState([
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
    { id: 6, value: 6 },
    { id: 7, value: 7 },
    { id: 8, value: 8 },
    { id: 9, value: 9 }
  ]);

  const winnerOptions = [
    [4, 5, 6], //0
    [7, 8, 9], //1
    [1, 4, 7], //1
    [1, 2, 3], //3
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  // playerX = [3,2,9,1]
  // [1,2,3]
  const handlerClick = (index) => {
    // check if the spot was clicked before.
    if (isNaN(board[index].value)) {
      console.log("im alredy used");
      return;
    }
    // return
    //
    const playerIcon = player ? "X" : "O"; // we select the player
    const newBg = player ? "xs" : "os";
    if (player) {
      const newArrayX = [...playerX, board[index].id];
      setPlayerX(newArrayX);
    } else {
      const newArrayO = [...playerO, board[index].id];
      setPlayerO(newArrayO);
    }

    const boardCopy = [...board];
    boardCopy[index].value = playerIcon;
    setBoard(boardCopy);
    setPlayer(!player); // we are changing player
  };

  useEffect(() => {
    if (playerX.length >= 3) {
      // is is x or O
      // how we can change player to check

      const playerToCheck = player ? [...playerO] : [...playerX];
      const nowIsPlaying = player ? "O" : "X";
      for (let winnerOption of winnerOptions) {
        let count = 0;

        for (let element of winnerOption) {
          const wehaveIt = playerToCheck.indexOf(element);
          if (wehaveIt > -1) {
            count++;
          }
          if (count === 3) {
            console.log("we have a winner", winnerOption, playerToCheck);
            setWinner(` the winner is ${nowIsPlaying}`);
            break;
          }
        }
      }
    }
  }, [playerO, playerX]);
  return (
    <div className="App">
      <div className="container">
        {board.map((box, index) => {
          return (
            <div
              className={`box ${
                isNaN(box.value) ? (box.value === "X" ? "xs" : "os") : null
              }`}
              key={box.id}
              onClick={() =>
                theWinnerIs === "No Winner Yet" ? handlerClick(index) : null
              }
            >
              {box.value}
            </div>
          );
        })}
      </div>
      <div>
        <h2>{theWinnerIs}</h2>
      </div>
    </div>
  );
}
