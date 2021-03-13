import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//First react component
/* class Square extends React.Component {

    constructor(props){
        super(props);

        //this.state = {
        //  value:null,
        //};
    
    }


    render() {
      

      return (
        //When We call setState method, We are telling to React that renders this component again, with the new value of the state.
        //Note: When We call this method, also, the child components render themself again 
        <button className="square" onClick={() => {this.props.onClick()}} >
          {/*Then, we call again the this.state.value "*\/"}
          {this.props.value}
        </button>
      );
    }
  }

*/

  //This is a component function, this is the best way of make a component that just have a render method
  //This is the component shorthand, now, do this have a state attribute?

  function Square(props){
    
    return (
      <button 
        className = "square" 
        
        onClick = {() => {props.onClick()}}
      >
        {props.value}
      </button>

    );
  }
  



  //Second react component
  class Board extends React.Component {

   /*  handleClick(value){
      //this.setState({squares[value]:"x"});
      //alert("Hello");

      const squares = this.state.squares.slice();

      //If it have a winner or the square is filled then
      if(calculateWinner(squares) || squares[value]){
        return ;
      }

      squares[value] = this.state.xIsNext ? "X" : "O";
      this.props.onClick(squares);
      //We change te turn of the game tic tac

      this.setState({
        squares,
        xIsNext:!this.state.xIsNext
      });
    } */


    renderSquare(i) {
      
      //We are passing the value of this array to the props of this Square.
      //Also, We are passing the method "handleClick" to this react component, the name of this component is a convention
      //In react, when We are passing a prop that is a event, then, We must call this prop of the next way
      //"on[EVENT]", this is a React convention.
      return <Square 
                value = {this.props.squares[i]} 
                onClick = {()=>{this.props.onClick(i)}}
              
              />;
    
    }
  
    render() {

      
      return (
        <div className="board">
          <div className="status">{this.props.status}</div>
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
      );
    }
  }
  

  //Third react component
  class Game extends React.Component {

    constructor(props){
      super(props);
      this.state = {

        history:[{
          squares:Array(9).fill(null)
        }],
        stepNumber : 0,
        xIsNext:true
      
      };
    }
    //This is for handle the click from the game, this method make all
    handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber+1);
      
      const current = history[history.length-1];

      const squares = current.squares.slice();

      if( calculateWinner(squares) || squares[i] ){
        return;
      }

      squares[i] = this.state.xIsNext ? "X" : "O";

      

      this.setState({
        history : history.concat([
          {
            squares
          }
        ]),
        xIsNext : !this.state.xIsNext,
        stepNumber : history.length
      });
    }

    jumpTo(step){
      
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      })

    }

    render() {

      const history = this.state.history.slice();
      

      let current = history[this.state.stepNumber];

      console.log(this.state.stepNumber);
      
      const winner = calculateWinner(current.squares);

      const moves = history.map((squares, move) => {
        
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });


      let status;
      
      if(winner){
      
        status = 'The winner is: '+ (winner);
      
      }else{
      
        status = 'Next player: '+ (this.state.xIsNext?"X":"O");
      
      }



      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares = {current.squares}
              
              onClick = {(i)=>this.handleClick(i)}
              
              status = {status}
            />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  


  // ========================================
  
  function calculateWinner(squares) {

    //This are the lines where X or O could be winners
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

    //We compare each index of the square array with the winner lines.
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      //If the line have in each index the same player, then, that player will be winner
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }



  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  