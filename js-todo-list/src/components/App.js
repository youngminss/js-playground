import LoadingModal from "./LoadingModal.js";
import Title from "./Title.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import Users from "./Users.js";
import UsersToggle from "./UsersToggle.js";
import { getTodo, postTodo, deleteTodo, deleteTodoAll, changeTodoCompleted } from "../utils/api.js";
import { validateFor } from "../utils/validation.js";

function App({ $target, initState }) {
  this.$target = $target;
  this.state = initState;

  this.$loadingModal = new LoadingModal({
    initState: this.state.isLoading,
  });

  this.$title = new Title({
    $target: this.$target,
    initState: this.state.currentUserName,
  });

  this.$todoInput = new TodoInput({
    $target: this.$target,
    onSubmit: async (content) => {
      try {
        await postTodo(this.state.currentUserName, content);
        const newState = {
          isLoading: false,
          currentUserName: this.state.currentUserName,
          todos: await getTodo(this.state.currentUserName),
        };
        this.setState(newState);
      } catch (err) {
        console.error(err.message);
      }
    },
  });

  this.$todoListContainer = document.createElement("div");
  this.$todoListContainer.className = "todo-list-container flex-row-center";
  this.$target.appendChild(this.$todoListContainer);

  this.$noCompletedList = new TodoList({
    $target: this.$todoListContainer,
    initState: this.state.todos,
    completed: false,
    onChange: async (id) => {
      try {
        await changeTodoCompleted(this.state.currentUserName, id);
        const newState = {
          isLoading: false,
          currentUserName: this.state.currentUserName,
          todos: await getTodo(this.state.currentUserName),
        };
        this.setState(newState);
      } catch (err) {
        console.error(err.message);
      }
    },
    onDelete: async (id) => {
      try {
        await deleteTodo(this.state.currentUserName, id);
        const newState = {
          isLoading: false,
          currentUserName: this.state.currentUserName,
          todos: await getTodo(this.state.currentUserName),
        };
        this.setState(newState);
      } catch (err) {
        console.error(err.message);
      }
    },
  });

  this.$completedList = new TodoList({
    $target: this.$todoListContainer,
    initState: this.state.todos,
    completed: true,
    onChange: async (id) => {
      try {
        await changeTodoCompleted(this.state.currentUserName, id);
        const newState = {
          isLoading: false,
          currentUserName: this.state.currentUserName,
          todos: await getTodo(this.state.currentUserName),
        };
        this.setState(newState);
      } catch (err) {
        console.error(err.message);
      }
    },
    onDelete: async (id) => {
      try {
        await deleteTodo(this.state.currentUserName, id);
        const newState = {
          isLoading: false,
          currentUserName: this.state.currentUserName,
          todos: await getTodo(this.state.currentUserName),
        };
        this.setState(newState);
      } catch (err) {
        console.error(err.message);
      }
    },
  });

  this.$todoCount = new TodoCount({
    $target: this.$target,
    initState: this.state.todos,
  });

  this.$usersList = new Users({
    $target: this.$target,
    changeUserName: async (name) => {
      try {
        const loadingNewState = {
          isLoading: true,
          currentUserName: this.state.currentUserName,
          todos: this.state.todos,
        };

        this.setState(loadingNewState);

        const loadedNewState = {
          isLoading: false,
          currentUserName: name,
          todos: await getTodo(this.state.currentUserName, 1000),
        };

        this.setState(loadedNewState);
      } catch (err) {
        console.error(err.message);
      }
    },
  });

  this.$usersToggle = new UsersToggle({
    $target: this.$target,
    $userList: this.$usersList.$container,
  });

  this.setState = (newState) => {
    try {
      validateFor(newState);
      this.state = newState;
      this.render();
    } catch (err) {
      console.error(err.message);
    }
  };

  this.render = () => {
    const { isLoading, todos, currentUserName } = this.state;
    this.$loadingModal.setState(isLoading);
    this.$title.setState(currentUserName);
    this.$noCompletedList.setState(todos);
    this.$completedList.setState(todos);
    this.$todoCount.setState(todos);
  };

  window.addEventListener("removeAll", async () => {
    await deleteTodoAll(this.state.currentUserName);
    const newState = {
      isLoading: false,
      currentUserName: this.state.currentUserName,
      todos: await getTodo(this.state.currentUserName),
    };
    this.setState(newState);
  });
}

export default App;
