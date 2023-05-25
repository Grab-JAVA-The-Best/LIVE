import { useState, useEffect } from "react";

import classes from "./MyPageRealtorReservation.module.scss";
import ListBox from "../../UI/ListBox";
import {
  changeReservationStatus,
  getReservationList,
} from "../../apis/reservationApis";
import ReservationCardContent3 from "../ReservationCardContent3";

const data = ["신청된 상담", "확정된 상담", "종료된 상담"];

const MyPageRealtorReservation = () => {
  const [reservationRealtor, setReservationRealtor] = useState([]);
  const [tabActive, setTabActive] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const result = await getReservationList(0);
      setReservationRealtor(result.data);
    }
    fetchData();
  }, []);

  const toggleActive = async (e) => {
    let num = Number.parseInt(e.target.value);
    setTabActive(num);
    const result = await getReservationList(num);
    setReservationRealtor(result.data);
  };

  const onChangeReservationHandler = async (status, e, consultingNo) => {
    if (status === 2 && !confirm("예약을 확정하시겠습니까?")) {
      return;
    } else if (status === 5 && !confirm("예약을 취소하시겠습니까?")) {
      return;
    }
    const data = {};
    data["consultingNo"] = consultingNo;
    data["status"] = status;
    await changeReservationStatus(data);
    const result = await getReservationList(tabActive);
    setReservationRealtor(result.data);

    e.preventDefault();
  };

  return (
    <>
      <div className={classes.consultBox}>
        <div className={classes.consulting}>
          <div className={classes.consultingContent}>
            <div className={classes.inner}>
              <div>
                <h3>예약 목록</h3>
                <span>
                  {data.map((item, idx) => {
                    return (
                      <button
                        key={idx}
                        value={idx}
                        className={`${classes.btn} ${
                          idx === tabActive ? classes.active : ""
                        }`}
                        onClick={toggleActive}
                      >
                        {item}
                      </button>
                    );
                  })}
                </span>
                <div className={classes.consultingList}>
                  <div>
                    <ListBox dataArray={reservationRealtor} direction={false}>
                      <ReservationCardContent3
                        tabActive={tabActive}
                        isRealtor={true}
                        onChangeReservationHandler={onChangeReservationHandler}
                      />
                    </ListBox>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPageRealtorReservation;
