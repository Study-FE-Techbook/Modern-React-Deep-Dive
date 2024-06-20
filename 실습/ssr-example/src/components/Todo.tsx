import React, { useState } from 'react'

import { TodoResponse } from '../fetch'

export function Todo({ todo }: { todo: TodoResponse }) {
  // 3. 서버에서 요청하는 todos 받기
  const { title, completed, userId, id } = todo
  const [finished, setFinished] = useState(completed)

  function handleClick() {
    setFinished((prev) => !prev)
  }

  return (
    <li>
      <span>
        {userId}-{id}) {title} {finished ? '완료' : '미완료'}
        <button onClick={handleClick}>토글</button>
      </span>
    </li>
  )
}
