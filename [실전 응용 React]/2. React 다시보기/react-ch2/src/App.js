import TestChangeCtxt from "./components/context/TestChangeCtxt";
import TestCtxt from "./components/context/TestCtxt";
import TestCtxt2 from "./components/context/TestCtxt2";
import TestMultiCtxt from "./components/context/TestMultiCtxt";
import TestForwardRef from "./components/ref/TestForwardRef";
import TestFuncRef from "./components/ref/TestFuncRef";
import TestInputRef from "./components/ref/TestInputRef";
import TestRef from "./components/ref/TestRef";

function App() {
  return (
    <div className="App">
      <h1>Context API</h1>
      <h2>기본 예제</h2>
      <TestCtxt/>
      <br/>

      <h2>Provider의 속성값이 변경되면 Consumer는 다시 렌더링된다.</h2>
      <TestCtxt2/>
      <br/>

      <h2>여러 콘텍스트 중첩</h2>
      <TestMultiCtxt/>
      <br/>

      <h2>하위 컴포넌트에서 콘텍스트 수정</h2>
      <TestChangeCtxt/>
      <br/>

      <h1>ref</h1>
      <h2>ref로 DOM 제어</h2>
      <TestRef/>
      <br/>
      
      <h2>inputRef</h2>
      <TestInputRef/>
      <br/>

      <h2>forwardRef</h2>
      <TestForwardRef/>
      <br/>

      <h2>ref에 함수 사용</h2>
      <TestFuncRef/>
      <br/>

    </div>
  );
}

export default App;