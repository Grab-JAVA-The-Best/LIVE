import { useNavigate } from "react-router-dom";
import ResponsiveText from "../common/ResponsiveText";
import classes from "./HouseListContent.module.scss";

const ListItem = (props) => {
  const house = props.house;

  const responsiveTextLen = [10, 15, 30, 35, 42];
  return (
    <div className={classes.houseItem}>
      <div className={classes.houseImg}>
        <img src={house.imageSrc} alt={house.address} />
      </div>
      <div className={classes.houseInfo}>
        <h3>
          월세 {house.deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          만원/ {house.rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          만원
        </h3>
        <div>
          <p>
            전용{" "}
            {house.exclusivePrivateArea
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            m² (
            {Math.round(house.exclusivePrivateArea / 3.3)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            평) ㆍ 층수
          </p>
          <ResponsiveText
            text={house.address + " " + house.addressDetail}
            textLength={responsiveTextLen}
            className={classes.desc}
          />
        </div>
        <ResponsiveText
          text={
            house.description
              ? house.description
              : "매물에 작성된 설명이 존재하지 않습니다."
          }
          textLength={responsiveTextLen}
          className={classes.desc}
        />
      </div>
    </div>
  );
};

const HouseListContent = (props) => {
  const houses = props.houses;
  const navigate = useNavigate();

  const navigateDetailHandler = (itemNo) => {
    navigate(`/house/detail/${itemNo}`);
  };
  return (
    <ul className={classes.houseList}>
      {houses.length !== 0 ? (
        houses.map((house) => (
          <div className={classes.itemContent} key={house.itemNo}>
            <li onClick={() => navigateDetailHandler(house.itemNo)}>
              <ListItem house={house} />
            </li>
          </div>
        ))
      ) : (
        <div className={classes.itemContent}>
          <li>
            <strong>등록된 매물이 존재하지 않습니다.</strong>
          </li>
        </div>
      )}
    </ul>
  );
};

export default HouseListContent;
