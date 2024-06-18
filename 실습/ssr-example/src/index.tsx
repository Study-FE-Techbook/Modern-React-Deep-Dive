import React from 'react'
import { hydrate } from 'react-dom'

import App from './components/App'
import { fetchTodo } from './fetch' // 2. fetchTodo로 필요한 데이터 주입하기

async function main() {
  const result = await fetchTodo()

  const app = <App todos={result} />
  const el = document.getElementById('root')

  // 1. HTML을 hydrate를 통해 완성된 웹 애플리케이션으로 만들기
  // hydrate는 서버에서 완성한 HTML과 하이드레이션 되는 대상이 되는 HTML결과물이 동일한지 비교하는 작업을 거친다. -> 한 번 더 데이터 조회
  hydrate(app, el)
}

main()
