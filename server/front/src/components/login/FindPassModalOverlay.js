import classes from "./FindPassModalOverlay.module.scss";
import { useRef } from "react";
import { Link } from "react-router-dom";

const FindPassModalOverlay = (props) => {
  const modalIdInputRef = useRef();
  const modalEmailInputRef = useRef();

  const modalFindPassHandler = () => {
    const emailVaild = /^[A-Za-z0-9.\-_]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;

    if (modalIdInputRef.current.value.trim().length === 0) {
      alert("회원 아이디 제대로 입력한거 맞니?");
      modalIdInputRef.current.focus();
      return;
    }

    if (
      (modalEmailInputRef.current.value.trim().length === 0) |
      !emailVaild.test(modalEmailInputRef.current.value)
    ) {
      alert("이메일 제대로 입력한ㄱ  ㅓ맞니>/???");
      modalEmailInputRef.current.focus();
      return;
    }

    const findPassInfo = {
      id: modalIdInputRef.current.value,
      email: modalEmailInputRef.current.value,
    };

    props.onFindPassword(findPassInfo);
  };

  const modalStateChangeHandler = () => {
    props.onModalStateChange();
  };

  return (
    <>
      <header className={classes.header}>
        <div style={{ textAlign: "end" }}>
          <Link
            onClick={modalStateChangeHandler}
            style={{ textDecoration: "none", fontSize: "large" }}
          >
            X
          </Link>
        </div>
        <h1>{props.findType} 비밀번호 찾기</h1>
        <div>
          <span style={{ width: "100px", background: "#5AB7BF" }}>&nbsp;</span>
          가입 시 등록한 보조 이메일을 인증수단으로 비밀번호를 찾을 수 있습니다.
        </div>
      </header>
      <div className={classes.content}>
        <form>
          <div>
            {props.findType === "중개사" && (
              <label htmlFor="id">사업자 번호</label>
            )}
            {props.findType === "일반회원" && (
              <label htmlFor="id">아이디</label>
            )}
            <br></br>
            <input type="text" id="id" ref={modalIdInputRef}></input>
          </div>
          <div>
            <label htmlFor="email">이메일</label>
            <br></br>
            <input type="email" id="email" ref={modalEmailInputRef}></input>
          </div>
        </form>
        <button onClick={modalFindPassHandler}>확인</button>
      </div>
    </>
  );
};

export default FindPassModalOverlay;
