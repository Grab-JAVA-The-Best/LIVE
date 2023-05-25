import { NavLink } from "react-router-dom";
import classes from "./ConsultingCardContent.module.scss";

const ConsultingCardContent = (props) => {
  const isUser = props.isUser;

  return (
    <>
      <div className={classes.content}>
        <img src="https://randomuser.me/api/portraits/lego/6.jpg" />
      </div>
      <div className={classes.info}>
        {/* <NavLink>예약 상세보기</NavLink> */}
        <h3>예약 중? 현재 상태에 따라 </h3>
        <h3>상담일시</h3>
        <h4>날짜맨</h4>
        <p className={classes.bio}> ~외 n 건</p>
      </div>
    </>
  );
};

export default ConsultingCardContent;
