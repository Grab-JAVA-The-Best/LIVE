import { useEffect } from "react";
import { unstable_useBlocker as useBlocker } from "react-router-dom";

export const usePrompt = ({ when, message }) => {
  let blocker = useBlocker(when);

  useEffect(() => {
    if (blocker.state === "blocked" && !when) {
      blocker.reset();
    }
  }, [blocker, when]);

  useEffect(() => {
    if (blocker.state === "blocked") {
      let proceed = window.confirm(message);

      if (proceed) {
        setTimeout(blocker.proceed, 0);
      } else {
        blocker.reset();
      }
    }
  }, [blocker, message]);
};
