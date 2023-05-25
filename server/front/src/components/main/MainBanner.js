import classes from "./MainBanner.module.scss";

import mainpicture from "../../assets/image/MainPicture.png";

const MainBanner = () => {
  return (
    <div className={classes.intro}>
      <div className={classes.inner}>
        <div className={classes.introContent}>
          <div className={classes.desc}>
            <h1>LIVE</h1>
            <p>
              당신이 원하는 집을 앉아서
              <br />
              쉽고 간편하게
            </p>
          </div>
          <div className={classes.photo}>
            <img src={mainpicture} alt="main-banner"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
