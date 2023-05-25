import classes from "./ReviewCardContent.module.scss";

const ReviewCardContent = (data) => {
  console.log(data);
  return (
    <div className={classes.content}>
      <div className={classes.headerContentContainer}>
        <h3>{data.userName !== undefined ? data.userName : data.name}</h3>
        <div className={classes.starScoreContainer}>
          <div>★</div>
          <div>{data.ratingScore}</div>
        </div>
      </div>
      <p>{data.personalInfo}</p>
      <br />
      <hr style={{ backgroundColor: "#D6D6D6", height: "1px", border: "0" }} />
      <br />
      <p>
        {data.time &&
          data.time.slice(0, 4) +
            "년 " +
            (data.time[5] === "0" ? data.time.slice(6, 7) : data.time.slice(5, 7)) +
            "월 " +
            (data.time[8] === "0" ? data.time.slice(9, 10) : data.time.slice(8, 10)) +
            "일"}
      </p>
      {data.time ? <pre>{data.reviewInfo}</pre> : <p className={classes.reservationInfo}>{data.reviewInfo}</p>}
    </div>
  );
};

export default ReviewCardContent;
