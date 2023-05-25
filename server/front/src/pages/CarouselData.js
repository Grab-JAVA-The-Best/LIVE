import classes from "./CarouselData.module.scss";

const CarouselData = ({ data, image, room, name, area, deposit, rent }) => {
  return (
    <div className={classes.carouseldata}>
      <img src={image} alt="test" className={classes.upImg}></img>
      <div className={classes.downDesc}>
        <p>
          <strong>
            월세 {deposit}/{rent}
          </strong>
        </p>
        <div className={classes.downDescInfo}>
          <p>
            {room} {area}
          </p>
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
};

export default CarouselData;
