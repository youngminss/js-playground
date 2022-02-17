import { getUsers } from "../utils/api.js";

function Users({ $target, changeUserName }) {
  this.$container = document.createElement("div");
  this.$container.className = "user-list-container";

  this.$title = document.createElement("span");
  this.$title.className = "user-list-title";
  this.$title.textContent = "다른 사용자 선택";

  this.$userList = document.createElement("ul");
  this.$userList.className = "user-list";

  this.$container.appendChild(this.$title);
  this.$container.appendChild(this.$userList);

  $target.appendChild(this.$container);

  this.render = async () => {
    this.state = await getUsers();
    this.$userList.innerHTML = this.state
      .map((username) => `<li data-username=${username} class="user-list item">${username}</li>`)
      .join("");
  };

  this.render();

  const onClick = (e) => {
    const $target = e.target;
    if ($target.tagName !== "LI") return;

    const name = $target.dataset.username;
    changeUserName(name);

    if (this.$container.classList.contains("show")) {
      this.$container.classList.remove("show");
    }
  };

  this.$userList.addEventListener("click", onClick);
}

export default Users;
