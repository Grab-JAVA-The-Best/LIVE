import MainContentInputBox from "./MainContentInputBox";
import MainContentResult from "./MainContentResult";

import classes from "./MainContentLeftBox.module.scss";
import { useEffect, useState } from "react";

const MainContentLeftBox = () => {
  const [dong] = useState("덕명동");
  const [data] = useState([]);

  const calc = useEffect(() => {}, [dong]);

  return (
    <div className={classes.questionBox}>
      <p>
        <strong>{dong}</strong>이 궁금하신가요?
      </p>
      <br />
      <div className={classes.searchBox}>
        <strong style={{ textAlign: "left", fontSize: "1.1rem" }}>
          매물 평균가
        </strong>
        <MainContentInputBox />
        <MainContentResult />
      </div>
    </div>
  );
};

export default MainContentLeftBox;
