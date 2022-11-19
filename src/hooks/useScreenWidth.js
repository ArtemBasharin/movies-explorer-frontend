import { useEffect, useCallback, useState } from "react";

export default function useScreenWidth() {
  const getScreenWidth = useCallback(() => window.innerWidth, []);
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());

  useEffect(() => {
    function handleScreenResize() {
      setScreenWidth(getScreenWidth());
    }

    window.addEventListener("resize", resizeController, false);

    let resizeTimer;

    function resizeController() {
      if (!resizeTimer) {
        resizeTimer = setTimeout(() => {
          resizeTimer = null;
          handleScreenResize();
        }, 1000);
      }
    }

    return () => window.removeEventListener("resize", handleScreenResize);
  }, [getScreenWidth]);

  return screenWidth;
}
