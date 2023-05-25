import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useOutletContext, useParams } from "react-router-dom";
import {
  changeConsultinRoomNo,
  getConsultingDetail,
  registConsultingRoomLink,
} from "../../apis/consultingApi";
import { useNavigate } from "react-router-dom";
import { STATUS } from "../../pages/ConsultingPage";
import ListBox from "../../UI/ListBox";
import { ConsultingHouseCardContent } from "../HouseCardContent";

const ConsultingRightReservationHouseList = () => {
  const {
    clickHandler,
    detail,
    statusChangeHandler,
    highlightNo,
    setHighlightNo,
  } = useOutletContext();
  const navigation = useNavigate();

  const datas = useLoaderData();
  const params = useParams();

  const userInfo = useSelector((state) => state.user.userInfo);

  const dataArray = datas.itemList;

  // useEffect(() => {
  //   if (userInfo.isRealtor) {
  //     const linkUrl = `/consulting/${params.sessionId}/${params.consultingNo}/${params.realtorNo}/${params.userNo}`;

  //     registConsultingRoomLink(params.consultingNo, linkUrl);
  //     changeConsultinRoomNo(params.consultingNo, 3);
  //   }
  // }, []);

  return (
    <div style={{ maxHeight: "100%", overflow: "scroll" }}>
      <ListBox toStart={true} dataArray={dataArray}>
        <ConsultingHouseCardContent
          clickHandler={clickHandler}
          detail={detail}
          highlightNo={highlightNo}
          setHighlightNo={setHighlightNo}
        />
      </ListBox>
      {userInfo.isRealtor && (
        <button
          style={{
            width: "100%",
            height: "2rem",
            backgroundColor: "#fafafa",
            borderRadius: "8px",
          }}
          onClick={() => {
            changeConsultinRoomNo(params.consultingNo, 4);
            statusChangeHandler(STATUS.REALTOR_END_CALL);
          }}
        >
          상담종료
        </button>
      )}
    </div>
  );
};

export default ConsultingRightReservationHouseList;

export const consultingDetailLoader = async ({ params }) => {
  const response = await getConsultingDetail(params.consultingNo);
  return response.data;
};
