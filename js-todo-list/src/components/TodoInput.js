function TodoInput({ $target, onSubmit }) {
  this.$container = document.createElement("div");
  this.$container.className = "flex-row-center";

  this.$todoForm = document.createElement("form");
  this.$todoForm.className = "todo-form";

  this.$todoInput = document.createElement("input");
  this.$todoInput.className = "todo-form-input";

  this.$todoInputButton = document.createElement("button");
  this.$todoInputButton.className = "todo-form-button";
  this.$todoInputButton.setAttribute("type", "submit");
  this.$todoInputButton.textContent = "추가";

  this.$todoDeleteAllButton = document.createElement("button");
  this.$todoDeleteAllButton.className = "todo-item-del-all";
  this.$todoDeleteAllButton.setAttribute("type", "button");
  this.$todoDeleteAllButton.textContent = "전부 삭제";

  this.$todoForm.appendChild(this.$todoInput);
  this.$todoForm.appendChild(this.$todoInputButton);
  this.$todoForm.appendChild(this.$todoDeleteAllButton);

  this.$container.appendChild(this.$todoForm);
  $target.appendChild(this.$container);

  const submitHandler = (e) => {
    e.preventDefault();

    const text = this.$todoInput.value;
    onSubmit(text);

    this.$todoForm.reset();
  };

  this.$todoForm.addEventListener("submit", submitHandler);

  this.$todoDeleteAllButton.addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("removeAll"));
  });
}

export default TodoInput;
