<p align="middle" >
  <img src="https://cdn-icons-png.flaticon.com/512/2666/2666505.png" width="300">
</p>
<h2 align="middle">투두 리스트</h2>
<p align="middle">Vanilla Javascript 데스크탑 투두 리스트 애플리케이션</p>
<p align="middle"><a href="https://js-playground-todolist.netlify.app/">Go To Demo 🚀</a></p>

<br />

## 🎯 목표

> state 기반 component 단위로 UI를 구성해보자.

✔️ `Event Delegation` 을 적용해서 Event 를 효율적으로 관리해보자.

✔️ `Custom Event` 에 대해 알아보고 적용해보자.

✔️ `Drag & Drop API` 를 적용해서 투두 리스트간의 간단한 이동이 가능한 미니 트렐로를 구현해보자.

✔️ 사전에 제공된 API 에 대해 `CRUD` 가 가능한 형태의 투두 리스트로 구현해보자.

✔️ fetch API 기반의 Promise 에서 `async - await` 를 사용하여 `비동기처리 직관적으로 개선`해보자.

<br />

## 📝 참고

### API BaseUrl

```
https://todo-api.roto.codes
```

### API

#### 할 일 목록 불러오기

| method | uri        |
| ------ | ---------- |
| GET    | /:username |

```javascript
[
	{
        content: "task1",
        isCompleted: false,
        _id: "620e14ef07320105294d9818"
    },
    {
        content: "task2",
        isCompleted: true,
        _id: "620e14ef07320105294d9819"
    },
    ...
]
```

#### 할 일 목록 추가하기

| method | uri        |
| ------ | ---------- |
| POST   | /:username |

```javascript
{
  content: "task1";
  isCompleted: false;
  _id: "620e166007320105294d981f";
}
```

#### 할 일 목록 삭제하기

| method | uri                 |
| ------ | ------------------- |
| DELETE | /:username/:todo_id |

```javascript
{
  message: "todoId {todo item`s id} removed.";
}
```

#### 특정 사용자의 할 일 목록 전체 삭제하기

| method | uri            |
| ------ | -------------- |
| DELETE | /:username/all |

```javascript
{
  message: "user {username} all todos removed.";
}
```

#### 할 일 완료여부 토글하기

| method | uri                        |
| ------ | -------------------------- |
| PUT    | /:username/:todo_id/toggle |

```javascript
{
  message: "todoId {todo item`s id} updated";
}
```

<br />

## 🧐 어려웠던 점 & 고민한 점

`이벤트를 효율적으로 처리`한다는 것

- 구현한 Todo App 에서 TodoList 컴포넌트 내부에는 동일한 형태의 TodoItem 들이 존재하며, 각 TodoItem 에는 진행 중 또는 완료상태를 toggle 할 수있고, 해당 TodoItem 을 삭제할 수도 있다.
- TodoItem 을 toggle 해야할 경우 `TodoItem 자체`를 클릭하는 것이며, 삭제할 경우 `삭제 버튼` 을 클릭하는 것이다. 이런 TodoItem 이 여러 개 있으니, 각각의 TodoItem 에 이벤트 핸들러를 할당해줘야할까 ? 결론은 아니다.
- 안 그래도 vanilla JS 를 통해 컴포넌트의 변경사항을 innerHTML 을 통해 리렌더링하는 형태를 취하고 있으며, 이는 React 의 Virtual DOM 과는 엄현히 다른 방식이며, 훨씬 효율도 좋지 않아서 하나의 state 가 변경되어도 모든 UI를 전부 다시 그려야한다.
  그럼, 각각의 TodoItem 에 토글과 삭제에 대한 이벤트 할당한 것을 리렌더링 할 때마다 다시 할당해줘야한다. 만약 TodoItem 이 1억개이면 매번 약 1억번의 이벤트 할당을 해야한다는 것을 의미한다는 것이다.
- 이 때 `이벤트 위임(event delegatioin)` 개념이 필요하다는 것이다. 모든 TodoItem 이 하나의 부모 요소에 내포되어 있기 때문에 이 부모 요소에 필요한 이벤트와 이벤트핸들러를 할당하므로써 아무리 많은 TodoItem 이 있어도, 한번의 이벤트 할당으로 해결할 수 있는 것이다.
- 이러한 이벤트 위임은 프론트엔드 개발을 하면서 다른 상황, 특히 `Form` 데이터를 처리할 때도 굉장히 유용하게 사용된다.
  Form 에는 다양한 Input 이 존재하는데, 이 때 이벤트 위임을 적용한다면 각각의 input 요소에 이벤트를 할당하지 않아도, 이들을 내포하고 있는 form 요소만 이벤트를 할당하면 효과적으로 form 데이터를 핸들링할 수 있다는 것이다.

`중복되는 것은 모듈화, 필요한 자원도 모듈화`

- 구현된 Todo App 에서는 할 일을 조회/추가/변경/삭제 할 수 있도록 API가 존재하기 때문에, 각각에 대한 API call이 필요했다.
  초기에는 API call 이 필요한 부분마다 fetch 를 중구난방으로 사용했다.
- 이러니, url 의 미세한 차이임에도 불구하고 몇 줄이나 되는 fetch 코드는 점점 불어나고 전체적으로 코드의 양이 비교적 비대해지는 것을 확인할 수 있었다.

- 한편, 자바스크립트의 ES6부터 ESM 을 지원하면서 import / export 같이 편리한 형식으로 클라이언트 사이드에서도 모듈 시스템을 사용할 수 있게 되었다.
- 결과적으로 현재 디렉토리에서 나는 common 디렉터리에는 보통 애플리케이션에서 사용하는 상수들을 보관하는 constants 모듈을 생성했으며, 각 컴포넌트 단위로 관리하기위한 components 디렉터리, 스타일 관련 파일을 관리하는 styles 디렉터리, 유용하거나 반복적으로 사용하는 로직을 모듈형태로 관리하기 위한 utils 디렉터리 정도로 구분해서 관리하며, 필요한 곳에서 import 하는 형태를 취하고 있다.

- 그 중 api 관련해서는 utils 디렉터리에서 API call 과 관련된 로직을 모아놓았으며, fetch 하는 부분 또한, 비슷한 fetch 로직만 분리하고 각각의 다른 API call 함수들에서 파라미터만 넘겨받는 식으로 재사용성을 부여해봤다. 이렇게 모듈 형태로 존재하는 함수를 필요한 컴포넌트(다른 모듈) 에서 import 해서 사용하는 방식인 것이다.
- 이 편리하면서도 강력한 형태를 최대한 효율적으로 사용하는 방법은 더욱 다양한 개발을 통해 시야를 넓힐 필요가 있어보인다.

`Custom Event 에 대해`

- 이런 형태로 기존에 존재하지 않은 event 이름과 다른 새로운 event 를 할당할 수 있구나..정도로 인식하는 정도로 받아들이기로 했다.
- 물론, 특별한 경우에 이러한 커스텀 이벤트를 사용한다는 케이스가 있으나, 결과적으로 커스텀 이벤트를 남발하게 되면 역으로 특정 커스텀이벤트가 어떤 케이스에 발생된 이벤트이지 ? 하는 경우가 생길 수 있으며, 이는 다양한 커스텀 이벤트가 엮여 있을 수록 심할 수 있을 것 같다.
- 때문에, 존재는 확인하되 지향할 정도는 아니라고 생각한다.

`에러 처리`

- 이 고민을 한 이유는 예를 들어 api 모듈에서는 fetch API 를 사용하며 이 또한 서버에 대해 요청을 보냈지만 응답에 대한 에러가 발생할 수 있다.
  그리고 이러한 에러에 대해서는 대처가 필요할 것이다. 반면, 이렇게 모듈화한 api 모듈을 어딘가 다른 모듈에서 import 하여 호출하는 부분에서도 에러 처리를 해야 된다고 생각한 이유는 호출한 함수 내부적으로 에러 발생시 에러를 throw 한다면, 호출한 context 에서도 throw 된 에러를 catch 할 필요가 있다고 생각했기 때문이다.
- 이렇게 되니, 에러가 발생할 수 있는 여지가 있는 대부분의 곳에 try ~ catch 가 남발하는 상황이 연출됐다. 그럼에도 불구하고 이러한 형태를 유지하는 것이 옳바른 것인가 ?
- 결론은 정답은 없다는 것이다. 다만, 실질적으로 비즈니스 로직이 다뤄지는 곳에서 try - catch 를 배치시키는 것이 context 를 파악하기 쉽다는 것이다.
