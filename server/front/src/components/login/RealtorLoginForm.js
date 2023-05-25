/**
 * 중개사 회원 로그인 폼
 */

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../UI/Modal";
import FindPassModalOverlay from "./FindPassModalOverlay";

import classes from "./RealtorLoginForm.module.scss";

const RealtorLoginForm = (props) => {
  const [isFindPassword, setIsFindPassword] = useState(false); // 비밀번호 찾기 state ( True => 모달 활성화)

  const [viewAlert, setViewAlert] = useState(false);
  const [loginError, setLoginError] = useState(0);

  const businessNumberInputRef = useRef(); // 사업자등록번호 Ref
  const passwordInputRef = useRef(); // 비밀번호 Ref

  const loginHandler = async (event) => {
    // 중개사 회원 로그인 처리
    event.preventDefault();

    // if (!businessNumberInputRef.current.value || !passwordInputRef.current.value) {
    //   alert("값없음");
    //   return;
    // }

    const businessNumber = businessNumberInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (!businessNumber) {
      setLoginError(3);
      return;
    }

    if (!password) {
      setLoginError(4);
      return;
    }

    const realtorLoginInfo = {
      businessNumber,
      password,
    };

    const result = await props.onRealtorLogin(realtorLoginInfo);
    
    if (result === "공인중개사 정보를 찾을 수 없습니다.") {
      setLoginError(1);
    } else {
      setLoginError(2);
    }
  };

  const findPasswordHandler = async (realtorFindPasswordInfo) => {
    try {
      const result = await axiosInstance.post(
        "realtors/passcheck",
        realtorFindPasswordInfo
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

  const onChangeBusinessNumber = (e) => {
    //낼 물어보지 머
    // const { value } = e.target;
    // if (
    //   (value.length === 3 || value.length === 6) &&
    //   value[value.length - 1] !== "-"
    // ) {
    //   businessNumberInputRef.current.value = `${value}-`;
    // } else if (value[value.length - 1] === "-") {
    //   return;
    // } else {
    //   businessNumberInputRef.current.value = value;
    // }
  };

  const showErrorMessage = (loginError) => {
    switch (loginError) {
      case 0:
        return ``;
      case 1:
        return `존재하지 않는 사업자등록번호입니다.`;
      case 2:
        return `비밀번호가 틀렸습니다.`;
      case 3:
        return `사업자등록번호가 입력되지 않았습니다`;
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
            findType="중개사"
            onFindPassword={findPasswordHandler}
            onModalStateChange={findPasswordModalHandler}
          />
        </Modal>
      )}

      <form onSubmit={loginHandler}>
        <div className={classes.loginFieldSet}>
          <div className={classes.formInner}>
            <div className={classes.inputBox}>
              <label htmlFor="businessNumber">사업자등록번호</label>
              <input
                id="businessNumber"
                type="text"
                placeholder="사업자등록번호 입력"
                onChange={onChangeBusinessNumber}
                ref={businessNumberInputRef}
              ></input>
            </div>
            <div className={classes.inputBox}>
              <label htmlFor="password">비밀번호</label>
              <input id="password" type="password" placeholder="비밀번호 입력" ref={passwordInputRef}></input>
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
              <Link to="/signup/realtor">회원가입</Link> | <Link onClick={findPasswordModalHandler}>비밀번호 찾기</Link>
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

export default RealtorLoginForm;
