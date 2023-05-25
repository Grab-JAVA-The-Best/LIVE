import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reservedItemAction } from "../../store/reserved-item-slice";
import ListBox from "../../UI/ListBox";
import { ReservationRealtorCardContent } from "../RealtorCardContent";
import classes from "./ReservationLeftDiv.module.scss";

const ReservationLeftDiv = ({ realtors, clickEventHandler }) => {
  const [highlight, setHighlight] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reservedItemAction.clearItem());
  }, [highlight]);

  return (
    <div className={classes.leftContainer}>
      <h2>공인 중개사 목록</h2>
      <div className={classes.leftListContainer}>
        {realtors?.length ? (
          <ListBox dataArray={realtors} toStart={true}>
            <ReservationRealtorCardContent
              clickEventHandler={clickEventHandler}
              highlight={highlight}
              setHighlight={setHighlight}
            />
          </ListBox>
        ) : (
          <div className={classes.leftEmptyContainer}>
            현재 조회된 공인중개사가 없습니다
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationLeftDiv;
