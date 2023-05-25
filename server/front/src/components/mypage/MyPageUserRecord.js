import classes from "./MyPageUserRecord.module.scss";
import { useLoaderData } from "react-router-dom";
import axiosInstance from "../../util/axios";
import { useEffect, useState } from "react";
import { getReservationList } from "../../apis/reservationApis";
import ListBox from "../../UI/ListBox";
import ReservationCardContent3 from "../ReservationCardContent3";
import Modal from "../../UI/Modal";
import RecordedVideo from "../RecordedVideo";

const MyPageUserRecord = (props) => {
  const [recordsList, setRecordsList] = useState([]);
  const [consultNo, setConsultNo] = useState(-1);
  const consultsData = useLoaderData();
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (consultNo !== -1) {
      (async () => {
        const response = await axiosInstance.get(
          `consultings/${consultNo}/records`
        );

        if (response.data.data.length === 0) {
          alert("녹화된 영상이 존재하지 않습니다.");
          return;
        }

        setRecordsList(response.data.data);

        setIsModal(true);
      })();
    }
  }, [consultNo]);

  return (
    <>
      {isModal && (
        <>
          <Modal>
            <RecordedVideo
              videoList={recordsList}
              onClose={() => {
                setIsModal(false);
                setConsultNo(-1);
              }}
            />
          </Modal>
        </>
      )}
      <div className={classes.recordBox}>
        <h3>지난 상담 내역</h3>
        <div>
          <ListBox dataArray={consultsData.data}>
            <ReservationCardContent3 tabActive={2} isRecord={setConsultNo} />
          </ListBox>
        </div>
      </div>
    </>
  );
};

export default MyPageUserRecord;

export const endConsultingsLoader = async () => {
  const response = await getReservationList(2);
  return response;
};
