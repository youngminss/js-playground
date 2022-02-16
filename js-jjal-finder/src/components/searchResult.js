function SearchResult({ $target, initState }) {
  this.$target = $target;
  this.$searchResult = document.createElement("div");
  this.$searchResult.id = "search-result";
  this.$target.appendChild(this.$searchResult);

  this.state = initState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const { zzalData, currentKeyword } = this.state;
    const elText = `
      <span class="search-keyword">
        현재 검색 키워드 : <em class="search-keyword emphasize">${currentKeyword}</em>
      </span>
      
      ${
        currentKeyword !== "" && zzalData.length === 0
          ? `<span class="flex-column-container">"${currentKeyword}" 의 검색결과가 없습니다.</span>`
          : `
              <ul class="search-result-container">
                ${zzalData
                  .map((result) => {
                    const { imageUrl, tags, title, _id } = result;
                    return `
                  <li id=${_id} class="search-result-item">
                    <img class="zzal-img" src=${imageUrl} alt=${title} width="100%"/>
                    <span>${tags}</span>
                  </li>
                  `;
                  })
                  .join("")}
              </ul>
            `
      }
      `;

    this.$searchResult.innerHTML = elText;
  };

  this.render();
}

export default SearchResult;
