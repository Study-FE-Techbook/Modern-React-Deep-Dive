/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'

function LifeCycleHooksExample() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // 컴포넌트가 마운트되거나 업데이트될 때 호출되는 useEffect
    console.log('Component mounted or updated')

    return () => {
      // 컴포넌트가 언마운트될 때 호출되는 cleanup 함수
      console.log('Component will unmount')
    }
  }, [])

  useEffect(() => {
    // count state가 변경될 때 호출되는 useEffect
    console.log('Count state changed')
  }, [count])

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <h1>React Lifecycle Hooks Example</h1>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  )
}

export default LifeCycleHooksExample
