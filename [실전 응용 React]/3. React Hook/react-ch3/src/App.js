import TestBatch from './components/useState/TestBatch';
import TestCallback from './components/useState/TestCallback';
import TestOrder from './components/useState/TestOrder';
import TestMultiState from './components/useState/TestMultiState';
import TestUE from './components/useEffect/TestUE';
import TestEventListener from './components/useEffect/TestEventListener';
import TestCallAPI from './components/useEffect/TestCallAPI';
import TestCustomCallAPI from './components/customHook/TestCustomCallAPI';
import TestCustomEventListener from './components/customHook/TestCustomEventListener';
import TestCustomMounted from './components/customHook/TestCustomMounted';
import TestUserContext from './components/TestUseContext';
import TestUseRef from './components/TestUseRef';
import TestUseReducer from './components/TestUseReducer';
import TestUseIHParent from './components/TestUseIHParent';


function App() {
  return (
    <div className="App">
      <h1>useState</h1>
      <h2>상탯값 변경 함수는 batch로 처리된다.</h2>
      <TestBatch/>
      <br/>

      <h2>상탯값 변경 함수에 함수 입력하기.</h2>
      <TestCallback/>
      <br/>

      <h2>상탯값 변경 함수의 호출 순서 보장.</h2>
      <TestOrder/>
      <br/>

      <h2>여러 상탯값 관리.</h2>
      <TestMultiState/>
      <br/>

      <hr/>
      <h1>useEffect</h1>
      <h2>useEffect 사용 예</h2>
      <TestUE/>
      <br/>

      <h2>API 호출</h2>
      <TestCallAPI userId={'SinJ27'}/>
      <br/>

      <h2>이벤트 리스너 등록, 해제</h2>
      <TestEventListener/>
      <br/>
      <hr/>

      <h1>커스텀 훅</h1>
      <h2>API 커스텀 훅</h2>
      <TestCustomCallAPI userId={'SinJ27'}/>
      <br/>

      <h2>이벤트 리스너 커스텀 훅</h2>
      <TestCustomEventListener/>
      <br/>

      <h2>마운트 커스텀 훅</h2>
      <TestCustomMounted/>
      <br/>
      <hr/>

      <h2>useContext 훅</h2>
      <TestUserContext/>
      <br/>
      <hr/>

      <h2>useRef로 렌더링과 무관한 값 저장</h2>
      <TestUseRef/>
      <br/>
      <hr/>

      <h2>useReducer</h2>
      <TestUseReducer/>
      <br/>
      <hr/>

      <h2>useImperativeHandle</h2>
      <TestUseIHParent/>
      <br/>
      <hr/>

    </div>
  );
}

export default App;
