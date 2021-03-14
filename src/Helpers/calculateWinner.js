export default function calculateWinner(squares) {
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
