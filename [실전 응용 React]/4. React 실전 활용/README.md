# 4. React 실전 활용

`useEffect`의 기능은 간단하지만 제대로 사용하기 쉽지않다. 클래스형 컴포넌트에 익숙해져서 잘못된 방법으로 접근하는 경우가 많기 때문이다.

`useEffect`를 잘못 사용하면 오래된 데이터를 참조하거나 부수 효과 함수가 자주 실행되는 문제가 발생할 수 있다.

이번에는 `useEffect`를 제대로 사용하는 방법과 가독성과 생산성을 높이기 위한 작성방법, 렌더링 속도를 올리기 위한 성능 최적화 방법도 알아보자.

<br/>

## 1. 가독성, 생산성을 고려한 작성법

### 컴포넌트 작성 순서

```jsx
// 1. 최상단에는 속성값의 타입을 정의한다.
MyComponent.propsTypes = {
    //...
};

// 2. 
export default function MyComponent({prop1, prop2}){
    //...
}

// 3.
const COLUMNES = [
    { id: 1, name: '1', width: 200, color:'white' },
    { id: 1, name: '2', width: 100, color:'grey' }
    //...
];
const URL_PRODUCT_LIST = '/api/products';
function getTotalPrice({ price, total }){
    //...
}
```

1. 컴포넌트를 사용하기 위해서는 컴포넌트의 속성값 타입을 알아야 하므로 파일을 열었을 때 속성값 타입이 가장 먼저 보이는게 좋다. 속성값 타입 위쪽으로는 import만 오도록 하자.

2. 컴포넌트 함수의 매개변수는 명명된 매개변수로 정의하는게 좋다. 속성값을 사용할 때마다 `porps.`을 반복해서 입력하지 않아도 되므로 작성이 편해진다.

   그리고 컴포넌트 이름을 꼭 작성하자. 이름없는 컴포넌트를 만들면 개발자 도구에서 디버깅이 힘들다.

3. 컴포넌트 바깥의 변수와 함수는 파일의 가장 밑에 정의한다. 특별한 이유가 없다면 변수는 `const`로 정의하는게 좋다. 

   상수 변수의 이름은 예제처럼 대문자로 작성하는 게 가독성에 좋다.

   컴포넌트 내부에서 커다란 객체를 생성하는 코드가 있을 때, 가능하다면 컴포넌트 외부에서 상수 변수로 정의해서 사용하도록 하자. 그래야 렌더링 시 불필요한 객체 생성을 피할 수 있어서 성능상 이점이 있다.

<br/>

### 연관된 코드는 한 곳으로

훅의 종류별로 모으는 것보다는 연관된 코드끼리 모으는게 좋다.

```jsx
function Profile({ userId }){
    // 사용자 정보를 가져오는 기능
    const [user, setUser] = useState(null);
    useEffect(() => {
        getUserAPI(userId).then(data => setUser(data));
    }, [userId]);
    
    // 창의 너비를 가져오는 기능
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);
    
    //...
}
```

만약 컴포넌트가 복잡하다고 느껴진다면 각 기능을 커스텀 훅으로 분리하는 것도 좋은 방법이다. 위의 코드를 커스텀 훅으로 분리하면 다음과 같다.

```jsx
function Profile({ userId }){
    const user = useUser(userId);
    const width = useWindowWidth();
    //...
}

function useUser(userId){
    const [user, setUser] = useState(null);
    useEffect(() => {
        getUserAPI(userId).then(data => setUser(data));
    }, [userId]);
    return user;
}

function useWindowWidth(){
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => {
            window.addEventListener('resize', onResize);
        };
    }, []);
    return width;
}
```

기능을 커스텀 훅으로 분리하면 같은 기능을 다른 곳에서도 사용하기 좋다. 재사용하는 곳이 없다고 해도 컴포넌트 코드가 복잡해지면 커스텀 훅으로 분리하자.

<br/>

### 속성값 타입 정의 `prop-types`

`prop-types`는 속성값의 타입 정보를 정의할 때 사용하는 React 공식 패키지다. 속성값의 타입 정보는 가독성을 위해서 필수로 작성하는 게 좋다.

JS는 동적 타입 언어다. 때문에 배우기 쉽고 생산성이 좋지만, 소스 파일이 50개가 넘어가는 규모의 프로그램을 작성할 때는 오히려 생산성이 떨어진다. 그래서 가능하다면 정적 타입 언어를 사용하는 게 좋다.

하지만, 상황이 여의치 않아서 동적 타입 언어를 사용해야만 할 때가 있다. 이를 위해 React는 `prop-types` 패키지를 제공한다.

`prop-types`를 사용할 경우 컴포넌트 사용 시 속성값에 잘못된 타입이 입력되면 콘솔에서 에러 메시지가 출력된다. 이는 React가 렌더링하는 과정에서 잘못된 속성값 타입을 검사해 주기 때문에 가능하다. 물론 타입 검사는 개발 모드에서만 동작한다.

또 다른 장점으로는 타입 정의 자체가 훌륭한 문서가 된다는 점이다. 속성값의 정보를 파악하기 위해 코드를 일일히 안 들여다봐도 된다.

```jsx
User.propTypes = {
    male: PropTypes.bool.isRequired,
    age: PropTypes.number,
    type: PropTypes.oneOf(['gold', 'silver', 'bronze']),
    onChangeName: PropTypes.func,
    onChangeTitle: PropTypes.func.isRequired
};

function User({ type, age, male, onChangeName, onChangeTitle }){
    //...
}
```

- `.isRequired`를 쓰면 필숫값이기 때문에, 부모에서 해당 속성값을 전달하지 않으면 에러 메시지가 출력된다.
- `.oneOf()`를 쓰면 리스트안의 요소 중 하나만 입력할 수 있다.
- 함수 타입의 경우, 매개변수와 반환값에 대한 타입을 명시할 수 없다. 때문에 주석으로 작성해 주는 것이 좋다.

<br/>

#### `prop-types`로 정의할 수 있는 타입

```jsx
MyComponent.propTypes = {
    // React 요소
    menu: PropTypes.element,
    /*
    <div>hello</div> => 참
    <SomeComp/> => 참
    123 => 거짓
    */
    
    
    description: PropTypes.node,
    message: PropTypes.instanceOf(Message),
    name: PropTypes.onOf(['join', 'mike']),
    width: PropTypes.onOfType([PropTypes.number, PropTypes.string]),
    ages: PropTypes.arrayof(PropTypes.number),
    info: PropTypes.shape({
        color: PropTypes.string,
        weight: PropTypes.number
    }),
    infos: PropTypes.objectOf(PropTypes.number)
};
```



