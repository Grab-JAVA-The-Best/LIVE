import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getTodayReservationList } from "../../apis/reservationApis";
import ListBox from "../../UI/ListBox";
import { ConsultingReservationCardContent } from "../ReservationCardContent";
import classes from "./ConsultingRightReservationList.module.scss";

const ConsultingRightReservationList = () => {
  const { sessionId, statusChangeHandler } = useOutletContext();

  const [reservationRealtor, setReservationRealtor] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getTodayReservationList();
      setReservationRealtor(result.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className={classes.consultingList}>
        {reservationRealtor.length !== 0 ? (
          <ListBox toStart={true} dataArray={reservationRealtor}>
            <ConsultingReservationCardContent
              isConsulting={true}
              sessionId={sessionId}
              statusChangeHandler={statusChangeHandler}
            />
          </ListBox>
        ) : (
          <div className={classes.nullCardContainer}>
            현재 상담일정이 없습니다
          </div>
        )}
      </div>
    </>
  );
};

export default ConsultingRightReservationList;
