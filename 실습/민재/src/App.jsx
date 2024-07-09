import Counter from "./components/Counter";

var counter = 0;
var instances = [];

function Y() {
  this.j = 5;
}

function X() {
  this.i = counter++;
  this.y = new Y();
}
function App() {
  function handleClick() {
    instances.push(new X());
  }
  return (
    <>
      <Counter />
      <button onClick={handleClick}>a+</button>
    </>
  );
}

export default App;
