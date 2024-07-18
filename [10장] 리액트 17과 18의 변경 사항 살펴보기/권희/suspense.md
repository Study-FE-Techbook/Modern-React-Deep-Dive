## Suspense

> 자식 컴포넌트가 로드되기 전까지 화면에 대체 UI를 보여준다.

사용 예시는 다음과 같다.

## 1. React.lazy로 컴포넌트 동적으로 불러올 때

React.lazy를 사용하면 컴포넌트를 첫 렌더링 때 컴포넌트를 불러오지 않고,
최초 렌더링 이후 컴포넌트를 지연시켜 불러오는 역할을 한다.

불러오는 동안 보여줄 컴포넌트가 없을 때 Suspense의 fallback UI를 보여준다.

이를 통해 코드 스플리팅을 할 수 있고, 때문에 첫 번째 렌더링되는 시간을 줄일 수 있다.

## 2. Data Loading

데이터를 불러오는 컴포넌트에서 불러오는 동안 대체 UI를 보여주고 싶다.

**다만 Suspense-enabled data sources만 Suspense 컴포넌트를 활성화한다.**
Suspense-enabled data sources: 데이터 fetching이 렌더 단계에서 동기적으로 작용하는 컴포넌트

### 1) Next.js 예시

app 라우터의 서버 컴포넌트를 활용할 때 Suspense를 사용할 수 있다.

```tsx
import Child from "components/Child";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Child />
    </Suspense>
  );
}
```

```tsx
// server component

async function loadData() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("waiting...");
    }, 1000);
  });
}

export default async function Child() {
  await loadData();
  return <h1>Child!</h1>;
}
```

### 2) React with Demo

특정 프레임워크가 아닌 Plain React에서 Suspense로 로딩 처리하는 것은 어려움이 있고, 안전하지 못해 공식 문서에서도 추천하지 않는다.

다만 데모 앱을 통해 어떻게 Suspense가 trigger 되는지 이해해보자.

app.js는 아래와 같다.

```jsx
const Todo = ({ id }) => {
  const data = fetchWithSuspense(
    `https://jsonplaceholder.typicode.com/todos/${id}?_delay=2000`
  );
  return <p>{data.title}</p>;
};

function App() {
  return (
    <div>
      <Suspense fallback={<p>...loading</p>}>
        <Todo id={1} />
        <Todo id={2} />
        <Todo id={3} />
      </Suspense>
    </div>
  );
}

export default App;
```

`throw promise`
Suspense를 trigger 시키는 주요 아이디어는 promise를 throw하는 것이다.
상위 컨텍스트로 promsie를 throw하면 해당 컴포넌트는 데이터가 준비될 때까지 렌더링을 일시 중단한다.

따라서 fetchWithSuspense는 다음과 같이 구현한다.

```js
function fetchWithSuspense(url) {
  const promise = fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });

  throw promise;
}
```

위 코드의 문제점은 데이터를 올바르게 반환하지 않기 때문에 백만 건의 네트워크 요청을 한다는 것이다.

cache를 사용해 이를 막을 수 있다.

```js
let cacheMap = {};
function fetchWithSuspense(url) {
  if (cacheMap[url]) return cacheMap[url];

  const promise = fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      cacheMap = { ...cacheMap, [url]: data };
      return data;
    });

  throw promise;
}
```

---

추가로 리액트 팀에서 `use`라는 hook을 통해 Suspense를 이용한 로딩 처리를 지원할 것으로 보인다.

### 참고 자료

- https://dev.to/tusharshahi/using-suspense-with-react-without-a-3rd-party-library-3i2b
- https://maxkim-j.github.io/posts/suspense-argibraic-effect/
- https://yozm.wishket.com/magazine/detail/2373/
