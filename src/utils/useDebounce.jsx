import { useState } from "react";

function useDebounce(callback, delay) {
  const [timer, setTimer] = useState(null);

  return function (...args) {
    clearTimeout(timer);
    const context = this;
    setTimer(setTimeout(() => callback.apply(context, args), delay));
  };
}

export default useDebounce;
