import classes from "./MyPageUserReservationDetail.module.scss";
import ListBox from "../../UI/ListBox";
import HouseCardContent2 from "../HouseCardContent2";
import { getReservationDetail } from "../../apis/reservationApis";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../common/AuthProtector";

const MyPageUserReservationDetail = (props) => {
  const navigation = useNavigate();
  const onReservationChangeHandler = () => {
    navigation("/mypage/user/user-reservation");
  };
  const getLoaderData = useLoaderData().data;
  const { userInfo } = useAuth();

  return (
    <div className={classes.reservationdetailuser}>
      <div className={classes.date}>
        <h2>예약 내역</h2>
        <p>
          <strong>일시</strong>
          <br />
          {getLoaderData.consultingDate.substring(0, 4) +
            "년 " +
            (getLoaderData.consultingDate.substring(5, 6) === "0"
              ? getLoaderData.consultingDate.substring(6, 7)
              : getLoaderData.consultingDate.substring(5, 7)) +
            "월 " +
            getLoaderData.consultingDate.substring(8, 10) +
            "일"}
        </p>
      </div>
      <div className={classes.require}>
        <p>
          <strong>요청사항</strong>
        </p>
        <div className={classes.requestbox}>
          <pre>{getLoaderData.requirement}</pre>
        </div>
      </div>
      <div className={classes.requireContainer}>
        <div className={classes.requireList}>
          <p>
            <strong>현재 요청된 매물</strong>
          </p>
          <ListBox dataArray={getLoaderData.itemList} direction={false} toStart={true}>
            <HouseCardContent2 />
          </ListBox>
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <button className={classes.previousBtn} style={{ cursor: "pointer" }} onClick={onReservationChangeHandler}>
          되돌아가기
        </button>
      </div>
    </div>
  );
};

export default MyPageUserReservationDetail;

export const loader = async ({ params }) => {
  return await getReservationDetail(params.consultingNo);
};
