export const validateFor = (state) => {
  const { isLoading, todos, currentUserName } = state;

  if (typeof isLoading !== "boolean") {
    throw new Error(`isLoading 프로퍼티가 boolean 이 아닙니다. : ${typeof isLoading}`);
  }

  if (typeof currentUserName !== "string") {
    throw new Error(`currentUserName 프로퍼티가 string 이 아닙니다. : ${typeof currentUserName}`);
  }

  if (!Array.isArray(todos)) {
    throw new Error(`todos 가 배열 타입이 아닙니다. : ${typeof todos}`);
  }

  if (todos.some((todo) => !todo.hasOwnProperty("_id"))) {
    const index = todos.findIndex((todo) => !todo.hasOwnProperty("_id"));
    throw new Error(`todos 에 _id 프로퍼티가 없는 todo 데이터가 있습니다 : ${index} 번째 todo, ${todos[index]}`);
  }

  if (todos.some((todo) => !todo.hasOwnProperty("isCompleted"))) {
    const index = todos.findIndex((todo) => !todo.hasOwnProperty("isCompleted"));
    throw new Error(
      `todos 에 isCompleted 프로퍼티가 없는 todo 데이터가 있습니다 : ${index} 번째 todo, ${todos[index]}`,
    );
  }

  if (todos.some((todo) => !todo.hasOwnProperty("content"))) {
    const index = todos.findIndex((todo) => !todo.hasOwnProperty("content"));
    throw new Error(`todos 에 content 프로퍼티가 없는 todo 데이터가 있습니다 : ${index} 번째 todo, ${todos[index]}`);
  }

  if (todos.some((todo) => typeof todo._id !== "string")) {
    const index = todos.findIndex((todo) => typeof todo._id !== "string");
    throw new Error(
      `todos 에 _id 프로퍼티가 string 타입이 아닌 todo 데이터가 있습니다 : ${index} 번째 todo, ${typeof todos[index]
        ._id}`,
    );
  }

  if (todos.some((todo) => typeof todo.isCompleted !== "boolean")) {
    const index = todos.findIndex((todo) => typeof todo.isCompleted !== "boolean");
    throw new Error(
      `todos 에 isCompleted 프로퍼티가 boolean 타입이 아닌 todo 데이터가 있습니다 : ${index} 번째 todo, ${typeof todos[
        index
      ].isCompleted}`,
    );
  }

  if (todos.some((todo) => typeof todo.content !== "string")) {
    const index = todos.findIndex((todo) => typeof todo.content !== "string");
    throw new Error(
      `todos 에 content 프로퍼티가 string 타입이 아닌 todo 데이터가 있습니다. : ${index} 번째 todo, ${typeof todos[
        index
      ].content}`,
    );
  }
};
