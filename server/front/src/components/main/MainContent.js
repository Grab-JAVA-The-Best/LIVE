import classes from "./MainContent.module.scss";

import MainContentLeftBox from "./MainContentLeftBox";
import MainContentRightBox from "./MainContentRightBox";

const MainContent = () => {
  return (
    <div className={classes.inner}>
      <div className={classes.aboutContent}>
        <MainContentLeftBox />
        <MainContentRightBox />
      </div>
    </div>
  );
};

export default MainContent;
