import classes from "./ContractCardContent.module.scss";
import sample from "../assets/image/sample.jpg";
import { useNavigate } from "react-router-dom";

const ContractCardContent = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.contractCard}>
        <div className={classes.profileField}>
          <div className={classes.profileBox}>
            <div className={classes.profileImage}>
              <img src={props.memberInfo.imageSrc} />
            </div>
            <div className={classes.memberInfo}>
              {!props.isRealtor && <p> {props.memberInfo.desc}</p>}
              <div>
                <strong>{props.memberInfo.name}</strong>
                {props.isRealtor && (
                  <p>
                    {props.memberInfo.age}세 / {props.memberInfo.gender}
                  </p>
                )}
              </div>
              <div>{props.isRealtor && <p> {props.memberInfo.desc}</p>}</div>
            </div>
          </div>

          <div className={classes.contractStatus}>
            <p
              className={
                props.status === 0 ? classes.approve : props.status === 1 ? classes.processing : classes.complete
              }
            >
              {props.status === 0 ? "승인 대기중" : props.status === 1 ? "계약 진행" : "계약 완료"}
            </p>
          </div>
        </div>

        <hr />

        <div className={classes.contentField}>
          <div className={classes.contentBox}>
            <div className={classes.itemInfo}>
              <div className={classes.noInfo}>
                <p>매물번호 {props.itemInfo.itemNo}</p>
                <p>계약번호 {props.contractNo}</p>
              </div>
              <strong>
                {props.itemInfo.address}&nbsp;
                <p>({props.itemInfo.buildingName})</p>
              </strong>
              <p>
                방 {props.itemInfo.room}/{" "}
                {props.itemInfo.exclusivePrivateArea.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}㎡{" "}
                {"(전용" +
                  Math.round(props.itemInfo.exclusivePrivateArea / 3.3)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                  "평)"}
              </p>
            </div>
            <div className={classes.priceInfo}>
              <div className={classes.forSalePrice}>
                <p>
                  매물 가격
                  <strong>
                    &nbsp;월세 {props.itemInfo.deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원 /{" "}
                    {props.itemInfo.rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원
                  </strong>
                </p>
              </div>
              <div className={classes.maintenanceFee}>
                <p>
                  관리비&nbsp;
                  <strong>{props.itemInfo.maintenanceFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원</strong>
                </p>
              </div>
            </div>
            <div className={classes.contractButton}>
              {props.isRealtor ? (
                <button
                  onClick={() => {
                    navigate(`/contract/contract-detail/${props.contractNo}`);
                  }}
                >
                  계약 상세보기
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate(`/contract/contract-detail/${props.contractNo}`);
                  }}
                >
                  계약 상세보기
                </button>
              )}
            </div>
          </div>
          <div className={classes.imageBox}>
            <img src={props.itemInfo.imageSrc}></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractCardContent;
