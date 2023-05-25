import classes from "./RealtorCardContent.module.scss";
import { BsTelephone } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import star from "../assets/image/star.png";

const RealtorCardContent = ({
  idx,
  name,
  total,
  corp,
  imageSrc,
  review,
  starScore,
}) => {
  return (
    <div
      className={`${classes.realtorCard} ${
        idx === 0 ? classes.isActive0 : ""
      } ${idx === 1 ? classes.isActive1 : ""} ${
        idx === 2 ? classes.isActive2 : ""
      } ${idx === 3 ? classes.isActive3 : ""}`}
    >
      <div className={classes.upCard}>
        <div className={classes.leftImg}>
          <img src={imageSrc} align="left" alt="realtor-profile" />
        </div>
        <div className={classes.rightDesc}>
          <strong className={classes.realtorName}>{name} </strong>
          공인중개사
        </div>
      </div>
      <div className={classes.downCard}>
        <p>
          <img alt="★" src={star} className={classes.star}></img>
          {starScore} | 보유 매물 {total}개 | 리뷰{" "}
          {review === null ? "0" : review}건
        </p>
      </div>
    </div>
  );
};

export default RealtorCardContent;

export const RealtorContractCardContent = (props) => {
  const data = props.data;
  return (
    <div className={classes.realtorContractContent}>
      <div className={classes.leftImg}>
        <img src={data.image}></img>
      </div>
      <div className={classes.rightDesc}>
        <div className={classes.realtorOfficeInfo}>
          <div>
            <h3>{data.realtoroffice}</h3>
          </div>
          <div className={classes.realtorName}>
            <strong>{data.name}</strong> <span>공인중개사</span>
          </div>
          <div className={classes.realtorAddress}>
            <FiMapPin /> {data.realtorAddress}
          </div>
          <div className={classes.realtorPhone}>
            <BsTelephone /> {data.realtorPhone}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReservationRealtorCardContent = ({
  idx,
  realtorNo,
  imageSrc,
  corp,
  name,
  ratingScore,
  contactCnt,
  clickEventHandler,
  highlight,
  setHighlight,
}) => {
  return (
    <div
      className={`${classes.realtorReservationCard} ${
        highlight === idx ? classes.isActive : ""
      }`}
      onClick={() => {
        clickEventHandler(realtorNo);
        setHighlight(idx);
      }}
    >
      <div className={classes.leftImg}>
        <img src={imageSrc} alt="realtor-profile" />
      </div>
      <div className={classes.rightBox}>
        <div className={classes.upCard}>
          <h4>
            {corp}
            <span className={classes.starNum}>★{ratingScore}</span>
          </h4>
          <p>
            <span> {name} </span> 공인중개사
          </p>
        </div>
        <div className={classes.downCard}></div>
      </div>
    </div>
  );
};
