import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


  //This is a component function, this is the best way of make a component that just have a render method
  //This is the component shorthand, now, do this have a state attribute?

  function Square(props){
    let squareClassName = "square "
    
    if(props.winnerObject){
      squareClassName += props.winnerObject.indexes.includes(props.index)?"hightlight-square":"";
    }


    return (
      <button 
        className = {squareClassName} 
        
        onClick = {() => {props.onClick()}}
      >
        {props.value}
      </button>

    );
  }
  



  //Second react component
  class Board extends React.Component {

    renderSquare(i) {
      
      //We are passing the value of this array to the props of this Square.
      //Also, We are passing the method "handleClick" to this react component, the name of this component is a convention
      //In react, when We are passing a prop that is a event, then, We must call this prop of the next way
      //"on[EVENT]", this is a React convention.
      return <Square 
                value = {this.props.squares[i]} 
                onClick = {()=>{this.props.onClick(i)}}
                winnerObject = {this.props.winnerObject}
                index = {i}
              />;
    
    }

    //Render all squares with 2 for loops
    renderSquares(){
      let squaresDes = [];
      let squareElements = [];
      
      for(let i=0; i<3; i++){
        
        for(let a=0; a<3; a++){
          //This is for the number follow the next sequence: index=0,1,2,3,4,...,8
          let index = (i*3) +a;
          squareElements.push(this.renderSquare(index));
        }

      squaresDes.push(<div className="board-row">{squareElements}</div>)
      squareElements = [];
      }

      return squaresDes;

    }


    render() {

      
      return (
        <div className="board">
          <div className="status">{this.props.status}</div>
          {this.renderSquares()}
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
          squares:Array(9).fill(null),
          lastRow:null,
          lastCol:null,
        }],
        stepNumber : 0,
        xIsNext:true,
        descOrder:false,
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
            squares,
            lastRow: parseInt(i/3) + 1,
            lastCol: (i%3) + 1
          }
        ]),
        xIsNext : !this.state.xIsNext,
        stepNumber : history.length,
        
      });
    }

    jumpTo(step){
      
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      })

    }

    changeOrder(){
      
      this.setState({
        history:this.state.history,
        stepNumber:this.state.stepNumber,
        xIsNext:this.state.xIsNext,
        descOrder:!this.state.descOrder,
      });
    }

    render() {

      const history = this.state.history.slice();
      

      let current = history[this.state.stepNumber];

      const winnerObject = calculateWinner(current.squares);

      //This is a StepButton component Array
      const moves = history.map((step, move) => {
        
        return <StepButton 
          step={step} 
          move={move}
          moveSelected = {this.state.stepNumber} 
          onClick={()=>this.jumpTo(move)}
        />;
      
      });

      //If the user chosse "Change order", then, we should change the order of the StepButton component Array
     /*  if(this.state.descOrder==true){
        
        //To change the order
        for(let i = 0;i < moves.length; i++){
          let aux = moves[i];
          
          moves[i] = moves[moves.length-1-i];
          moves[moves.length-1-i] = aux;
            
        }
      } */
      if(this.state.descOrder){
        moves.reverse();
      }

      let status;
      if(winnerObject){
      
        status = 'The winner is: '+ (winnerObject.winner);
      
      }else if(this.state.stepNumber === 9){
        status = "This is a draw";

      }
      else{
      
        status = 'Next player: '+ (this.state.xIsNext?"X":"O");
      
      }


      let orderIconClassName = (this.state.descOrder?"fa fa-angle-down":"fa fa-angle-up");
      

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares = {current.squares}
              
              onClick = {(i)=>this.handleClick(i)}
              
              winnerObject={winnerObject}

              status = {status}
            />
          </div>
          
          <div className="game-info">
            <button className="order-button" onClick={()=>{this.changeOrder()}}><i className={orderIconClassName}></i> Change order</button>
            <ol>{moves}</ol>
          </div>
          
        </div>
      );
    }
  }
  


  function StepButton(props){
    
    let row = props.step.lastRow;
    
    let col = props.step.lastCol;

    let moveSelected = props.moveSelected;

    const desc = props.move ?
      'Go to move #' + props.move + ` ( ${row}, ${col})`:
      'Go to game start';

    let className = moveSelected === props.move ? "step-selected" : "";

    return (
      <li key={props.move}>
        <button className={className} onClick={() => props.onClick()}>{desc}</button>
      </li>
    );


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
        return {
          winner:squares[a],
          indexes:[a,b,c]
        };
      }
    }
    return null;
  }



  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  