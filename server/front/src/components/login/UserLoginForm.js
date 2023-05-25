/**
 * 일반 회원 로그인 폼
 */

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CustomAlert from "../../UI/Alert";
import Modal from "../../UI/Modal";
import axiosInstance from "../../util/axios";
import FindPassModalOverlay from "./FindPassModalOverlay";

import classes from "./UserLoginForm.module.scss";

const UserLoginForm = (props) => {
  const [isFindPassword, setIsFindPassword] = useState(false);
  const [viewAlert, setViewAlert] = useState(false);

  const [loginError, setLoginError] = useState(0);
  const userIdInputRef = useRef();
  const passwordInputRef = useRef();

  const loginHandler = async (event) => {
    event.preventDefault();

    const id = userIdInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (!id) {
      setLoginError(3);
      return;
    }

    if (!password) {
      setLoginError(4);
      return;
    }

    const userLoginInfo = {
      id,
      password,
    };

    const result = await props.onUserLogin(userLoginInfo);

    if (result === "사용자 정보를 찾을 수 없습니다.") {
      setLoginError(1);
    } else {
      setLoginError(2);
    }
  };

  const findPasswordHandler = async (userFindPasswordInfo) => {
    try {
      const result = await axiosInstance.post(
        "users/passcheck",
        userFindPasswordInfo
      );
    } catch (err) {
      console.error(err);
    }

    setViewAlert(true);
    findPasswordModalHandler();
  };

  const findPasswordModalHandler = () => {
    setIsFindPassword(!isFindPassword);
  };

  const showErrorMessage = (loginError) => {
    switch (loginError) {
      case 0:
        return ``;
      case 1:
        return `존재하지 않는 아이디입니다.`;
      case 2:
        return `비밀번호가 틀렸습니다.`;
      case 3:
        return `아이디가 입력되지 않았습니다`;
      case 4:
        return `비밀번호가 입력되지 않았습니다`;
      default:
        return ``;
    }
  };

  return (
    <>
      {isFindPassword && (
        <Modal onConfirm={findPasswordModalHandler}>
          <FindPassModalOverlay
            findType="일반회원"
            onFindPassword={findPasswordHandler}
            onModalStateChange={findPasswordModalHandler}
          />
        </Modal>
      )}

      <form onSubmit={loginHandler}>
        <div className={classes.loginFieldSet}>
          <div className={classes.formInner}>
            <div className={classes.inputBox}>
              <label htmlFor="userId">아이디</label>
              <input
                id="userId"
                type="text"
                placeholder="아이디 입력"
                ref={userIdInputRef}
              ></input>
            </div>
            <div className={classes.inputBox}>
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                type="password"
                placeholder="비밀번호 입력"
                ref={passwordInputRef}
              ></input>
            </div>
          </div>
          {loginError !== 0 && (
            <div style={{ color: "red", padding: "0.6rem" }}>
              {" "}
              {showErrorMessage(loginError)}{" "}
            </div>
          )}
          <div className={classes.formUtil}>
            <div className={classes.keepLogin}>
              <input type="checkbox" id="keepLogin" />
              <label>로그인 상태 유지</label>
            </div>
            <div className={classes.connList}>
              <Link to="/signup/user">회원가입</Link> |{" "}
              <Link onClick={findPasswordModalHandler}>비밀번호 찾기</Link>
            </div>
          </div>
          <div className={classes.formBtn}>
            <button type="submit">로그인</button>
          </div>
        </div>
      </form>

      {viewAlert && (
        <CustomAlert
          title={"임시 비밀번호 전송"}
          content={`고객님의 이메일주소로 임시 비밀번호를 전송하였습니다`}
          setter={setViewAlert}
        />
      )}
    </>
  );
};

export default UserLoginForm;
