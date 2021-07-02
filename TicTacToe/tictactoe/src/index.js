import { timeout } from 'async';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
    this.clickedIndexes = [];
    this.robotTurn = true;
    this.unclicked = [0,1,2,3,4,5,6,7,8];
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = 'X';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
    this.clickedIndexes.push(i);
    for(let j = 0; j < this.unclicked.length; j++)
    {
        if(this.unclicked[j] == i)
          this.unclicked.splice(j,1);
    }
    setTimeout(() => {
      this.RobotGo(squares);
    }, 500); 
  }

  ResetGame()
  {
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      stepNumber: 0,
    };
    this.clickedIndexes = [];
    this.robotTurn = true;
    this.unclicked = [0,1,2,3,4,5,6,7,8];
    this.setState({
      stepNumber: 0,
      xIsNext: true
    });
  }

  RobotGo(squares, nextState)
  {
    var robotIndex = Math.floor(Math.random() * this.unclicked.length);
   
    if (calculateWinner(squares) || squares[this.unclicked[robotIndex]]) {
      return;
    }
    squares[this.unclicked[robotIndex]] = 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
    
    this.unclicked.splice(robotIndex,1);
    this.clickedIndexes.push(robotIndex);
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
    </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div></div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
