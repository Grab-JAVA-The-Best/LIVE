import { NavLink, useNavigate } from "react-router-dom";
import classes from "./ReservationCardContent3.module.scss";
import { changeReservationStatus } from "../apis/reservationApis";

const ReservationCardContent3 = ({
  userstate,
  username,
  consultingdate,
  consultinglocation,
  tabActive,
  consultingDate,
  consultingNo,
  itemCount,
  personalInfo,
  image,
  name,
  representativeItem,
  status,
}) => {
  const navigate = useNavigate();
  const onChangeReservationHandler = async (status, e) => {
    if(status === 5 && !confirm("예약을 거절하시겠습니까?")){ 
      return;
    }
    const data = {};
    data["consultingNo"] = consultingNo;
    data["status"] = status;
    const result = await changeReservationStatus(data);
    alert(result)
    e.preventDefault();
  };
  const onDetailHandler = () => {
    navigate(`../realtor-reservation-detail/${consultingNo}`);
  };
  const onAddItemsHandler = () => {
    navigate("/");
  };

  return (
    <div className={classes.content}>
      <div className={classes.leftContent}>
        <div className={classes.leftImg}>
          <img src={image} />
        </div>
        <div className={classes.rightDesc}>
          <div className={classes.personalInfo}>
            <p>
              {personalInfo}
              <br />
              <strong>{name}</strong>
            </p>
          </div>
          <div className={classes.consultingInfo}>
            <div className={classes.consultingDate}>
              <p>
                상담 일시
                <br />
                <strong>{consultingDate.substring(0, 10)}</strong>
              </p>
            </div>
            <div className={classes.consultingLocation}>
              <p>
                상담 매물
                <br />
                {itemCount === 0
                  ? representativeItem
                  : representativeItem + " 외 " + itemCount + "건"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.rightContent}>
        <div>
          <button className={classes.btn1} onClick={onDetailHandler}>
            예약 상세보기
          </button>
          {tabActive === 0 && (
            <button
              className={classes.btn0}
              onClick={(e) => {
                onChangeReservationHandler(5, e);
              }}
            >
              예약 거절하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationCardContent3;

