import { useRef } from "react";
import ChildComponent from "./ChildComponent";

function ParentComponent() {
  const childRef = useRef();

  return (
    <div>
      <ChildComponent ref={childRef} />
      <button onClick={() => childRef.current.increment()}>Increment</button>
      <button onClick={() => childRef.current.decrement()}>Decrement</button>
      <button onClick={() => childRef.current.reset()}>Reset</button>
    </div>
  );
}

export default ParentComponent;
