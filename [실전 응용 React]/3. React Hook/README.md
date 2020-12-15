# 3. React Hook

훅은 함수형 컴포넌트에 기능을 추가할 때 사용하는 함수이다. 훅을 이용하면 함수형 컴포넌트에서 상탯값를 사용할 수 있고, 자식 요소에 접근할 수 있다.

비교적 최근(React 16.8)에 추가된 기능이며, 기존에 React가 가지고 있던 여러 문제들을 해결해 준다.

새로 작성하는 컴포넌트는 되도록 클래스형 보다는 훅을 사용한 함수형 컴포넌트를 작성하는 것이 좋다. 훅이 주는 장점이 매우 크고, React 팀에서도 훅과 관련된 기능 개발에 많은 시간을 투자하고 있다.

<br/>

## 1. 상태값 추가하기 `useState`

`useState` 훅을 이용하면 컴포넌트에 상탯값를 추가할 수 있다.

### 배치로 처리되는 상태값 변경 함수

`useState` 훅이 반환하는 배열의 두 번째 원소는 상탯값 변경 함수이다. React는 상탯값 변경 함수가 호출되면 해당 컴포넌트를 다시 그린다. 그 과정에서 자식 컴포넌트도 같이 렌더링 된다.

React는 가능하다면 상탯값 변경을 배치(batch)로 처리한다. 

```jsx
// TestBatch.js
import React, { useState } from 'react'

export default function TestBatch(){
  const [count, setCount] = useState({ value: 0 });
  function onClick(){
    setCount({value: count.value + 1});
    setCount({value: count.value + 1});
  }

  console.log('render called');
  return (
    <div>
      <h2>{count.value}</h2>
      <button onClick={onClick}>+</button>
    </div>
  )
}
```

위의 코드에서 `setCount`를 통해 `count.value` 상탯값을 두 번 증가시키려고 했다. 하지만 의도와 달리 1만큼만 증가한다. 이는 **상탯값 변경함수가 비동기적으로 동작**하기 때문이다.

따라서 `onClick` 함수가 호출되어도 `console.log()`는 한 번만 호출된다.

React가 상탯값 변경 함수를 동기로 처리하면, 하나의 상태값 변경 함수가 호출될 때마다 화면을 다시 그리기 때문에 성능 이슈가 생길 수 있다. 만약 동기로 처리하지만 매번 화면을 다시 그리지 않는다면 UI 데이터와 화면 간의 불일치가 발생해 혼란스러울 수 있다.

<br/>

### 상태값 변경 함수에 함수 입력하기

```jsx
// TestCallback.js
import React, { useState } from 'react';

export default function TestCallback(){
  const [count, setCount] = useState(0);
  function onClick(){
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  }

  console.log('render TestCallback');
  return(
    <div>
      <h2>{count}</h2>
      <button onClick={onClick}>+</button>
    </div>
  );
}
```

상탯값 변경 함수로 입력된 **콜백함수는 자신이 호출되기 직전의 상탯값을 매개변수로 받는다.**

위의 코드에서 첫 번째 호출에서 변경된 상탯값이 두 번째 호출의 인수로 사용된다. 따라서 onClick 함수를 호출하면 count 상탯값은 2만큼 증가한다.

<br/>

### 호출 순서가 보장되는 상탯값 변경함수

상탯값 변경 함수는 **비동기로 처리되지만 그 순서가 보장**된다.

```jsx
// TestOrder.js
import React, { useState } from 'react';

export default function TestOrder(){
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  function onClick(){
    setCount1(count1 + 1);
    setCount2(count2 + 1);
  }
  const result = count1 >= count2;
  console.log('render TestOrder');
  return (
    <div>
      <h2>{`count1: ${count1}`}</h2>
      <h2>{`count2: ${count2}`}</h2>
      <h2>{`result: ${result}`}</h2>
      <button onClick={onClick}>+</button>
    </div>
  );
}
```

`count1` 상탯값이 먼저 증가하고, `count2` 상탯값은 나중에 증가한다. 상탯값 변경 함수의 호출 순서대로 상탯값이 변경되기 때문에 `result` 변수는 항상 참이다.

<br/>

### useState 훅 하나로 여러 상탯값 관리

상탯값 변경 함수는 `setState()`와는 조금 다르게 동작한다. **`setState()`는 기존 상탯값과 새로 입력된 값을 병합**하지만, `useState`의 **상탯값 변경 함수는 이전 상태값을 덮어쓴다.**

```jsx
// TestMultiState.js
import React, { useState } from 'react';

export default function TestMultiState(){
  const [state, setState] = useState({
    name: '',
    age: 0
  });

  return(
    <div>
      <p>{`name is ${state.name}`}</p>
      <p>{`age is ${state.age}`}</p>
      <input 
        type="text"
        value={state.name}
        onChange={e => setState({ ...state, name: e.target.value })}
      />
      <input 
        type="number"
        value={state.age}
        onChange={e => setState({ ...state, age: e.target.value })}
      />
    </div>
  );
}
```

이전 상탯값을 덮어쓰기 때문에 `...state`와 코드가 필요하다. 상탯값 객체의 구조가 깊어지면 이러한 방식은 작성의 불편함을 준다.

때문에 **상탯값을 하나의 객체로 관리할 때는 `useReducer` 훅을 사용하는게 좋다.**

<br/>

> **상탯값 변경이 배치로 처리되지 않는 경우**
>
> React는 **내부에서 관리하는 이벤트 처리 함수**에 대해서만 상탯값 변경을 **배치로 처리**한다.
>
> 다음과 같이 **React 외부에서 관리되는 이벤트 처리 함수**의 경우에는 상탯값 변경이 **배치로 처리되지 않는다.**
>
> ```jsx
> function MyComponent(){
>     const [count, setCount] = useState(0);
>     useEffect(() => {
>         function onClick(){
>             setCount(prev => prev + 1);
>             setCount(prev => prev + 1);
>         }
>         window.addEventListener("click", onClick);
>         return () => window.removeEventListener("click", onClick);
>     }, []);
>     console.log("render called");
>     //...
> }
> ```
>
> window 객체에 이벤트를 처리 함수를 등록하면 React 내부에서 관리되지 않는다. 따라서 위의 코드는 한 번 클릭에도 로그가 두 번 출력된다.
>
> <br/>
>
> React 외부에서 관리되는 이벤트 처리 함수에서도 원한다면 상탯값 변경을 배치로 처리할 수 있다. `unstable_batchedUpdates()`를 이용하면 상탯값 변경 함수는 모두 배치로 처리된다.
>
> ```jsx
> //...
> function onClick(){
>     ReactDOM.unstable_batchedUpdates(() => {
>     	setCount(prev => prev + 1);
> 	    setCount(prev => prev + 1);    
>     });
> }
> //...
> ```
>
> 안정화된 API가 아니므로 꼭 필요한 경우가 아니라면 사용하지 않는게 좋다.

---

<br/>

## 2. 컴포넌트에서 부수 효과 처리하기 `useEffect`

함수 실행 시 함수 외부의 상태를 변경하는 연산을 **부수 효과(side effect)**라고 한다. 특별한 이유가 없다면 모든 부수 효과는 `useEffect` 훅에서 처리하는 것이 좋다.

> **부수 효과의 구체적인 예**
>
> - API를 호출
> - 이벤트 리스너 등록, 해제

```jsx
// TestUE.js
import React, { useState, useEffect } from 'react';

export default function TestUE(){
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `업데이트 횟수: ${count}`;
  });

  return(
    <button onClick={() => setCount(count + 1)}>+</button>
  );
}
```

부수 효과 함수는 **렌더링 결과가 실제 돔에 반영된 후 호출**되고, 컴포넌트가 **사라지기 직전에 마지막으로 호출**된다. 위의 코드에서 버튼을 클릭할 때마다 다시 렌더링되고, 렌더링이 끝나면 부수 효과 함수가 호출된다.

<br/>

### 컴포넌트에서 API 호출하기

```jsx
// TestCallAPI.js
import React, { useState, useEffect } from 'react';

export default function TestCallAPI({ userId }){
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUserAPI(userId).then(data => setUser(data));
  }, 
  [userId]);

  return(
    <div>
      {!user && <p>사용자 정보를 가져오는 중..</p>}
      {user && (
        <>
          <p>{`name is ${user.name}`}</p>
          <p>{`age is ${user.age}`}</p>
        </>
      )}
    </div>
  );
}
```

부수 효과 함수에서 API 통신을 하며, 받아온 데이터는 `user` 상태값에 저장한다. 부수 효과 함수는 렌더링할 때마다 호출되기 때문에 API 통신을 불필요하게 많이 하게 된다. 이를 방지하기 위해 `useEffect` 훅의 **두 번째 매개변수로 배열을 입력**하면, **배열의 값이 변경되는 경우에만 함수가 호출**된다.

이 배열을 **의존성 배열**이라고 한다. 위의 코드에서는 `userId` 값이 변경되는 경우에만 API 통신을 하도록 설정한 것이다.

대개의 경우 의존성 배열을 입력할 필요가 없다. `useEffect` 훅을 사용할 때 **많은 버그가 의존성 배열을 잘못 입력하면서 발생**한다.

<br/>

### 이벤트 처리 함수를 등록하고 해제하기

```jsx
// TestEventListener.js
import React, { useState, useEffect } from 'react';

export default function TestEventListener(){
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);

    return () => {
      
      window.removeEventListener('resize', onResize);
    };
  }, []);

  console.log('render TestEventListener')
  return (
    <div>{`width is ${width}`}</div>
  )
}
```

위의 코드는 창 너비가 변경될 때마다 `onResize()` 이벤트 처리 함수가 호출되도록 되어있다.

부수 효과 함수는 함수를 반환할 수 있다. 반환된 함수는 부수 효과 함수가 호출되기 직전에 호출되고, 컴포넌트가 사라지기 직전에 마지막으로 호출된다. 따라서 부수 효과 함수가 반환한 함수는 프로그램이 비정상적으로 종료되지 않는다면 호출될 것이 보장된다.

**의존성 배열로 빈 배열**을 입력하면 **컴포넌트가 생성될 때만 부수 효과 함수가 호출**되고, **컴포넌트가 사라질 때만 반환된 함수가 호출**된다.

---

<br/>

## 3. 커스텀 훅

React가 제공하는 훅을 이용해서 커스텀 훅을 만들 수 있다. 훅을 직접 만들어서 사용하면 쉽게 로직을 재사용할 수 있다.

커스텀 훅의 이름은 내장 훅 처럼 use로 시작하는게 좋다. 가독성도 좋아지고, 여러 개발 도구의 도움도 쉽게 받을 수 있다.

<br/>

`TestCallAPI` 컴포넌트를 다음과 같이 커스텀 훅으로 분리할 수 있다.

```jsx
// TestCustomCallAPI.js
import React, { useState, useEffect } from 'react';

function getUserAPI(userId){
  return new Promise((resolve, reject) => {
    if(userId === 'SinJ27'){
      resolve({ name: 'SinJ', age: 27 });
    }
  });
}

function useUser(userId){ // 커스텀 훅 구현 부분
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUserAPI(userId).then(data => setUser(data));
  }, [userId]);
  return user;
}

export default function TestCustomCallAPI({ userId }){
  const user = useUser(userId); // 커스텀 훅 사용
  return(
    <div>
      {!user && <p>사용자 정보를 가져오는 중..</p>}
      {user && (
        <>
          <p>{`name is ${user.name}`}</p>
          <p>{`age is ${user.age}`}</p>
        </>
      )}
    </div>
  );
}
```

커스텀 훅은 이렇게 내부 구현을 숨기면서 사용 편의성을 높였다.

`TestEventListener` 컴포넌트도 커스텀 훅으로 바꿔보자

```jsx
// TestCustomEventListener.js
import React, { useState, useEffect } from 'react';

function useWindowWidth(){
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);
  return width; // 창의 너비를 저장해 두고 필요할 때마다 값을 제공한다.
}

export default function TestCustomEventListener(){
  const width = useWindowWidth(); // 너비가 변경되면 새로운 너비로 다시 렌더링된다
  return (
    <div>{`width is ${width}`}</div>
  )
}
```

React에서 마운트(mount)란 컴포넌트의 첫 번째 렌더링 결과가 실제 돔에 반영된 상태를 말한다. 마운트 여부를 알려 주는 `useMounted` 훅을 다음과 같이 작성할 수 있다.

```jsx
// TestCustomMounted.js
import React, { useState, useEffect } from 'react';

function useMounted(){
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export default function TestCustomMounted(){
  const mounted = useMounted();
  console.log(mounted);
  return(
    <div>{`is mounted? ${mounted}`}</div>
  )
}
```

`setMounted()`는 처음에 한 번만 호출해도 충분하므로 의존성 배열에 빈 배열을 입력한다.

---

<br/>

## 4. 훅 사용 시 지켜야 할 규칙

규칙은 다음과 같다. 밑의 두 규칙을 지켜야 각 훅의 상태를 제대로 기억할 수 있다.

1. **최상위에서만 훅을 호출해야 한다.**
2. 훅은 **함수형 컴포넌트 또는 커스텀 훅 안에서만 호출**되어야 한다.

2번 규칙에 의해 **훅은 클래스형 컴포넌트와 일반 함수에서 사용할 수 없다.**

1번 규칙을 지켜야만 컴포넌트가 렌더링 될 때마다 항상 동일한 순서로 훅이 호출된다. 이러한 점은 훅을 여러 번 호출되는 중에도 훅의 상태를 올바르게 유지한다.

밑의 코드는 1번 규칙을 위반한 경우이다. 

```jsx
// 조건에 따라 훅을 호출하면 순서가 보장되지 않는다.
function MyComponent(){
    const [value, setValue] = useState(0);
    if(value === 0){
        const [v1, setV1] = useState(0);
    }
    else{
        const [v1, setV1] = useState(0);
        const [v2, setV2] = useState(0);
    }
}

// 루프 안에서 훅을 호출하는 것도 순서가 보장되지 않는다.
for(let i = 0; i < value; i++){
    const [num, setNum] = useState(0);
}

// func1()이 언제 호출될지 알 수 없기 때문에 순서가 보장되지 않는다.
function func1(){
    const [num, setNum] = useState(0);
}
```

CRA로 프로젝트를 생성하면, 위의 두 규칙을 강제하는 ESLint 플러그인이 기본적으로 포함되기 때문에 개발과정에서 에러를 발생시킨다.

<br/>

### 훅 호출 순서가 같아야하는 이유

React는 **훅이 호출되는 순서에 의존**하기 때문에, 특정 상탯값이 어떤 `useState` 호출에 해당하는지 알 수 있다. 조건문, 반복문, 중첩된 함수안에 훅을 호출하면, 호출이 누락될 수도 있기 때문에 호출 순서가 밀리면서 버그가 발생한다.

