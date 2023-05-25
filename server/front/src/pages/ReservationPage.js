import ReservationLeftDiv from "../components/reservation/ReservationLeftDiv";
import ReservationRightDiv from "../components/reservation/ReservationRightDiv";
import ReservationNullCard from "../components/reservation/ReservationNullCard";
import ReservationSearchBox from "../components/reservation/ReservationSearchBox";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./ReservationPage.module.scss";
import { FiAlertCircle } from "react-icons/fi";
import { useLoaderData, useNavigate } from "react-router-dom";
import axiosInstance from "../util/axios";
import {
  registResevation,
  searchRealtorList,
  searchReservationRealtorDetail,
} from "../apis/reservationApis";
import Modal from "../UI/Modal";
import { reservedItemAction } from "../store/reserved-item-slice";
import CustomAlert from "../UI/Alert";
import ListBox from "../UI/ListBox";

const ReservationPage = () => {
  const [reserveData, setReserveData] = useState({
    sido: "",
    gugun: "",
    dong: "",
    date: new Date(),
  });

  const isMount = useRef(false);

  const sidos = useLoaderData().data.data;

  const [realtorList, setRealtorList] = useState([]);
  const [realtorDetail, setRealtorDetail] = useState(null);

  const [modalActive, setModalActive] = useState(false);
  const [viewAlert, setViewAlert] = useState(false);
  const dispatch = useDispatch();

  const modalToggleHandler = () => {
    setModalActive(!modalActive);
  };

  const selectedItems = useSelector((state) => {
    return state.reserve.selectedItems;
  });

  const clickRealtorEventHandler = (realtorNo) => {
    const params = {};

    if (!reserveData.gugun) {
      params[`regionCode`] = reserveData.sido.substring(0, 2);
    } else if (!reserveData.dong) {
      params[`regionCode`] = reserveData.gugun.substring(0, 5);
    } else {
      params[`regionCode`] = reserveData.dong;
    }

    (async () => {
      const res = await searchReservationRealtorDetail(realtorNo, params);
      const data = res.data;
      console.log(data);
      setRealtorDetail(data.data);
    })();
  };

  const clickSearchEventHandler = (sido, gugun, dong, date) => {
    if (!sido) {
      alert(`광역시도는 반드시 입력해야 합니다!`);
    } else if (!date) {
      alert(`날짜는 반드시 입력해야 합니다!`);
    } else {
      setReserveData({ sido, gugun, dong, date });
    }
  };

  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }

    const params = {};

    if (!reserveData.sido) {
      return;
    }

    if (!reserveData.gugun) {
      params[`regionCode`] = reserveData.sido.substring(0, 2);
    } else if (!reserveData.dong) {
      params[`regionCode`] = reserveData.gugun.substring(0, 5);
    } else {
      params[`regionCode`] = reserveData.dong;
    }

    (async () => {
      setRealtorDetail(null);
      try {
        const result = await searchRealtorList(params);
        setRealtorList(result.data.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [reserveData]);

  const removeItemHandler = (itemNo) => {
    if (window.confirm("매물 목록에서 삭제하겠습니까?")) {
      dispatch(reservedItemAction.removeItem(itemNo));
    }
  };

  const registReservationHandler = (detail) => {
    const data = {};
    data["requirement"] = detail;
    data["status"] = false;
    data["realtorNo"] = realtorDetail.realtorInfo.no;
    data["consultingDate"] = reserveData.date;

    const itemList = [];

    selectedItems.forEach((el) => {
      itemList.push(el.itemNo);
    });

    data["itemList"] = itemList;

    registResevation(data);
  };

  return (
    <>
      <div className={classes.reservationContainer}>
        <div className={classes.reserveHeader}>
          <h1>예약하기</h1>

          <div className={classes.reservationSearchBoxContainer}>
            <h3>어느 지역을 원하세요?</h3>
            <ReservationSearchBox
              clickSearchEventHandler={clickSearchEventHandler}
              sidos={sidos}
            />
          </div>
        </div>
      </div>
      <div className={classes.contentContainer}>
        <ReservationLeftDiv
          realtors={realtorList}
          clickEventHandler={clickRealtorEventHandler}
        />
        <ReservationRightDiv realtorDetail={realtorDetail} />
      </div>
      <div className={classes.listBoxContainer}>
        <div className={classes.listItemContainer}>
          <h2>내가 선택한 매물</h2>
          <div className={classes.list}>
            <ReservationNullCard
              selectedItems={selectedItems}
              removeItemHandler={removeItemHandler}
            />
          </div>
        </div>
      </div>
      <div>
        <div className={classes.infomationBox}>
          <div className={classes.iconContainer}>
            <FiAlertCircle />
          </div>
          <div className={classes.ulContainer}>
            <ul>
              <li>
                선택 하신 매물은 계정 정보(가입된 아이디, 이름, 연락처 등)와
                함께 해당 공인중개사에게 노출 됩니다.
              </li>
              <li>
                신청하신 예약은 해당 공인중개사가 확인(상담 매물 수정 등) 후
                고객님의 예약 확정을 통해 상담이 이루어집니다.
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.reserveBtnContainer}>
          <button onClick={modalToggleHandler}>예약하기</button>
        </div>
      </div>
      {modalActive && (
        <Modal onConfirm={modalToggleHandler}>
          <DoReserve
            registHandler={registReservationHandler}
            modalToggleHandler={modalToggleHandler}
            setter={setViewAlert}
          ></DoReserve>
        </Modal>
      )}
      {viewAlert && (
        <CustomAlert
          title={"알림"}
          content={"예약이 완료되었습니다"}
          setter={setViewAlert}
        />
      )}
    </>
  );
};

export default ReservationPage;

const DoReserve = (props) => {
  const detail = useRef();
  const navigation = useNavigate();

  return (
    <div className={classes.doReserve}>
      <label>요청사항</label>
      <textarea
        ref={detail}
        placeholder={`세부적인 요청사항이 있다면 입력해주세요.`}
      ></textarea>
      <div className={classes.reserveBtnContainer}>
        <button
          onClick={() => {
            props.registHandler(detail.current.value);
            props.modalToggleHandler();
            props.setter(true);

            navigation("/mypage");
          }}
        >
          예약 요청하기
        </button>
      </div>
    </div>
  );
};

export const sidoLoader = async () => {
  try {
    return axiosInstance.get("regions", {
      params: {
        regionCode: "",
      },
    });
  } catch {
    throw new Error("sido Loader Error");
  }
};
