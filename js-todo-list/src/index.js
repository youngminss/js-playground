import App from "./components/App.js";
import { getTodo } from "./utils/api.js";

new App({
  $target: document.querySelector("#app"),
  initState: {
    isLoading: false,
    currentUserName: "youngminss",
    todos: await getTodo("youngminss"),
  },
});
