import { useState } from "react"

function Square(props) {
  // TODO: remove the useState call
  const [value, setValue] = useState(null)

  return (
    <button
      className="square"
      onClick={() => setValue("X")}
    >
      {value}
    </button>
  )
}

function Board() {
  const [squares, setSquares] = useState(
    Array(9).fill(null)
  )

  function renderSquare(i) {
    return <Square value={squares[i]} />
  }

  const status = "Next player: X"

  return (
    // TODO: use onClick={props.onClick}
    // TODO: replace value with props.value
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  )
}

export { Game }
