function TodoList({ $target, initState, completed, onChange, onDelete }) {
  this.$container = document.createElement("div");
  this.$container.className = "todo-list-wrapper flex-column-center";

  this.$containerText = document.createElement("span");
  this.$containerText.className = "todo-list-status";
  this.$containerText.textContent = completed ? "Completed" : "In Progress";

  this.$todoList = document.createElement("ul");
  this.$todoList.className = completed ? `todo-list completed` : "todo-list";

  this.$container.appendChild(this.$containerText);
  this.$container.appendChild(this.$todoList);

  $target.appendChild(this.$container);

  this.state = initState;
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const renderState = this.state.filter((todo) => todo.isCompleted === completed);
    this.$todoList.innerHTML = renderState
      .map((todo) => {
        return `
      <li class=${todo.isCompleted ? "todo-item-completed" : "todo-item"} data-index=${todo._id} draggable="true">
        <span class="todo-text">${todo.content}</span>
        <button class="todo-item-del" type="button">삭제</button>
      </li>
      `;
      })
      .join("");
  };

  this.render();

  const setTodoItemCompleted = (index) => onChange(index);

  const deleteTodoItem = (index) => onDelete(index);

  const clickHandler = (e) => {
    const $target = e.target;

    if ($target.tagName !== "LI" && $target.tagName !== "BUTTON") return;

    const $closestLI = $target.closest("li");
    const index = $closestLI.dataset.index;
    $target.tagName === "LI" ? setTodoItemCompleted(index) : deleteTodoItem(index);
  };

  const dragstartHandler = (e) => {
    e.dataTransfer.setData("index", e.target.dataset.index);
  };

  const dragoverHandler = (e) => {
    e.preventDefault();
  };

  const dropHandler = (e) => {
    if (!e.target.classList.contains("todo-list")) return;

    e.preventDefault();
    const index = e.dataTransfer.getData("index");
    const targetCompleted = this.state.find((todo) => todo._id === index)?.isCompleted;

    let onChangeFlag = false;
    if (e.target.classList.contains("completed") && !targetCompleted) {
      onChangeFlag = true;
    }
    if (!e.target.classList.contains("completed") && targetCompleted) {
      onChangeFlag = true;
    }

    onChangeFlag && setTodoItemCompleted(index);
  };

  this.$todoList.addEventListener("click", clickHandler);
  this.$todoList.addEventListener("dragstart", dragstartHandler);
  this.$todoList.addEventListener("drop", dropHandler);
  this.$todoList.addEventListener("dragover", dragoverHandler);
}

export default TodoList;
