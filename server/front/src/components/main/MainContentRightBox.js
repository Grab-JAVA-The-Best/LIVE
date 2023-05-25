import Carousel from "../../UI/Carousel";
import classes from "./MainContentRightBox.module.scss";

const MainContentRightBox = () => {
  return (
    <div className={classes.carouselContainer}>
      <div>
        <p>새로 나온 매물</p>
        <div>
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default MainContentRightBox;
