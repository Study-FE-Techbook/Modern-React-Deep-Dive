import { useState, useEffect } from "react";

const createStore = (initialState) => {
  let state = initialState;
  const listeners = new Set();

  const getState = () => state;

  const setState = (newState) => {
    state = newState;
    listeners.forEach((listener) => listener(state));
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return {
    getState,
    setState,
    subscribe,
  };
};

const useStore = (store, selector = (state) => state) => {
  const [state, setState] = useState(() => selector(store.getState()));

  useEffect(() => {
    const unsubscribe = store.subscribe((newState) => {
      setState(selector(newState));
    });

    return () => {
      unsubscribe();
    };
  }, [store, selector]);

  return state;
};

// 사용 예시
const App = () => {
  // 초기 상태
  const initialState1 = { count: 0 };
  const store1 = createStore(initialState1);

  const initialState2 = { count: 0 };
  const store2 = createStore(initialState2);

  // selector 함수 정의
  const countSelector = (state) => state.count;

  // useStore 훅 사용
  const state1 = useStore(store1, countSelector);
  const state2 = useStore(store2, countSelector);

  return (
    <div>
      <p>Count 1: {state1}</p>
      <p>Count 2: {state2}</p>
      <button onClick={() => store1.setState({ count: state1 + 1 })}>Increment 1</button>
      <button onClick={() => store2.setState({ count: state2 + 1 })}>Increment 2</button>
    </div>
  );
};

export default App;
