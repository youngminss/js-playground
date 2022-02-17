<p align="middle" >
  <img src="https://cdn-icons-png.flaticon.com/512/6811/6811212.png" width="300">
</p>
<h2 align="middle">움짤 검색기</h2>
<p align="middle">Vanilla Javascript 데스크탑 움짤 검색기 애플리케이션</p>

<center><a href="https://js-playground-jjal-finder.netlify.app/" target="_blank">
    Go To Demo 🚀
</a></center>

<br />

## 🎯 목표

> state 기반 component 단위로 UI를 구성해보자.

✔️ 비동기 통신 중 `fetch API`를 통해 `API 서버에서 데이터를 불러오고, 불러온 데이터로 화면을 그리는 과정을 구현`해보자.

✔️ fetch API 기반의 Promise 에서 `async - await` 를 사용하여 `비동기처리 직관적으로 개선`해보자.

✔️ 이벤트 지연 방식 중 `debounce(디바운스)`를 적용하여 `불필요한 API 요청을 방지`해보자.

<br />

## 📝 참고

### API BaseUrl

```
https://jjalbot.com/api
```

### API

#### 움짤 데이터 가져오기

| method | uri                 |
| ------ | ------------------- |
| GET    | /jjals?text=keyword |

```javascript
{
    _id: "61b237156f1ec100311838d6",
    tags: [
        "피자",
        "난장판",
        "난장",
        "분노",
        "열받아",
        "빡침",
        "화남",
        "화나"
    ],
    status: "uploaded",
    shortId: "nACxWCqY7",
    type: "image/gif",
    title: "피자 난장판 난장 분노 열받아 빡침 화남 화나",
    bucketUrl: "2021/12/nACxWCqY7/nACxWCqY7.gif",
    imageUrl: "https://bunny.jjalbot.com/2021/12/nACxWCqY7/nACxWCqY7.gif",
    metadata: {
        originalUrl: "https://jjalbang.today/files/jjalbox/2020/09/20200912_5f5c45267c13a.gif",
        contentType: "image/gif",
        width: 480,
        height: 270
    },
    createdAt: "2021-12-09T17:04:21.867Z",
    updatedAt: "2022-01-10T11:05:33.581Z",
    __v: 0,
    hash: null,
    views: 6,
    visitedAt: "2022-02-07T15:59:39.521Z",
    detections: {
        adult: 0,
        spoof: 0,
        medical: 0,
        violence: 1,
        racy: 1,
        adultConfidence: 0,
        spoofConfidence: 0,
        medicalConfidence: 0,
        violenceConfidence: 0,
        racyConfidence: 0,
        nsfwConfidence: 0
    },
    videoUrl: "https://bunny.jjalbot.com/2021/12/nACxWCqY7/nACxWCqY7.mp4"
},
...
```

<br />

## 🧐 어려웠던 점 & 고민한 점

`컴포넌트 단위` 로 애플리케이션을 개발한다는 것

- 평소 React 같은 라이브러리로 SPA 형태의 애플리케이션을 구현했었다.
  리액트에선 자연스럽게 사용하던 흐름(state 의 변경 후 그에 해당하는 컴포넌트의 변화)을 순수 vanilla Javascript 만으로 구현한다는 것이 생소했다.
- 결국 본질은 같았다. `state 의 변화 -> 해당 state 를 사용하는 UI의 리렌더링`
- 현재 구현한 형태에선 App 이라는 컴포넌트에서 데이터와 직접적으로 관련된 로직을 담당하고, 각 컴포넌트를 관리하는 형태를 이루게 된다.
- 앱의 전반적인 규모 자체가 `검색기` 라는 작은 규모이기 때문에 App 이라는 하나의 컴포넌트에서 `중앙집중적` 으로 state 를 관리하고 있다.
  만약, 앱의 규모가 여러 페이지 단위로 커지게 된다면 각 큰 단위의 컴포넌트의 최상단 부분에서 state 를 관리하는 형태를 취해야 하지 않을까 생각했다.
- 당장만 해도 App 컴포넌트에서 움짤 검색기 애플리케이션이 작동하기 위해 필요한 3가지 state (현재 입력한 단어, fetch 한 움짤 데이터 정보들, 검색했던 정보들) 가 존재한다.

`비동기 통신`을 이해하고 사용한다는 점

- React 를 사용해본 사람이라면 hooks 중에 useState 같은 데이터의 변화를 발생하는 것이 `비동기` 형태를 이루는 것을 알 수 있다.
  이를 인지하지 못한 채 개발을 할 경우, 본인이 생각한 데이터의 변화에 따라 UI 가 핸들링되지 않아 당황한 적이 있었을 것이고, 나 역시 다를바 없었다.
- 이번 움짤 검색기에서 fetch API 를 사용하므로써, 기본적으로 `비동기` 형태의 데이터 흐름을 파악해야했고 `Promise` 에 대해 다시 한 번 점검할 수 있었다.
  Promise 를 이해해야만 `async - await` 같은 비동기 처리를 동기 처리 방식처럼 사용하는 데 문제가 없었다. ( fetch 의 결과 또한 Promise 라는 것도 이에 해당한다. )
- `async - await` 를 통해 내가 구현하고 있는 로직에서 비동기 처리의 결과에 따른 데이터의 변화가 반드시 필요한 곳이라면 해당 로직을 포함하고 있는 함수를 동기처리 방식으로 사용한다.
  다만, 현재 애플리케이션의 규모가 크지 않기 때문에 동기 처리의 치명적인 전체 실행 속도의 저하 현상이 심각하게 느껴지지 않았지만, 훨씬 앱의 크기가 크게 된다면, 전반적인 관점에선 UX 측면에서 확실히 좋지 못할 수 있겠다 생각이 들었다.
  따라서, `현재 내가 작성하고 있는 로직이 꼭 동기처리가 필요한 부분인가 ?` 를 잘 파악하여 필요없는 로직에는 굳이 비동기 처리를 동기 처리로 변경하지 않는 방향으로 코드를 작성하는 것이 전반적인 프로그램 입장에서 좋은 UX를 유지하는 방법이라 생각했다.

`순수하게 구현`하느냐 ? `외부 라이브러리`가 있다면 그것을 사용할텐가 ?

- `기본에 충실한다.` 라는 것에 잠시 동안 잘못된 방향으로 인식했던 것 같다.
- 현재 애플리케이션에서는 움짤 데이터를 API를 통해 받아오는 과정에서 연속적인 input 처리를 통한 불필요한 이벤트를 방지하기 위해 이벤트 지연기법 중 debounce 를 적용해봤다.
- 결국 debounce 라는 것이 내부적으론 timer 함수를 잘 활용해서 구현한다는 점과 크게 복잡하지 않기 때문에, 모듈 형태로 직접 구현했다.
  이렇게 직접 구현하는 방식이 아닌 `Lodash` 라는 라이브러리에서도 \_debounce 함수를 지원하기 때문에 이를 사용해도 되긴 한다.
- 이런 두 가지가 있다면 능력있는 개발자라면 당.연.히 ! 직접 구현해서 사용해야지 ! 라는 생각을 가지고 있었는데, 이는 올바른 사고방식이 아닐 수 있겠단 생각을 하게 되었다.
  물론, 이렇게 특정한 무언가가 필요할 때 핵심적인 개념만 이해해서 직접 구현할 수 있다는 것은 좋은 역량이라 생각할 수 있겠다.
  하지만, 결과적으로 `핵심 가치를 어디에 두어야 하는가 ?` 를 생각했을 때 이보다 더욱 집중해야할 부분은 엔지니어로서 `서비스, 비즈니스 로직` 이어야 된다는 것을 알게 되었다.
- 현재 직접 구현하려는 것보다, 발전 시켜야할 현재 중점인 서비스나 비즈니스 로직이 있다면 본인의 팀원들과 협의하에 외부 라이브러리를 사용할지, 직접 구현해서 사용할지를 결정한다는 것도 알게 되었다.
