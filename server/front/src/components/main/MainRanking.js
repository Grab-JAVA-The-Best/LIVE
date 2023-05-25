import classes from "./MainRanking.module.scss";
import ListBox from "../../UI/ListBox";

import RealtorCardContent from "../RealtorCardContent";
import { useEffect, useState } from "react";
import { realtorRank } from "../../apis/MemberService";

const data = ["리뷰", "별점", "매물"];

const MainRanking = () => {
  const [realtorList, setRealtorList] = useState([]);
  const [btnActive, setBtnActive] = useState(0);

  useEffect(() => {
    const response = async () => {
      let result = await realtorRank(0);
      setRealtorList(result);
    };
    response();
  }, []);

  const toggleActive = async (e) => {
    const orderBy = Number.parseInt(e.target.value);
    setBtnActive(orderBy);
    const result = await realtorRank(orderBy);
    setRealtorList(result);
  };

  return (
    <div className={classes.inner}>
      <div className={classes.rankingContent}>
        <h2>
          지금 <strong className={classes.popularity}>인기</strong>있는{" "}
          <strong className={classes.realtor}>공인중개사</strong>
        </h2>
        <div className={classes.buttonBox}>
          {data.map((item, idx) => {
            return (
              <button
                key={idx}
                value={idx}
                className={`${classes.btn} ${idx === btnActive ? classes.active : ""}`}
                onClick={toggleActive}
              >
                {item}
              </button>
            );
          })}
        </div>
        <ListBox className={classes.listbox} dataArray={realtorList} direction={true}>
          <RealtorCardContent />
        </ListBox>
      </div>
    </div>
  );
};

export default MainRanking;
