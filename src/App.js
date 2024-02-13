import { useState } from "react";
import Players from "./Component/Players.jsx";
import GameBord from "./Component/GameBord.jsx";
import "./App.css";
import { WINNING_COMBINATIONS } from "./WinningCombination.js";
import GameOver from "./Component/GameOver.jsx";

const initialBord = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialBord.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
    gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
    gameBoard[combination[1].row][combination[1].column];
    const thirSquareSymbol =
    gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  const hasDrow = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prveTurns) => {
      const currentPlayer = deriveActivePlayer(prveTurns);

      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prveTurns,
      ];

      return updateTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }

  return (
    <>
      <main>
        <div className="game-container">
          <ul className="highlight-player players">
            <Players
              initialName="Player 1"
              symbol="X"
              isActive={activePlayer === "X"}
              onChangeName={handlePlayerNameChange}
            />
            <Players
              initialName="Player 2"
              symbol="O"
              isActive={activePlayer === "O"}
              onChangeName={handlePlayerNameChange}

            />
          </ul>
          {(winner || hasDrow) && (
            <GameOver winner={winner} onRestart={handleRestart} />
          )}
          <GameBord onSelectSquer={handleSelectSquare} board={gameBoard} />
        </div>
      </main>
    </>
  );
}

export default App;
