
export default function GameBord({onSelectSquer,board}) {
  return (
    <>
      <ul className="game-board">
        {board.map((row, rowIndex) => (
            <li key={rowIndex}>
              <ul>
                {row.map((playerSymbol, colIndex) => 
                    (
                      <li key={colIndex}>
                        <button onClick={()=> onSelectSquer(rowIndex,colIndex)} disabled={playerSymbol !== null}>
                          {playerSymbol}
                        </button>
                      </li>
                    )
                  )}
              </ul>
              <br />
            </li>
          ))}
      </ul>
    </>
  );
}
