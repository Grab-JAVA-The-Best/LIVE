import { useRef, useState } from "react";
import { registReview } from "../apis/reviewApis";

import classes from "./ReviewForm.module.scss";

const ReviewForm = (props) => {
  const [rating, setRating] = useState(0.01);
  const reviewInfo = useRef();

  const handleRating = (event, value) => {
    const boundingRect = event.target.getBoundingClientRect();
    const starWidth = boundingRect.width;
    const clickX = event.clientX - boundingRect.left;
    let score = clickX / starWidth;

    score = value - 1 + Math.max(Math.min(score, 5), 0);
    setRating(score);
  };

  const registHandler = async () => {
    const regist = {
      realtorNo: props.realtorNo,
      userNo: props.userNo,
      consultingNo: props.consultingNo,
      reviewInfo: reviewInfo.current.value,
      ratingScore: rating.toFixed(1),
    };

    const result = await registReview(regist);

    if (result.data.result === "fail") {
      alert("리뷰 등록에 실패했습니다.");
      return;
    }

    alert("리뷰를 등록했습니다.");

    props.onClose();
  };

  const getStarColor = (value, count) => {
    const filledCount = Math.floor(value);
    const filledWidth = value - filledCount;
    const starElements = [];

    for (let i = 0; i < filledCount; i++) {
      starElements.push(
        <span key={`filled-${i}`} style={{ color: "gold" }}>
          ★
        </span>
      );
    }

    if (filledWidth > 0) {
      const gradient = `linear-gradient(90deg, gold ${
        filledWidth * 100
      }%, #fff ${filledWidth * 100}%)`;
      const style = {
        backgroundImage: gradient,
        backgroundSize: "100% 100%",
        color: "transparent",
        WebkitTextFillColor: "transparent",
        WebkitBackgroundClip: "text",
      };
      starElements.push(
        <span key="partially-filled" style={style}>
          ★
        </span>
      );
    }

    for (let i = 0; i < count - filledCount - 1; i++) {
      starElements.push(
        <span key={`empty-${i}`} style={{ color: "#bbb" }}>
          ☆
        </span>
      );
    }

    return <div>{starElements}</div>;
  };

  return (
    <div className={classes.reviewForm}>
      <div className={classes.reviewInner}>
        <h3>리뷰 작성</h3>
        <hr />
        <div className={classes.ratingBox}>
          <div>
            {[1, 2, 3, 4, 5].map((value, index) => (
              <span
                style={{ zIndex: 100 }}
                key={value}
                onClick={(event) => {
                  handleRating(event, index + 1);
                }}
              >
                ☆
              </span>
            ))}
          </div>
          <div className={classes.starArea}>{getStarColor(rating, 5)}</div>
        </div>
        <div className={classes.descBox}>
          <p>만족도를 {rating.toFixed(1)} 점 주셨네요!</p>
          <p>상담에 대한 리뷰를 작성해주세요!</p>
        </div>
        <div className={classes.reviewBox}>
          <textarea
            ref={reviewInfo}
            placeholder="리뷰를 작성해주세요!"
          ></textarea>
        </div>
        <div className={classes.buttonBox}>
          <button className={classes.registBtn} onClick={registHandler}>
            리뷰 등록
          </button>
          <button
            className={classes.nopeBtn}
            onClick={() => {
              props.onClose();
            }}
          >
            나중에 쓸게요!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
