import App from "./components/app.js";

new App({
  $target: document.querySelector("#app"),
  initState: {
    currentKeyword: "",
    zzalData: [],
    keywords: [],
  },
});
