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
    // 1. React 요소
    menu: PropTypes.element,
    /*
    <div>hello</div> => 참
    <SomeComp/> => 참
    123 => 거짓
    */
    
    // 2. 컴포넌트 함수가 반환할 수 있는 모든 것
    description: PropTypes.node,
    /*
    number, string, array, element, ...
    <SomComp/> => 참
    123 => 참
    */
    
    // 3. 클래스로 생성된 모든 객체
    message: PropTypes.instanceOf(Message),
    /*
    new Message() => 참
    new Car() => 거짓
    */
    
    // 4. 배열에 포함된 값 중에서 하나를 만족
    name: PropTypes.oneOf(['jone', 'mike']),
    /*
    'jone' => 참
    'messy' => 거짓
    */
    
    // 5. 배열에 포함된 타입 중 하나를 만족
    width: PropTypes.onOfType([PropTypes.number, PropTypes.string]),
    /*
    123 => 참
    'messy' => 참
    */
    
    // 6. 특정 타입만 포함하는 배열
    ages: PropTypes.arrayof(PropTypes.number),
    /*
    [1, 5, 7] => 참
    ['a', 'b'] => 거짓
    */
    
    // 7. 객체의 속성값 타입을 정의
    info: PropTypes.shape({
        color: PropTypes.string,
        weight: PropTypes.number
    }),
    /*
    {color: 'red', weight: 123} => 참
    {color: 'red', weight: '123kg'} => 거짓
    */
    
    // 8. 객체에서 모든 속성값의 타입이 같은 경우
    infos: PropTypes.objectOf(PropTypes.number)
    /*
    {prop1: 123, prop2: 456} => 참
    {prop1: 'red', prop2: 123} => 거짓
    */
};
```

본인만의 타입 함수를 작성할 수도 있다.

```jsx
MyComp.propTypes = {
	age: function(...) {
		return ...;
    }
};
```

<br/>

### 조건부 렌더링

조건부 렌더링의 경우 삼항 연산자나 && 연산자를 사용하는 것이 좋다.

```jsx
function Greeting({ isLogin, name, cash }){
    return (
        <div>
            {isLogin ? 
            <div>
                <p>{name}님 안녕하세요.</p>
            </div>
            : null}
        </div>
    );
}
```

```jsx
function Greeting({ isLogin, name, cash }){
    return (
        <div>
            {isLogin && 
            <div>
            	<p>{name}님 안녕하세요.</p>
            </div>}
        </div>
    );
}
```

>**&& 연산자 사용 시 주의할 점**
>
>변수가 숫자 타입일 경우 0은 거짓, 문자열인 경우 빈 문자열은 거짓이다.
>
>&& 연산자를 사용할 때 자주 실수하는 내용이다.
>
>```jsx
><div>
>	{cash && <p>{case}원 보유 중</p>}
>    {memo && <p>{200 - memo.length}자 입력 가능</p>}
></div>
>```
>
>'0원 보유 중'을 출력해야될 경우에 위의 코드는 출력되지 않는다. 의도치 않게 0만 출력될 것이다. memo의 경우도 빈 문자열이 출력될 것이다.
>
>이러한 경우에는 다음과 같이 작성해준다.
>
>```jsx
><div>
>	{cash !== null && <p>{case}원 보유 중</p>}
>    {memo !== null && <p>{200 - memo.length}자 입력 가능</p>}
></div>
>```

<br/>

### 프레젠테이션, 컨테이너 컴포넌트 구분

비즈니스 로직과 상탯값의 유무에 따라 프레젠테이션과 컨테이너 컴포넌트로 구분하는 방법을 알아보자.

프로그래밍에서 관심사의 분리란 복잡한 코드를 비슷한 기능을 하는 코드끼리 모아서 별도로 관리하는 것을 말한다. UI 처리, API 호출, DB 관리 등의 코드가 같은 곳에 있으면 복잡하기 때문에 이들은 서로 관심사가 다르다고 보고 분리해서 관리하는 게 좋다.

컴포넌트가 비즈니스 로직이나 상탯값을 가지고 있으면 재사용하기 힘들다. 재사용을 못 하고 새로운 컴포넌트를 만들면 코드 중복이 발생하며 개발자에게 있어 코드 중복은 게으름이며 기술의 부채이다.

댄 아브라모프의 블로그에서는 재사용성이 좋은 프레젠테이션 컴포넌트와 그렇지 않은 컨테이너 컴포넌트로 구분하는 방법이 설명되어 있다. 하지만, 글을 읽다 보면 머리가 더 복잡해질 수 있다. 해당 글이 설명하는 프레젠테이션 컴포넌트의 조건이 다소 복잡하기 때문이다.

책의 저자가 추천하는 **프레젠테이션 컴포넌트의 정의**는 다음과 같다.

- 비즈니스 로직이 없다.
- 상탯값이 없다. 다만 UI 효과를 위한 상탯값은 제외한다.

이처럼 컴포넌트를 프레젠테이션과 컨테이너로 구분하고, 폴더도 이에 따라 별도로 관리하는게 좋다. 일반적으로 프레젠테이션 컴포넌트 코드가 가독성이 더 좋고 재사용성도 높다.

---

<br/>

## 2. useEffect 실전 사용법