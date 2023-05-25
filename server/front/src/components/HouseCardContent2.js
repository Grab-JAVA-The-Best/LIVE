import classes from "./HouseCardContent2.module.scss";
import { useNavigate } from "react-router-dom";
import ResponsiveText from "./common/ResponsiveText";
import { useRef } from "react";

const HouseCardContent2 = ({
  idx,
  address,
  addressDetail,
  buildingName,
  deposit,
  description,
  imageSrc,
  maintenanceFee,
  rent,
  consultingNo,
  exclusivePrivateArea,
  itemNo,
  isRealtor,
  searchedListClickHandler,
}) => {
  const navigation = useNavigate();
  const onContractHandler = () => {
    navigation(`/contract/user-contract/${itemNo}`);
  };

  const haveEvent = useRef(searchedListClickHandler);

  return (
    <>
      <div
        className={`${classes.HouseCardContent2} ${
          haveEvent.current ? classes.isActive : ""
        }`}
        onClick={() => {
          haveEvent && searchedListClickHandler(idx);
        }}
      >
        <div className={classes.houseContent}>
          <div className={classes.leftContent}>
            <div className={classes.imgContainer}>
              <img src={imageSrc}></img>
            </div>
          </div>
          <div className={classes.rightContent}>
            <h3>
              월세 {deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              만원/ {rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 만원
            </h3>
            <p className={classes.bName}>{buildingName}</p>
            <p>
              전용{" "}
              {exclusivePrivateArea
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              ㎡ (
              {Math.round(exclusivePrivateArea / 3.3)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              평) ㆍ 관리비 {maintenanceFee} 만원
            </p>
            <p>{address + " " + addressDetail}</p>
          </div>
        </div>
      </div>
      {!isRealtor && (
        <button className={classes.consultBtn} onClick={onContractHandler}>
          계약하기
        </button>
      )}
    </>
  );
};

export default HouseCardContent2;
