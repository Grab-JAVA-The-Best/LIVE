import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import classes from "./ConsultingRightBox.module.scss";
import { GiHamburgerMenu } from "react-icons/gi";

const ConsultingRightBox = ({
  sessionId,
  statusChangeHandler,
  status,
  isRealtor,
  toggleListInMobile,
  viewList,
  highlightNo,
  setHighlightNo,
}) => {
  const [detail, setDetail] = useState(-1);

  const clickHandler = (idx) => {
    if (detail === -1) {
      setDetail(idx);
    } else {
      setDetail(-1);
    }
  };

  return (
    <>
      <div className={classes.mobileBtn} onClick={toggleListInMobile}>
        <GiHamburgerMenu />
      </div>
      <div
        className={`${classes.inner_content} ${
          viewList ? classes.isActive : ""
        }`}
      >
        <Outlet
          context={{
            sessionId,
            statusChangeHandler,
            clickHandler,
            detail,
            highlightNo,
            setHighlightNo,
          }}
        />
      </div>
    </>
  );
};

export default ConsultingRightBox;
