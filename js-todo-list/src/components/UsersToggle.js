function UsersToggle({ $target, $userList }) {
  this.$toggleButton = document.createElement("button");
  this.$toggleButton.setAttribute("type", "button");
  this.$toggleButton.className = "users-toggle-button";
  this.$toggleButton.textContent = "👨‍👧‍👧";

  $target.appendChild(this.$toggleButton);

  const clickHander = () => {
    if (!$userList) return;

    if (!$userList.classList.contains("show")) {
      $userList.classList.add("show");
    }
  };
  this.$toggleButton.addEventListener("click", clickHander);
}

export default UsersToggle;
