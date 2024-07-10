import { render, screen } from '@testing-library/react'

import App from './App'

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

// 1. App 렌더링
// 2. 렌더링하는 컴포넌트 내부에서 "learn react"라는 문자열을 가진 DOM 요소 찾기
// 3. expect(linkElement).toBeInTheDocument()라는 어설션을 활용해 2번에서 찾은 요소가 document 내부에 있는지 확인한다.
