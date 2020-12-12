

# 1. React 개발환경 직접 구축

React는 UI 라이브러리이기 때문에, UI를 제외한 나머지 요소들은 개발자가 신경 써서 관리해야 한다.

React 개발환경을 직접하는 것보다는 create-react-app과 같은 도구를 사용하는 것을 추천하지만, toolchain을 이해하기위해 직접 개발환경을 구축해보고자 한다.

<br/>

## 1. Hello World 페이지 만들기

밑에 4개의 파일을 다운로드한다.

- https://unpkg.com/react@16/umd/
  - react.development.js
  - react.production.min.js
- https://www.unpkg.com/react-dom@16/umd/
  - react-dom.development.js
  - react-dom.production.min.js

`*.development.js` 는 개발 환경에서 사용되는 파일이고, `*.production.min.js`는 배포 환경에서 사용되는 파일이다.



이제 리액트 패키지만 사용해서 간단한 웹 애플리케이션을 만들어 보자. hello-world 폴더를 만들고 앞의 4개의 파일을 폴더에 넣어주자.

그리고 같은 폴더에 `simple1.html`, `simple1.js` 두 파일을 만들자.

![image-20201212155436140](C:\Users\SinJ\Desktop\MyGit\Github\MyReact\실전 React\1. React 프로젝트 시작하기\md_img\image-20201212155436140.png)

`simple1.html`에는 필요한 js 파일과 React에서 사용할 DOM 요소를 정의한다.

```html
<!-- simple1.html -->
<html>
  <body>
    <h2>좋아요 버튼을 눌러 주세요.</h2>
    <div id="react-root"></div> 	
    <script src="react.development.js"></script>
    <script src="react-dom.developmet.js"></script>
    <script src="simple1.js"></script>
  </body>
</html>
```

`simple1.js`에는 좋아요 버튼을 보여주는 React 컴포넌트를 작성해보자.

```js
// simple1.js
function LikeBtn(){
  const [liked, setLiked] = React.useState(false);
  const text = liked ? '좋아요 취소': '좋아요';
  return React.createElement(
    'button',
    { onClick: () => setLiked(!liked) },
    text
  );
}

const domContainer = document.querySelector('#react-root');
ReactDOM.render(React.createElement(LikeBtn), domContainer);
```

브라우저 주소창에 `simple1.html`의 경로를 입력하면 다음과 같은 화면이 뜬다. 버튼으로 좋아요의 상태를 바꿀 수 있다.

![image-20201212162013915](C:\Users\SinJ\Desktop\MyGit\Github\MyReact\실전 React\1. React 프로젝트 시작하기\md_img\image-20201212162013915.png)

---

<br/>

## 2. 바벨(Babel) 사용해 보기

바벨(Babel)은 JS 코드를 변환해 주는 컴파일러이다. 바벨을 사용하면, 최신 JS 문법을 지원하지 않는 환경에서도 최신 문법을 사용할 수 있다.

> ES6가 막 나왔을 때, 대부분의 브라우저가 ES5만 지원하고 있었기 때문에, ES6 문법을 사용할 수 없었다.
>
> 그때 바벨이 ES6 문법으로 작성한 코드를 ES5 문법으로 변환해 줬다.
>
> 바벨은 JS 최신 문법을 사용하는 용도 외에도 다양하게 활용될 수 있다. 예를 들어, 코드에서 주석을 제거하거나 코드를 압축하는 용도로 사용될 수 있다.

React에서는 JSX 문법을 사용하기 위해 바벨을 사용한다. **바벨이 JSX 문법으로 작성된 코드를 `createElement` 함수를 호출하는 코드로 변환**해준다.

지금까지 외부 패키지 없이 React 웹사이트를 만들었다. 이번에는 최초의 외부 패키지로 바벨을 추가해 보자.

그전에 먼저 몇 가지 컴포넌트를 추가해보자. count 값을 보여주는 화면과 버튼을 만들어보자.

```html
<!-- simple2.html -->
<html>
  <body>
    <h2>좋아요 버튼을 눌러 주세요.</h2>
    <div id="react-root"></div>
    <script src="react.development.js"></script>
    <script src="react-dom.developmet.js"></script>
    <script src="simple2.js"></script>
  </body>
</html>
```

```js
// simple2.js
function LikeBtn(){
  const [liked, setLiked] = React.useState(false);
  const text = liked ? '좋아요 취소': '좋아요';
  return React.createElement(
    'button',
    { onClick: () => setLiked(!liked) },
    text
  );
}

function Container(){
  const [count, setCount] = React.useState(0);
  return React.createElement(
    'div',
    null,
    React.createElement(LikeBtn),
    React.createElement(
      'div',
      { style: { marginTop: 20 } },
      React.createElement('span', null, '현재 카운트: '),
      React.createElement('span', null, count),
      React.createElement(
        'button', 
        { onClick: () => setCount(count + 1) },
        '증가'
      ),
      React.createElement(
        'button',
        { onClick: () => setCount(count - 1) },
        '감소'
      )
    )
  );
}

const domContainer = document.querySelector('#react-root');
ReactDOM.render(React.createElement(Container), domContainer);
```

![image-20201212163709654](C:\Users\SinJ\Desktop\MyGit\Github\MyReact\실전 React\1. React 프로젝트 시작하기\md_img\image-20201212163709654.png)

<br/>

### JSX 문법 적용

JSX 문법을 쓰면 가독성이 훨씬 좋아진다. `simple2.js`를 JSX 문법으로 사용한 버전으로 바꿔보자.

`src` 디렉토리를 만들고, 그 밑에 `simple3.js`로 새파일을 만들어 문법을 변환해보자.

> **JSX**
>
> HTML 태그와 유사하다. `createElement` 함수를 사용하는 것 보다 훨씬 가독성이 좋고 작성도 쉬워진다. 

```jsx
// simple3.js
function LikeBtn(){
  const [liked, setLiked] = React.useState(false);
  const text = liked ? '좋아요 취소': '좋아요';
  return <button onClick={() => {setLiked(!liked)}}>{text}</button>
}

function Container(){
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <LikeBtn/>
      <div style={{ marginTop: 20 }}>
        <span>현재 카운트</span>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>증가</button>
        <button onClick={() => setCount(count - 1)}>감소</button>
      </div>
    </div>
  )
}

const domContainer = document.querySelector('#react-root');
ReactDOM.render(React.createElement(Container), domContainer);
```

<br/>

### JSX 문법을 바벨로 컴파일하기

JSX 문법은 JS 표준이 아니기 때문에, `simple3.js` 를 실행하면 에러가 발생한다.

바벨을 이용해서 `createElement`로 작성된 파일로 변환해보자.

먼저 다음 패키지를 설치해야한다.

```shell
npm install @babel/core @babel/cli @babel/preset-react
```

`@babel/cli`에는 커맨드 라인에서 바벨을 실행할 수 있는 바이너리 파일이 들어있다.

`@babel/preset-react`에는 JSX로 작성된 코드를 `createElement` 함수를 이용한 코드로 변환해 주는 바벨 플러그인이 들어있다.

> **바벨 플러그인과 프리셋**
>
> 바벨은 JS 파일을 입력으로 받아서 또 다른 JS 파일을 출력으로 준다. 이렇게 JS 파일을 변환해 주는 작업은 **플러그인(plugin)** 단위로 이루어진다. 두 번의 변환이 필요하다면, 두개의 플러그인을 사용한다. 
>
> 하나의 목적을 위해 여러 플러그인이 필요할 수 있는데, 이러한 **플러그인의 집합을 프리셋(preset)**이라고 한다.
>
> `@babel/preset-react`는 React 애플리케이션을 만들 때 필요한 플러그인을 모아 놓은 프리셋이다.

설치된 패키지를 이용해서 JS 파일을 변환해 보자.

```shell
npx babel --watch src --out-dir . --presets @babel/preset-react
```

위의 명령어를 실행하면, `src` 폴더에 있는 모든 JS 파일을 프리셋을 이용해서 변환 후 현재 폴더에 같은 이름으로 JS 파일을 생성한다.

<br/>



## 3. 웹팩 사용해 보기

웹팩(Webpack)은 JS로 만든 프로그램을 **배포하기 좋은 형태로 묶어주는 도구**이다.

> 2000년대 초반 웹 페이지는 페이지가 전환될 때마다 새로운 HTML 파일을 요청해서 화면을 새로 그렸다.
>
> 당시 JS는 DOM을 조작하는 간단한 역할만 했기 때문에 코드량이 많지 않았다. JS 파일 한두개면 `script` 태그를 이용해서 서비스하는 방식으로 충분했다.
>
> Ajax가 유행 했을 때는 JS의 비중이 조금 더 커지기는 했지만, 많아봐야 페이지당 JS 파일 열 개 정도 수준이었다.
>
> 그런데 웹사이트 제작 방식이 SPA로 전환되면서 상황이 달라졌다. 한 페이지에도 JS 파일이 수십 또는 수백 개 필요하기 때문에 기존의 방식이 통하지 않았다.
>
> 계속 늘어나는 JS 파일을 관리하기 힘들어졌다. 파일 간의 의존성 때문에 선언되는 순서에도 신경을 써줘야 했다. 그리고 뒤에 선언된 JS 파일이 앞에 선언된 파일에서 생성한 전역변수를 덮어쓰는 위험도 존재한다.

웹팩은 commonJS, ES6의 모듈 시스템 모두 지원한다. 이들 모듈 시스템을 이용해서 코드를 작성하고 웹팩을 실행하면 예전 버전의 브라우저에서도 동작하는 JS 코드를 만들 수 있다.

웹팩을 실행하면 보통은 하나의 JS 파일이 만들어지는데, 원한다면 여러 개의 파일로 분할할 수도 있다.

우리가 할 일은 웹팩이 만들어 준 JS 파일을 HTML의 `script` 태그에 포함시키는 것이다.

이제 웹팩을 사용해서 리액트의 두 파일을 JS의 모듈 시스템으로 포함시켜 보자. webpack-test 폴더를 만들고 그 폴더에서 다음 명령어를 실행한다.

```
npm init -y
```

명령어를 실행하면 `pakage.json` 파일이 만들어진다. `simple1.html` 파일을 복사해서 webpack-test 폴더 밑에 `index.html` 파일을 만든 다음 밑과 같이 수정하자.

```html
<html>
  <body>
    <h2>좋아요 버튼을 눌러 주세요.</h2>
    <div id="react-root"></div>
    <script src="dist/main.js"></script>
  </body>
</html>
```

src 폴더를 만들고 `index.js`, `Button.js` 파일을 만들자.

![image-20201212173429022](C:\Users\SinJ\Desktop\MyGit\Github\MyReact\실전 React\1. React 프로젝트 시작하기\md_img\image-20201212173429022.png)

이제 필요한 외부 패키지를 설치해 보자.

```shell
npm install webpack webpack-cli react react-dom
```

이전에는 url을 직접 입력해서 각각의 파일을 받았지만, 이제는 모듈 시스템과 npm 덕분에 외부 패키지를 프로젝트에 쉽게 포함할 수 있게 되었다.

모듈 시스템을 사용하여 `index.js`와 `Buttons.js`를 작성해주자.

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button.js';

function Container(){
  return (
    <div>
      <p>버튼을 클릭해 주세요</p>
      <Button label={'좋아요'}></Button>
      <Button label={'싫어요'}></Button>
    </div>
  )
}

const domContainer = document.querySelector('#react-root');
ReactDOM.render(<Container/>, domContainer);
```

```js
// Button.js
import React from 'react'

export default function Button(props){
  return <button>{props.label}</button>
}
```

그리고 웹팩을 이용해서 두 개의 JS 파일을 하나의 파일로 합쳐보자.

```shell
npx webpack
```

위 명령어를 실행하면 dist 폴더 밑에 main.js 파일이 생성된다.

![image-20201212175645957](C:\Users\SinJ\Desktop\MyGit\Github\MyReact\실전 React\1. React 프로젝트 시작하기\md_img\image-20201212175645957.png)

이제 `index.html`을 브라우저로 확인해보자

![image-20201212175658350](C:\Users\SinJ\Desktop\MyGit\Github\MyReact\실전 React\1. React 프로젝트 시작하기\md_img\image-20201212175658350.png)

웹팩에는 이 외에도 다양한 기능이 있다. JS 파일 압축, CSS 전처리 등 유용한 기능이 많다.

---

<br/>



## 4. CRA 사용해 보기

`create-react-app` (이하 CRA) 은 React로 웹 애플리케이션을 만들기 위한 환경을 제공한다.

CRA에는 **바벨과 웹팩도 포함**되어 있다. 그 밖에도 **테스트 시스템, HMR(hot-module-replacement), ES6+ 문법, CSS 후처리** 등 거의 필수라고 할 수 있는 개발 환경도 구축해 준다.

이러한 개발환경을 직접 구축할 경우 시간이 오래 걸릴 뿐 아니라, 유지 보수도 해야한다. CRA를 이용하면 기존 기능을 개선하거나 새로운 기능을 추가했을 때 패키지 버전만 올리면 된다.

또 다른 장점으로는 표준성을 갖고있다. 새로운 패키지들이 쏟아나오는 현재 상황 속에서 여러 선택지 가운데 하나를 고르기 위해서는 각각의 장단점을 공부해야하는데, CRA를 사용하면 이 시간을 좀 더 아낄 수 있다.

다음 명령어를 입력하면 CRA를 이용한 개발 환경이 설치된다.

```shell
npx create-react-app cra-test
```

> npm 버전이 낮다면 다음과 같이 쓰자
>
> ```shell
> npm install -g create-react-app
> create-react-app cra-test
> ```

웹 브라우저에 화면을 띄울려면 `npm start`를 명령어로 입력하면 된다.

CRA를 통해 생성한 React 프로젝트는 **파일을 수정하면 브라우저의 화면이 자동으로 업데이트**되는 데, **HMR 덕분**이다. `npm start` 실행 시 CRA이 로컬 서버를 띄워 주기 때문에 가능한 일이다.

참고로 `npm start`는 개발 모드에서 동작하므로 **배포할 때 사용하면 안 된다.**

CRA를 통해 프로젝트를 생성하면 여러 파일들이 자동으로 생성되는데, `index.html`, `index.js`, `package.json`을 제외한 나머지 파일은 데모 앱을 위한 파일이기 때문에 마음대로 수정하거나 삭제해도 된다.

`index.js`로 연결된 모든 JS와 CSS 파일은 src 폴더 밑에 있어야 한다. src 폴더 밖의 파일을 import 하면 실패한다.

`index.html`에서 참조하는 파일은 public 폴더 밑에 있어야 한다. 특별한 이유가 없다면, `index.html`에 직접 연결하는 것보다는 src 폴더 밑에서 import 하는 것이 좋다. 그래야 JS와 CSS 파일의 경우 빌드 시 자동으로 압축된다.

이미지와 폰트 파일도 src 폴더에서 import 해주는 것이 좋다. 웹팩에서 해시값을 이용해서 url을 생성해 주기 때문에 파일의 내용이 변경되지 않으면 브라우저 캐싱 효과를 볼 수 있다.

`serviceWorker.js` 파일에는 PWA와 관련된 코드가 들어 있다. PWA 기능을 원한다면 `index.js` 파일에 `serviceWorker.register()` 코드를 넣으면 된다.

<br/>

### 주요 명령어

1. **개발 모드 실행, `npm start`**

   경우에 따라 API 호출을 위해서 https로 실행해야 할 수도 있다. https 환경을 구축하는게 매우 귀찮은 일인데, **CRA에는 https로 실행하는 옵션을 제공**한다.

   ```shell
   // widnow
   set HTTPS=true && npm start
   
   // mac
   set HTTPS=true npm start
   ```

   자체 서명된 인증서와 함께 https 사이트로 접속한다. 안전하지 않다는 경고가 뜨지만 가볍게 무시해주자.

2. **빌드, `npm run build`**

   배포 환경에서 사용할 파일을 만들어 준다. 사람이 읽기 힘든 형식으로 압축되어 있다.

   이렇게 생성한 정적 파일을 웹 서버를 통해서 클라이언트가 내려받을 수 있게 하면된다.

   로컬에서 웹 서버를 띄워서 확인할 수 있다.

   ```shell
   npx serve -s build
   ```

   serve 패키지는 node.js 환경에서 동작하는 웹 서버 애플리케이션이다. 정적 파일을 서비스할 때 간단하게 사용하기 좋다.

3. **테스트 코드 실행, `npm test`**

   CRA에는 제스트(jest)라는 테스트 프레임워크를 기반으로 테스트 시스템이 구축되어 있다.

   다음 조건을 만족하면 테스트 파일로 인식한다.

   - `__test__` 폴더 밑에 있는 모든 JS 파일
   - 이름이 `.test.js`로 끝나는 파일
   - 이름이 `.spec.js`로 끝나는 파일

4. **설정 파일 추출, `npm run eject`**

   CRA 내부 설정 파일이 밖으로 노출된다. 이 기능을 통해서 바벨과 웹팩의 설정을 변경할 수 있다.

   이 기능은 React 툴체인에 익숙하지 않은 사람이라면 추천하지 않는다.

<br/>

### JS 지원 범위

- 지수 연산자
- async, await
- 나머지 연산자, 전개 연산자
- 동적 임포트
- 클래스 필드
- JSX
- Typescript, Flow 타입 시스템

<br/>

### 환경 변수 사용

CRA에서는 빌드 시점에 환경 변수를 코드로 전달할 수 있다. 환경 변수는 개발, 테스트, 배포 환경별로 다른 값을 적용할 때 유용하다.

전달된 환경변수는 코드에서 `process.env.{환경 변수 이름}`으로 접근할 수 있다.

#### NODE_ENV 

CRA에서는 `NODE_ENV` 환경 변수를 기본으로 제공한다. `NODE_ENV` 환경 변수의 값은 다음과 같이 결정된다.

- `npm start` => `development`
- `npm test` => `test`
- `npm run build` => `production`

```js
console.log(process.env.NODE_ENV) // npm start로 실행됐으면, 'development'가 출력된다.
```

#### 기타 환경 변수

`NODE_ENV` 외에 다른 환경 변수는 `REACT_APP_` 접두사를 붙여야 한다. 따라서 코드에서는 `process.env.REACT_APP_` 형태로 접근할 수 있다.

환경 변수는 셸에서 입력하거나 .env 파일을 이용해 입력할 수 있다. 

```shell
// 셸에서 입력
// window
set "REACT_APP_API_URL=api.myapp.com" && npm start

// mac
REACT_APP_API_URL=api.myapp.com npm start
```

환경 변수가 많아지면 셸에서 입력하기 힘드니 파일로 관리하는 것이 좋다.

```js
// .env.development 파일
REACT_APP_DATA_API = dev-api.myapp.com
REACT_APP_LOGIN_API = dev-auth.myapp.com

// .env.test 파일
REACT_APP_DATA_API = test-api.myapp.com
REACT_APP_LOGIN_API = test-auth.myapp.com

// .env.production 파일
REACT_APP_DATA_API = api.myapp.com
REACT_APP_LOGIN_API = auth.myapp.com
```

이외에도 다양한 종류의 .env 파일을 만들 수 있다. (자세한 내용은 [CRA 공식문서](https://create-react-app.dev)를 참고)

환경 변수는 `index.html`파일에서도 사용할 수 있다.

```html
<title>%REACT_APP_ENV%</title>
```

---

<br/>



## 5. SPA 만들기

React 애플리케이션의 페이지 전환은 SPA 방식으로 개발하는 것이 정석이다.

> SPA는 초기 요청 시 서버에서 첫 페이지를 처리하고 이후의 라우팅은 클라이언트에서 처리하는 웹 애플리케이션이다.
>
> 전통적인 방식의 웹 페이지는 페이지를 전환할 때마다 렌더링 결과를 서버에서 받기 때문에 화면이 깜빡이는 단점이 있었다.
>
> SPA는 페이지 전환에 의한 렌더링을 클라이언트에서 처리하기 때문에 마치 네이티브 애플리케이션처럼 자연스럽게 동작한다.

<br/>

### 브라우저 히스토리 API

SPA가 구현이 가능하려면 두 가지 기능이 필요하다.

1. JS에서 브라우저로 전환 요청을 보낼 수 있다. 단, 브라우저는 서버로 요청을 보내지 않아야 한다.
2. 브라우저의 뒤로 가기와 같은 사용자의 페이지 전환 요청을 자바스크립트에서 처리할 수 있다. 이때도 브라우저는 서버로 요청을 보내지 않아야한다.

해당 조건을 만족하는 API는 `pushState`, `replaceState` 함수와 `pop state` 이벤트이다. 브라우저에는 히스토리에 state를 저장하는 스택이 존재한다.

```jsx
// BrowswerHistory.js
import React, { useEffect } from 'react';

export default function App(){
  useEffect(() => {
    window.onpopstate = (e) => {
      console.log(`location: ${document.location}, state: ${e.state}`);
    }
  }, []);

  return (
    <div>
      <button onClick={() => window.history.pushState('v1', '', '/page1')}>page1</button>
      <button onClick={() => window.history.pushState('v2', '', '/page2')}>page2</button>
    </div>
  );
}
```

위의 코드를 실행하면, 버튼 클릭에 따라 히스토리 스택이 쌓이면서 뒤로가기와 앞으로가기를 통해 주소가 /page1, /page2로 변환하는 것을 알 수 있다.

`replaceState`는 `pushState`와 비슷하지만, 스택에 state를 쌓지 않고 가장 최신의 state를 대체한다.

<br/>

### react-router-dom 

브라우저 히스토리 API를 이용해서 페이지 라우팅 처리를 직접 구현할 수도 있지만 신경 써야할 부분이 많다.

이럴 때 도움되는 것이 react-router-dom이다. React로 SPA 만들 때 많이 사용된다. react-router-dom 패키지도 내부적으로 브라우저 히스토리 API를 사용한다.

react-router-dom 패키지를 설치해보자

```shell
npm install react-router-dom
```

react-router는 React Native도 지원한다.

react-router-dom을 사용해서 SPA를 만들어보자

```jsx
// RRD.js
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Rooms from './Rooms.js';

export default function RRD(){
  return (
    <BrowserRouter> 
      <div style={{ padding: 20, border: '5px solid gray' }}>
        <Link to="/">홈</Link>
        <br/>
        <Link to="/photo">사진</Link>
        <br/>
        <Link to="/rooms">방 소개</Link>
        <Route exact path="/" component={Home}/>
        <Route path="/photo" component={Photo}/>
        <Route path="/rooms" component={Rooms}/>
      </div>
    </BrowserRouter>
  )
}

function Home({ match }){
  return <h2>HOME</h2>
}

function Photo({ match }){
  return <h2>Photo</h2>
}react-router-dom을 사용할려면 전체를 `BrowserRouter` 컴포넌트로 감싸야한다.
```

버튼을 통해서 페이지를 전환할 때는 `<Link>` 컴포넌트를 통해서 사용한다. `to` 속성값은 이동할 주소를 나타낸다.

`<Route>` 컴포넌트를 이용해서 각 페이지를 정의한다. 현재 주소가 `path` 속성값으로 시작하면 `component` 속성값이 가리키는 컴포넌트를 렌더링 한다.

`exact` 속성값이 입력하면 그 값이 완전히 일치해야 해당 컴포넌트가 렌더링된다.

> 재미있는 점은 같은 `path` 속성값을 가지는 Route 컴포넌트를 여러 번 작성해도 된다는 점이다. 현재 주소가 가르키는 컴포넌트들이 모두 렌더링 된다.
>
> ```jsx
> //...
> <Route path="/photo" component={PhotoTop}/>
> //... 
> <Route path="/photo" component={PhotoTop}/>
> ```

`<Rooms>` 컴포넌트는 다른 파일에 작성해보자

```jsx
// Rooms.js
import React from 'react';
import { Route, Link } from 'react-router-dom';

export default function Rooms({ match }){
  return(
    <div>
      <h2>ROOMS</h2>
      <Link to={`${match.url}/blueRoom`}>파란 방</Link>
      <br/>
      <Link to={`${match.url}/greenRoom`}>초록 방</Link>
      <br/>
      <Route path={`${match.url}/:roomId`} component={Room}/>
      <Route 
        exact 
        path={match.url} 
        render={() => <h3>방을 선택해주세요</h3>}
      />
    </div>
  )
}

function Room({ match }){
  return <h2>{`${match.params.roomId} 방을 선택하셨습니다.`}</h2>;
}
```

`<Route>`를 통해서 렌더링되는 컴포넌트는 `match` 속성값을 사용할 수 있다.

`match.url`은 `<Route>` 컴포넌트의 `path` 속성값과 같다.

`<Route>` 컴포넌트의 `path` 속성값에서 콜론을 사용하면 파라미터를 나타낼 수 있다.

추출된 파라미터는 `match.params.{파라미터 명}` 형식으로 사용될 수 있다.

![image-20201212224216943](C:\Users\SinJ\Desktop\MyGit\Github\MyReact\실전 React\1. React 프로젝트 시작하기\md_img\image-20201212224216943.png)