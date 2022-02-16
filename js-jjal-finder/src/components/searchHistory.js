function SearchHistory({ $target, initState, onClick }) {
  this.$target = $target;
  this.$searchHistory = document.createElement("div");
  this.$searchHistory.id = "history-container";
  this.$target.appendChild(this.$searchHistory);

  this.state = initState;
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    this.$searchHistory.innerHTML = `
      <h1 class="app-name">Fetch API 움짤 검색기</h1>
      <ul class="search-history">
        ${this.state
          .map((keyword, idx) => {
            return `<li class="history-item"><button data-index=${idx} class="history-button">${keyword}</button></li>`;
          })
          .join("")}
      </ul>
    `;
  };
  this.render();

  const clickHandler = (e) => {
    const $target = e.target;
    if ($target.tagName !== "BUTTON") return;

    const newKeyword = $target.textContent;
    onClick(newKeyword);
  };

  this.$searchHistory.addEventListener("click", clickHandler);
}

export default SearchHistory;
