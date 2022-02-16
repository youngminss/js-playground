export const debounce = (callback, delay) => {
  let timer = null;

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };
};
