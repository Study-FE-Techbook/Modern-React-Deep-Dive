import React, { useImperativeHandle, forwardRef } from "react";

const ChildComponent = forwardRef((props, ref) => {
  const [value, setValue] = React.useState(0);

  useImperativeHandle(ref, () => ({
    increment() {
      setValue((prevValue) => prevValue + 1);
    },
    decrement() {
      setValue((prevValue) => prevValue - 1);
    },
    reset() {
      setValue(0);
    },
  }));

  return (
    <div>
      <p>Value: {value}</p>
    </div>
  );
});

// displayName 설정 <= eslint가 분노함.
ChildComponent.displayName = "ChildComponent";

export default ChildComponent;
