// 실행했을 때의 순서: -1-, -2- ...
// 버튼 클릭 후의 순서: (1), (2) ...
import React, { Component } from 'react'

class LifeCycleExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
    // 컴포넌트가 생성될 때 호출되는 생성자 메서드 -1-
    console.log('Constructor called')
  }

  static getDerivedStateFromProps(props, state) {
    // props로부터 state를 도출할 때 호출되는 메서드 -2- (1)
    console.log('getDerivedStateFromProps called')
    return null
  }

  componentDidMount() {
    // 컴포넌트가 마운트된 직후 호출되는 메서드 -4-
    console.log('componentDidMount called')
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 컴포넌트 업데이트 여부를 결정할 때 호출되는 메서드  (2)
    console.log('shouldComponentUpdate called')
    return true
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 실제 DOM에 변화가 반영되기 직전 호출되는 메서드  (4)
    console.log('getSnapshotBeforeUpdate called')
    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 컴포넌트 업데이트 직후 호출되는 메서드 -6-  (5)
    console.log('componentDidUpdate called')
  }

  componentWillUnmount() {
    // 컴포넌트가 언마운트되기 직전 호출되는 메서드 -5-
    console.log('componentWillUnmount called')
  }

  handleClick = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }))
  }

  render() {
    // 컴포넌트가 렌더링될 때 호출되는 메서드 -3-  (3)
    console.log('Render called')
    return (
      <div>
        <h1>React Lifecycle Example</h1>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    )
  }
}

export default LifeCycleExample
