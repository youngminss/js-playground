import SearchHistory from "./searchHistory.js";
import SearchInput from "./searchInput.js";
import SearchResult from "./searchResult.js";
import { getZzalData } from "../utils/api.js";
import { validateFor } from "../utils/validation.js";

function App({ $target, initState }) {
  this.$target = $target;
  this.state = initState;

  this.$searchHistory = new SearchHistory({
    $target: $target,
    initState: this.state.keywords,
    onClick: async (newKeyword) => {
      try {
        const zzalData = await getZzalData(newKeyword);
        this.setState({
          ...this.state,
          zzalData: zzalData,
          currentKeyword: newKeyword,
        });
        this.$searchInput.setState(this.state.currentKeyword);
      } catch (error) {
        console.error(`에러 발생 : ${error.message}`);
      }
    },
  });

  this.$searchInput = new SearchInput({
    $target: this.$target,
    initState: this.state.currentKeyword,
    onInput: async (keyword) => {
      if (!keyword) {
        this.setState({ ...this.state, currentKeyword: "", zzalData: [] });
        return;
      }

      const newKeyword = keyword;
      const newKeywords = Array.from(new Set([...this.state.keywords, newKeyword.trim()]));
      try {
        const zzalData = await getZzalData(newKeyword);
        this.setState({
          ...this.state,
          zzalData: zzalData,
          currentKeyword: newKeyword,
          keywords: zzalData.length !== 0 ? newKeywords : this.state.keywords,
        });
      } catch (error) {
        console.error(`에러 발생 : ${error.message}`);
      }
    },
  });

  this.$searchResult = new SearchResult({
    $target: this.$target,
    initState: this.state,
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
    const { currentKeyword, zzalData, keywords } = this.state;
    this.$searchHistory.setState(keywords);
    this.$searchResult.setState({ currentKeyword, zzalData });
  };
}

export default App;
