import React, { useEffect } from 'react'

import { TodoResponse } from '../fetch'

import { Todo } from './Todo'

export default function App({ todos }: { todos: Array<TodoResponse> }) {
  // 3. 서버에서 요청하는 todos 받기
  useEffect(() => {
    console.log('하이!') // eslint-disable-line no-console
  }, [])

  return (
    <>
      <h1>나의 할일!</h1>
      <ul>
        {todos.map((todo, index) => (
          <Todo key={index} todo={todo} />
        ))}
      </ul>
    </>
  )
}
