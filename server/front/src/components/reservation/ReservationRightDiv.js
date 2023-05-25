import ReservationRealtorInfo from "./ReservationRealtorInfo";
import classes from "./ReservationRightDiv.module.scss";

const ReservationRightDiv = ({ realtorDetail }) => {
  return (
    <div className={classes.rightContainer}>
      <h2>상세정보</h2>
      <div className={classes.rightListContainer}>
        {!realtorDetail?.realtorInfo.name ? (
          <div className={classes.rightEmptyContainer}>
            현재 조회된 공인중개사가 없습니다
          </div>
        ) : (
          <ReservationRealtorInfo realtorDetail={realtorDetail} />
        )}
      </div>
    </div>
  );
};

export default ReservationRightDiv;
