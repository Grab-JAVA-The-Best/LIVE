import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RealtorLoginForm from "../components/login/RealtorLoginForm";
import UserLoginForm from "../components/login/UserLoginForm";
import { userLogin, logout, realtorLogin, getUserInfo, getRealtorInfo } from "../apis/MemberService";
import classes from "./LoginPage.module.scss";
import { useAuth } from "../components/common/AuthProtector";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../store/user-slice";

const LoginPage = () => {
  const [loginMode, setLoginMode] = useState("USER");
  const { userInfo, doLogin, doLogout } = useAuth();
  const navigation = useNavigate();

  const dispatch = useDispatch();

  const loginModeHandler = (event) => {
    setLoginMode(event.target.value);
  };

  const userLoginHandler = async (userLoginInfo) => {
    try {
      const result = await userLogin(userLoginInfo, dispatch);
      if (result.message) {
        return result.message;
      }

      const { accessToken } = result;

      dispatch(userAction.setIsRealtor(false));

      const userInfo = await getUserInfo(accessToken);

      const tmp = {};
      tmp["profile"] = userInfo.imageSrc;
      tmp["id"] = userInfo.id;
      tmp["isRealtor"] = false;
      tmp["name"] = userInfo.name;
      tmp["score"] = userInfo.score;
      tmp["count"] = userInfo.count;

      dispatch(userAction.setInfo(tmp));

      navigation("/");
    } catch (err) {
      console.error(err);
    }
  };

  const realtorLoginHandler = async (realtorLoginInfo) => {

    const result = await realtorLogin(realtorLoginInfo, dispatch);
    if (result.message) {
      return result.message;
    }

    const { accessToken } = result;

    dispatch(userAction.setIsRealtor(true));

    const realtorInfo = await getRealtorInfo(accessToken);

    const tmp = {};
    tmp["profile"] = realtorInfo.imageSrc;
    tmp["id"] = "중개사는 이런거없음";
    tmp["isRealtor"] = true;
    tmp["name"] = realtorInfo.name;
    tmp["score"] = realtorInfo.ratingScore;

    dispatch(userAction.setInfo(tmp));

    navigation("/");
  };

  return (
    <div className={classes.login}>
      <div className={classes.section}>
        <div className={classes.loginArea}>
          <div className={classes.loginHead}>LIVE</div>
          <div className={classes.loginBox}>
            <div className={classes.loginTab}>
              <input
                type="radio"
                name="loginTab"
                id="userTab"
                onChange={loginModeHandler}
                value="USER"
                defaultChecked
              />
              <label htmlFor="userTab">일반 회원</label>
              <input type="radio" name="loginTab" id="realtorTab" onChange={loginModeHandler} value="REALTOR" />
              <label htmlFor="realtorTab">공인중개사</label>
            </div>
            {loginMode === "USER" && <UserLoginForm onUserLogin={userLoginHandler} />}
            {loginMode === "REALTOR" && <RealtorLoginForm onRealtorLogin={realtorLoginHandler} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
