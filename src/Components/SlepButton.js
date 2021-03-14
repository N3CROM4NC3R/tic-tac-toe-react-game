export default function StepButton(props) {
  let row = props.step.lastRow;
  let col = props.step.lastCol;
  let moveSelected = props.moveSelected;
  const desc = props.move
    ? "Go to move #" + props.move + ` ( ${row}, ${col})`
    : "Go to game start";
  let className = moveSelected === props.move ? "step-selected" : "";

  return (
    <li key={props.move}>
      <button className={className} onClick={() => props.onClick()}>
        {desc}
      </button>
    </li>
  );
}
