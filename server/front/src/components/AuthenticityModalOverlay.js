import { useRef } from "react";
import classes from "./AuthenticityModalOverlay.module.scss";

const AuthenticityModalOverlay = ({
  setBusinessNumber,
  onModalStateChange,
}) => {
  const modalBNInputRef = useRef();
  const modalRNInputRef = useRef();
  const modalSDInputRef = useRef();

  const onClickHandler = () => {
    const bNo = modalBNInputRef.current.value;
    fetch(
      "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=WJW00Su3vUYQxWl%2FCdTWnPqgt4dnBsErjbqIqeo9I7%2BWiVcC4HDx26kL%2BYDc0MRTL%2BjZ6RC1BWUVlf9Z8rWQPg%3D%3D",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          b_no: [bNo],
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        const data = json.data[0].b_stt_cd;
        if (data === "01") {
          setBusinessNumber(bNo);
          onModalStateChange();
        } else alert("등록되지 않은 사업자 번호입니다!");
      });
  };

  return (
    <>
      <div className={classes.searchModal}>
        <h2>중복확인</h2>
        <div>
          <label htmlFor="businessnumber">사업자 등록번호(필수) </label>
          <input type="text" id="businessnumber" ref={modalBNInputRef} />
        </div>
        <button onClick={onClickHandler}>진위확인</button>
      </div>
    </>
  );
};

export default AuthenticityModalOverlay;
