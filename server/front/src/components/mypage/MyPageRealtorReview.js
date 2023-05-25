import { useEffect, useState } from "react";
import classes from "./MyPageRealtorReview.module.scss";
import ListBox from "../../UI/ListBox";
import ReviewCardContent from "../ReviewCardContent";
import { getReviewList } from "../../apis/reviewApis";

const MyPageRealtorReview = () => {
  const [reviewList, setReviewList] = useState();

  useEffect(() => {
    try {
      getReviewList().then((response) => {
        setReviewList(response.data.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (!reviewList) {
    return null;
  }

  return (
    <>
      <div className={classes.review}>
        <div className={classes.viewReview}>
          <div className={classes.inner}>
            <h3>리뷰조회</h3>
            <div className={classes.reviewContent}>
              <ListBox
                style={{ "justify-content": "space-between" }}
                dataArray={reviewList}
                direction={true}
              >
                <ReviewCardContent />
              </ListBox>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPageRealtorReview;
