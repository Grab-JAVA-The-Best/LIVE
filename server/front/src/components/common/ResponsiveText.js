import React, { useState, useEffect } from "react";

const ResponsiveText = ({ text, textLength }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let displayText;
  if (screenWidth <= 372) {
    displayText =
      text.substring(
        0,
        textLength[0] + Math.floor((window.innerWidth - 240) / 60)
      ) +
      (textLength[0] + Math.floor((window.innerWidth - 240) / 60) >= text.length
        ? ""
        : "...");
  } else if (screenWidth <= 480) {
    displayText =
      text.substring(
        0,
        textLength[1] + Math.floor((window.innerWidth - 360) / 40)
      ) +
      (textLength[1] + Math.floor((window.innerWidth - 360) / 40) >= text.length
        ? ""
        : "...");
  } else if (screenWidth <= 768) {
    displayText =
      text.substring(
        0,
        textLength[2] + Math.floor((window.innerWidth - 480) / 72)
      ) +
      (textLength[2] + Math.floor((window.innerWidth - 480) / 72) >= text.length
        ? ""
        : "...");
  } else if (screenWidth <= 1024) {
    displayText =
      text.substring(
        0,
        textLength[3] + Math.floor((window.innerWidth - 768) / 72)
      ) +
      (textLength[3] + Math.floor((window.innerWidth - 768) / 72) >= text.length
        ? ""
        : "...");
  } else {
    displayText =
      text.substring(0, textLength[4]) +
      (textLength[4] >= text.length ? "" : "...");
  }

  return <p>{displayText}</p>;
};

export default ResponsiveText;
