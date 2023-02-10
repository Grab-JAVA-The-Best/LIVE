import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RealtorLoginForm from "../components/login/RealtorLoginForm";
import UserLoginForm from "../components/login/UserLoginForm";
import {userLogin, logout, realtorLogin} from "../apis/MemberService";
import classes from "./LoginPage.module.scss";
import { useAuth } from "../components/common/AuthProtector";

const LoginPage = () => {
  const [loginMode, setLoginMode] = useState("USER"); // 로그인 모드 상태 확인 ( USER , REALTOR )
  const user = useAuth();
  const navigation = useNavigate();

  console.log(user);

  const loginModeHandler = (event) => {
    // 로그인 모드 변경 함수
    setLoginMode(event.target.value);
  };

  const userLoginHandler = async (userLoginInfo) => {
    // 일반 회원 로그인 처리
    // 일반회원 로그인 정보 아이디, 비밀번호 형태로 넘어옵니다.

    const result = userLogin(userLoginInfo);
    console.log(result);

    user.doLogin(result.data);
  };

  const realtorLoginHandler = async (realtorLoginInfo) => {
    // 중개사 회원 로그인 처리

    realtorLogin(realtorLoginInfo).then((result) => console.log(result));
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
                defaultChecked //defaultChecked 말고 그냥 checked 하면 체이닝 어쩌구하면서 에러 폭발함
              />
              <label htmlFor="userTab">일반 회원</label>
              <input
                type="radio"
                name="loginTab"
                id="realtorTab"
                onChange={loginModeHandler}
                value="REALTOR"
              />
              <label htmlFor="realtorTab">공인중개사</label>
            </div>
            {loginMode === "USER" && (
              <UserLoginForm onUserLogin={userLoginHandler} />
            )}
            {loginMode === "REALTOR" && (
              <RealtorLoginForm onRealtorLogin={realtorLoginHandler} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
