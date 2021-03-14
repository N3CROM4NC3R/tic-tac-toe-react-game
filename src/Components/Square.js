//This is a component function, this is the best way of make a component that just have a render method
//This is the component shorthand, now, do this have a state attribute?

export default function Square(props) {
  return (
    <button
      className="square"
      onClick={() => {
        props.onClick();
      }}
    >
      {props.value}
    </button>
  );
}
