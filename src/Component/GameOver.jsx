export default function GameOver({ winner, onRestart }) {
  return (
    <div className="game-over">
      <h2>Game over</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>its drow</p>}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}
