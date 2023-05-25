import { useState } from "react";
import { BsFillBellFill, BsSearch } from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";
import classes from "./MyPageRealtor.module.scss";
import sample from "../../assets/image/sample.jpg";
import star from "../../assets/image/star.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../common/AuthProtector";

const MyPageRealtor = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/mypage/realtor-detail-info");
  };

  const { userInfo } = useAuth();
  const [btnActive, setBtnActive] = useState(0);

  const reviewonClickHandler = () => {
    setBtnActive(1);
    navigate("/mypage/realtor/realtor-review");
  };
  const contractOnClickHandler = () => {
    setBtnActive(2);
    navigate("/mypage/realtor/realtor-contract");
  };
  const reservationonClickHandler = () => {
    setBtnActive(3);
    navigate("/mypage/realtor/realtor-reservation");
  };

  return (
    <>
      <div className={classes.intro}>
        <div className={classes.inner}>
          <div className={classes.introContent}>
            <div className={classes.info}>
              <div className={classes.leftImg}>
                <img alt="프로필" src={userInfo.profile !== null ? userInfo.profile : sample}></img>
              </div>
              <div className={classes.rightDesc}>
                <div className={classes.mainProfileContainer}>
                  <div className={classes.mainProfileContent}>
                    안녕하세요, <strong>{userInfo.name}</strong>님
                  </div>
                  <p>중개사 회원</p>
                </div>
                <div className={classes.infoState}>
                  <button onClick={onClickHandler}>개인정보 조회</button>
                  <div className={classes.temperatureInfo}>
                    <div className={classes.temperature}>
                      <img alt="★" src={star} className={classes.star}></img>
                      <div className={classes.starNum}>{userInfo.score}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.itemBox}>
        <div className={classes.inner}>
          <div className={classes.itemBoxContent}>
            <div className={`${classes.alarm} ${btnActive === 1 ? classes.active : ""}`}>
              <button onClick={reviewonClickHandler}>
                <div className={classes.leftLogo}>
                  <BsFillBellFill />
                </div>
                <div className={classes.rightDesc}>
                  <strong>리뷰 조회</strong>
                </div>
              </button>
            </div>
            <div className={`${classes.review} ${btnActive === 2 ? classes.active : ""}`}>
              <button onClick={contractOnClickHandler}>
                <div className={classes.leftLogo}>
                  <BsSearch />
                </div>
                <div className={classes.rightDesc}>
                  <strong>계약현황</strong>
                </div>
              </button>
            </div>
            <div className={`${classes.reservation} ${btnActive === 3 ? classes.active : ""}`}>
              <button onClick={reservationonClickHandler}>
                <div className={classes.leftLogo}>
                  <TfiWrite />
                </div>
                <div className={classes.rightDesc}>
                  <strong>예약현황</strong>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default MyPageRealtor;
