import { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";
import ConsultingMeetPage from "../components/consulting/ConsultingMeetPage";
import ConsultingRightBox from "../components/consulting/ConsultingRightBox";

import classes from "./ConsultingPage.module.scss";
import { useAuth } from "../components/common/AuthProtector";
import axiosInstance from "../util/axios";

export const STATUS = {
  REALTOR_ENTER: 100,
  REALTOR_START_CONSULTING: 111,
  REALTOR_END_CALL: 122,

  USER_ENTER: 200,

  SEND_ITEM_NO: 666,

  CONSULTING_IS_END: 999,
};

const ConsultingPage = (props) => {
  const params = useParams();
  const { userInfo } = useAuth();
  const [status, setStatus] = useState(
    userInfo.isRealtor ? STATUS.REALTOR_ENTER : STATUS.USER_ENTER
  );
  const [viewList, toggleList] = useState(false, true);
  const [recordingFiles, setRecordingFiles] = useState([]);
  const [highlightNo, setHighlightNo] = useState(0);

  const orderHandler = (status) => {
    switch (status) {
      case STATUS.REALTOR_ENTER:
        break;

      case STATUS.REALTOR_START_CONSULTING:
        if (confirm("상담을 시작하시겠습니까?")) {
          setStatus(STATUS.REALTOR_START_CONSULTING);
        }
        break;

      case STATUS.REALTOR_END_CALL:
        if (confirm("정말로 종료하시겠습니까? \n상담이 완전히 종료됩니다.")) {
          setStatus(STATUS.REALTOR_END_CALL);
        }
        break;

      case STATUS.USER_ENTER:
        setStatus(STATUS.USER_ENTER);
        break;

      case STATUS.CONSULTING_IS_END:
        setStatus(STATUS.CONSULTING_IS_END);
        break;
    }
  };

  const toggleListInMobile = () => {
    toggleList(!viewList);
  };

  useEffect(() => {
    if (recordingFiles.length !== 0) {
      const frm = new FormData();
      frm.append(
        "records",
        recordingFiles[recordingFiles.length - 1],
        "duckduck2.mp4"
      );

      axiosInstance
        .post(`consultings/${params.consultingNo}/records`, frm, {})
        .then()
        .catch((error) => console.error(error));
    }
  }, [recordingFiles]);

  return (
    <>
      <div className={classes.consulting_page}>
        <div className={classes.video_box}>
          <ConsultingMeetPage
            userInfo={userInfo}
            isRealtor={userInfo.isRealtor}
            status={status}
            sessionId={params.sessionId}
            recordingFiles={recordingFiles}
            setRecordingFiles={setRecordingFiles}
            statusChangeHandler={orderHandler}
            highlightNo={highlightNo}
            setHighlightNo={setHighlightNo}
          />
        </div>
        <div className={`${classes.lists} ${viewList ? classes.isActive : ""}`}>
          <ConsultingRightBox
            isRealtor={userInfo.isRealtor}
            statusChangeHandler={orderHandler}
            toggleListInMobile={toggleListInMobile}
            status={status}
            viewList={viewList}
            sessionId={params.sessionId}
            highlightNo={highlightNo}
            setHighlightNo={setHighlightNo}
          />
        </div>
      </div>
    </>
  );
};

export default ConsultingPage;
