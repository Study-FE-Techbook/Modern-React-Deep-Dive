import { useEffect, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("A", count);
    return () => {
      console.log("B", count);
    };
  }, [count]);

  useEffect(() => {
    console.log("C", count);
  }, [count]);

  return (
    <div>
      <p style={{ color: "blue" }}>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

export default Counter;
