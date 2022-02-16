import { debounce } from "../utils/debounce.js";

function SearchInput({ $target, initState, onInput }) {
  this.$target = $target;
  this.$flexContainer = document.createElement("div");
  this.$flexContainer.className = "flex-column-container";

  this.$searchInput = document.createElement("input");
  this.$searchInput.id = "search-input";
  this.$searchInput.setAttribute("type", "text");
  this.$searchInput.setAttribute("placeholder", "키워드를 입력해주세요.");

  this.$flexContainer.appendChild(this.$searchInput);
  this.$target.appendChild(this.$flexContainer);

  this.state = initState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const newValue = this.state;
    this.$searchInput.value = newValue;
  };

  this.render();

  this.$target.addEventListener(
    "input",
    debounce((e) => {
      onInput(e.target.value);
    }, 500),
  );
}

export default SearchInput;
