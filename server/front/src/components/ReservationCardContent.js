import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button";

import classes from "./ReservationCardContent.module.scss";
import totoro from "../assets/image/sample.jpg";
import { STATUS } from "../pages/ConsultingPage";
import { BsCalendar2WeekFill, BsFillPhoneFill } from "react-icons/bs";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import Modal from "../UI/Modal";
import {
  changeConsultinRoomNo,
  registConsultingRoomLink,
} from "../apis/consultingApi";

const ReservationCardContent = (props) => {
  const [isConsulting, setConsulting] = useState(props.isConsulting);
  const realtor = useRef(props.isRealtor);

  const clickEventHandler = () => {
    if (props.statusChangeHandler)
      props.statusChangeHandler(STATUS.REALTOR_START_CONSULTING);
  };

  return (
    <div className={classes.cardBox}>
      <div>
        <img src={totoro} alt="totoro"></img>
        <p>{realtor ? `고객맨` : `중개사맨`} </p>
      </div>
      <div>
        <Link>예약 상세보기▶</Link>
        <p>상담 일시</p>
        <p>예약 정보</p>
        {!isConsulting && <button>상담 바로가기</button>}
        {isConsulting && (
          <Button clickEvent={clickEventHandler}>상담하기</Button>
        )}
      </div>
    </div>
  );
};

export default ReservationCardContent;

export const ConsultingReservationCardContent = (props) => {
  const [isConsulting, setConsulting] = useState(props.isConsulting);
  const [viewModal, setViewModal] = useState(false);
  const realtor = useRef(props.isRealtor);
  const navigation = useNavigate();

  const toggleModal = () => {
    setViewModal(!viewModal);
  };

  const clickEventHandler = () => {
    const linkUrl = `/consulting/${props.sessionId}/${props.consultingNo}/${props.realtorNo}/${props.userNo}`;

    registConsultingRoomLink(props.consultingNo, linkUrl);
    changeConsultinRoomNo(props.consultingNo, 3);

    if (props.statusChangeHandler) {
      props.statusChangeHandler(STATUS.REALTOR_START_CONSULTING);
    }

    navigation(linkUrl);
  };

  return (
    <div className={classes.consultingCardBox}>
      <div className={classes.imageContainer}>
        <img
          src={props.userImage ? props.userImage : totoro}
          alt="totoro"
        ></img>
      </div>
      <div className={classes.consultingDetail}>
        <div className={classes.detailContainer}>
          <p>
            <MdOutlineDriveFileRenameOutline /> {props.userName}
          </p>
          <p>
            <BsCalendar2WeekFill /> {props.consultingDate.substring(0, 10)}
          </p>
          <p>
            <BsFillPhoneFill />{" "}
            {props.userPhone.length <= 11
              ? `${props.userPhone.substring(0, 3)}-${props.userPhone.substring(
                  3,
                  7
                )}-${props.userPhone.substring(7, 11)}`
              : props.userPhone}
          </p>
        </div>
        <div className={classes.buttonContainer}>
          <button
            onClick={() => {
              toggleModal;
            }}
            className={classes.whiteBtn}
          >
            예약 상세보기
          </button>
          {!isConsulting && <button>상담 바로가기</button>}
          {isConsulting && (
            <button onClick={clickEventHandler}>상담하기</button>
          )}
        </div>
      </div>
      {viewModal && (
        <Modal onConfirm={toggleModal}>
          <div>예약상세 나올 예정</div>
        </Modal>
      )}
    </div>
  );
};
