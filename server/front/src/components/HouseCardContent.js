import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";
import PreviewCarousel from "./house/PreviewCarousel";
import HouseDetailCom from "./HouseDetailCom";
import classes from "./HouseCardContent.module.scss";
import classes2 from "./HouseCardContent2.module.scss";
import sample from "../assets/image/sample.jpg";
import ResponsiveText from "./common/ResponsiveText";
import { useAuth } from "./common/AuthProtector";

const HouseCardContent = ({
  props,
  idx,
  address,
  addressDetail,
  buildingName,
  deposit,
  description,
  imageSrc,
  maintenanceFee,
  rent,
  consultingNo,
  exclusivePrivateArea,
  itemNo,
  searchedListClickHandler,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModal, setModal] = useState(false);

  const itemData = {
    idx,
    itemNo,
    address,
    addressDetail,
    buildingName,
    deposit,
    description,
    imageSrc,
    maintenanceFee,
    rent,
    exclusivePrivateArea,
  };

  return (
    <>
      <div
        className={classes.reserveCard}
        onClick={() => {
          searchedListClickHandler(itemData);
        }}
      >
        <div className={classes.leftContent}>
          <img src={imageSrc}></img>
        </div>
        <div className={classes.rightContent}>
          <h2>
            월세 {deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            만원/ {rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 만원
          </h2>
          <p>
            전용{" "}
            {exclusivePrivateArea
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            ㎡ (
            {Math.round(exclusivePrivateArea / 3.3)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            평) ㆍ 관리비 {maintenanceFee} 만원
          </p>
          <p>{address + " " + addressDetail}</p>
          <p className={classes.descText}>
            <ResponsiveText
              text={description}
              textLength={[30, 40, 50, 70, 80]}
            />
          </p>
        </div>
      </div>
    </>
  );
};

export default HouseCardContent;

export const ConsultingHouseCardContent = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModal, setModal] = useState(false);
  const { userInfo } = useAuth();

  const clickEventHandler = () => {
    if (props.clickHandler) {
      props.clickHandler(props.idx);
      return;
    }

    if (location.pathname !== "/house") {
      setModal(!isModal);
    } else {
      navigate("/house/detail/대충 번호");
    }
  };

  return (
    <>
      <div
        className={`${classes.consulting_inner} ${
          props.highlightNo === props.idx ? classes.highlight : ""
        }`}
        onClick={() => {
          if (userInfo.isRealtor) {
            props.setHighlightNo(props.idx);
          }
        }}
      >
        <div className={classes.upperCard}>
          <div className={classes.leftBox}>
            <div>{props.idx + 1}번 매물</div>
            <h3>
              <span>월세</span> {props.deposit} / {props.rent}
            </h3>
            <p> 크기 35 / 관리비 {props.maintenanceFee}만 </p>
            <p> {props.address} </p>
          </div>
          <div className={classes.rightBox}>
            <img
              src={props.imageSrc ? props.imageSrc : sample}
              alt={"토토로"}
            />
          </div>
        </div>
        <div className={classes.downCard}>
          <button onClick={clickEventHandler}>상세 정보 보기 </button>
        </div>
        {props.detail === props.idx && (
          <div className={classes.badge}>
            <div>
              <button style={{ cursor: "pointer" }} onClick={clickEventHandler}>
                매물목록으로
              </button>
            </div>
            <HouseDetailCom isConsulting={true} itemNo={props.itemNo} />
          </div>
        )}
      </div>
    </>
  );
};

export const ReservationHouseCardContent = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModal, setModal] = useState(false);

  const clickEventHandler = () => {
    if (props.clickHandler) {
      props.clickHandler(props.idx);
      return;
    }

    if (location.pathname !== "/house") {
      setModal(!isModal);
    } else {
      navigate("/house/detail/대충 번호");
    }
  };

  const house = props.house;

  return (
    <div
      onClick={() => {
        props.removeItemHandler(props.itemNo);
      }}
      className={`${classes.reservationItem} `}
    >
      <div className={classes.removeText}>클릭 시 목록에서 삭제됩니다.</div>
      <div className={classes.cardBox}>
        <div className={classes.image}>
          <img
            src={
              props.itemImages?.length !== 0
                ? props.itemImages[0].imageSrc
                : sample
            }
            alt="선택한 매물 목록"
          />
        </div>
        <div>
          <h3>
            월세{" "}
            {props.deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} /{" "}
            {props.rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h3>
          <p>
            {props.house.room === 1
              ? "원룸 "
              : props.house.room === 2
              ? "투룸 "
              : "방 " + props.house.room + "개 "}
            {props.house.exclusivePrivateArea
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            m² 관리비{" "}
            {props.maintenanceFee
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          <p>{house.address}</p>
        </div>
        {isModal && (
          <Modal onConfirm={clickEventHandler}>
            <HouseDetailCom itemNo={props.itemNo} isModal={true} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export const RealtorHousesCardContent = ({
  itemNo,
  imageSrc,
  deposit,
  monthlyRent,
  address,
}) => {
  const [isModal, toggleModal] = useState(false);

  const onConfirm = () => {
    toggleModal(!isModal);
  };

  return (
    <div className={classes.houseItem}>
      <div className={classes.houseImg}>
        <img src={imageSrc} alt={address} />
      </div>
      <div className={classes.houseInfo}>
        <h3>
          월세 {deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} /{" "}
          {monthlyRent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </h3>
        <p className={classes.address}>{address}</p>
        <button onClick={onConfirm}>매물 상세보기 </button>
      </div>
      {isModal && (
        <Modal onConfirm={onConfirm}>
          <HouseDetailCom itemNo={itemNo} isModal={true} onClose={onConfirm} />
        </Modal>
      )}
    </div>
  );
};

export const ContractHouseCardContent = (props) => {
  const forSale = props.ContractInfo;

  const formData = useRef();

  const insertInfo = (e) => {
    e.preventDefault();
    const info = {
      userTermOfContract: formData.current.userTermOfContract.value,
      userMoveOnDate: formData.current.userMoveOnDate.value,
    };
    props.fx2(info);
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    autoplay: false,
    autoplaySpeed: 0,
    draggable: false,
    fade: true,
    arrows: true,
    customArrow: true,
    vertical: false,
    initialSlide: 0,
    pauseOnFocus: true,
    pauseOnHover: true,
    appendDots: true,
  };

  return (
    <>
      <form ref={formData}>
        <div className={classes.contractForSale}>
          <div className={classes.inner}>
            <h2>매물 정보</h2>
            <br />
            <div className={classes.contractContent}>
              <div className={classes.leftDesc}>
                <p>매물번호 {forSale.houseNumber}</p>
                <h4>{forSale.houseAddress}</h4>
                <h4>{forSale.houseName}</h4>
                <p>{forSale.houseArea}</p>
                <p> {forSale.houseSupplyArea}㎡(전용 면적)</p>
                <div className={classes.infoBoxList}>
                  <div className={classes.forSale}>
                    <strong>매물가격</strong>{" "}
                    <input
                      type="text"
                      value={
                        "월세 " +
                        forSale.houseDeposit +
                        "/" +
                        forSale.houseMonthlyFee
                      }
                      readOnly
                    />
                  </div>
                  <div className={classes.extraFee}>
                    <strong>추가 비용</strong>{" "}
                    <input
                      value={"관리비 " + forSale.houseExtraFee}
                      readOnly
                    ></input>
                  </div>
                  <div className={classes.term}>
                    <strong>계약 기간</strong>
                    <input
                      placeholder="12(개월)"
                      id="userTermOfContract"
                      name="userTermOfContract"
                      onChange={insertInfo}
                    ></input>
                  </div>
                  <div className={classes.moveDate}>
                    <strong>입주 희망일</strong>
                    <input
                      type="date"
                      placeholder="2023-01-23"
                      id="userMoveOnDate"
                      name="userMoveOnDate"
                      onChange={insertInfo}
                    ></input>
                  </div>
                </div>
              </div>
              <div className={classes.rightImg}>
                <div className={classes.imageContent}>
                  <div className={classes.imageBox}>
                    <div className={classes.mainImage}>
                      <img src={forSale.houseImage[0]}></img>
                    </div>
                    <div className={classes.subImage}>
                      {forSale.houseImage.slice(1, 3).map((image, idx) => {
                        return <img src={image} key={idx}></img>;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </form>
    </>
  );
};

export const ContractDetailUserCardContent = (props) => {
  const forSale = props.ContractInfo;

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    autoplay: false,
    autoplaySpeed: 0,
    draggable: false,
    fade: true,
    arrows: true,
    customArrow: true,
    vertical: false,
    initialSlide: 0,
    pauseOnFocus: true,
    pauseOnHover: true,
    appendDots: true,
  };

  return (
    <form>
      <div className={classes.contractForSaleContent}>
        <div className={classes.inner}>
          <h2>매물 정보</h2>
          <br />
          <div className={classes.contractContent}>
            <div className={classes.leftDesc}>
              <p>매물번호 {forSale.houseNumber}</p>
              <h4>{forSale.houseAddress}</h4>
              <h4>{forSale.houseName}</h4>
              <p>{forSale.houseArea}</p>
              <p> {forSale.houseSupplyArea}㎡(전용 면적)</p>
              <div className={classes.infoBoxList}>
                <div className={classes.forSale}>
                  <strong>매물가격</strong>{" "}
                  <input
                    type="text"
                    value={
                      "월세 " +
                      forSale.houseDeposit +
                      "/" +
                      forSale.houseMonthlyFee
                    }
                    readOnly
                  />
                </div>
                <div className={classes.extraFee}>
                  <strong>추가 비용</strong>{" "}
                  <input
                    value={"관리비 " + forSale.houseExtraFee}
                    readOnly
                  ></input>
                </div>
                <div className={classes.term}>
                  <strong>계약 기간</strong>
                  <input value={forSale.houseTermOfContract} readOnly></input>
                </div>
                <div className={classes.moveDate}>
                  <strong>입주 희망일</strong>
                  <input value={forSale.houseMoveOnDate} readOnly></input>
                </div>
              </div>
            </div>
            <div className={classes.rightImg}>
              <div className={classes.imageContent}>
                <div className={classes.imageBox}>
                  <div className={classes.mainImage}>
                    <img src={forSale.houseImage[0]}></img>
                  </div>
                  <div className={classes.subImage}>
                    {forSale.houseImage.slice(1, 3).map((image, idx) => {
                      return <img src={image} key={idx}></img>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </form>
  );
};

export const ContractDetailRealtorCardContent = (props) => {
  const forSale = props.ContractInfo;

  const formData = useRef();

  const insertInfo = (e) => {
    e.preventDefault();
    const depositInput = formData.current.deposit.value;
    const info = {
      deposit: Number(depositInput),
      rent: Number(formData.current.rent.value),
      maintenanceFee: Number(formData.current.maintenanceFee.value),
      termOfContract: Number(formData.current.termOfContract.value),
      moveOnDate: formData.current.moveOnDate.value,
    };
    props.fx2(info);
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    autoplay: false,
    autoplaySpeed: 0,
    draggable: false,
    fade: true,
    arrows: true,
    customArrow: true,
    vertical: false,
    initialSlide: 0,
    pauseOnFocus: true,
    pauseOnHover: true,
    appendDots: true,
  };

  return (
    <form ref={formData}>
      <div className={classes.contractForSaleContentRealtor}>
        <div className={classes.inner}>
          <h2>매물 정보</h2>
          <br />
          <p>* 은 필수 입력값입니다!</p>
          <br />
          <div className={classes.contractContent}>
            <div className={classes.leftDesc}>
              <p>매물번호 {forSale.houseNumber}</p>
              <h4>{forSale.houseAddress}</h4>
              <h4>{forSale.houseName}</h4>
              <p>{forSale.houseArea}</p>
              <p> {forSale.houseSupplyArea}㎡(전용 면적)</p>
              <div className={classes.infoBoxList}>
                <div className={classes.forSaleDeposit}>
                  <strong>* 보증금</strong>{" "}
                  <input
                    placeholder={forSale.houseDeposit}
                    id="deposit"
                    name="deposit"
                    onChange={insertInfo}
                  ></input>
                </div>
                <div className={classes.forSaleRent}>
                  <strong>* 월세</strong>{" "}
                  <input
                    placeholder={forSale.houseMonthlyFee}
                    id="rent"
                    name="rent"
                    onChange={insertInfo}
                  ></input>
                </div>
                <div className={classes.extraFee}>
                  <strong>* 관리비</strong>{" "}
                  <input
                    placeholder={forSale.houseExtraFee}
                    id="maintenanceFee"
                    name="maintenanceFee"
                    onChange={insertInfo}
                  ></input>
                </div>
                <div className={classes.term}>
                  <strong>* 계약 기간</strong>
                  <input
                    placeholder={forSale.houseTermOfContract}
                    id="termOfContract"
                    name="termOfContract"
                    onChange={insertInfo}
                  ></input>
                </div>
                <div className={classes.moveDate}>
                  <strong>* 입주 희망일</strong>
                  <input
                    type="date"
                    defaultValue={forSale.houseMoveOnDate}
                    id="moveOnDate"
                    name="moveOnDate"
                    onChange={insertInfo}
                  ></input>
                </div>
              </div>
            </div>
            <div className={classes.rightImg}>
              <div className={classes.imageContent}>
                <div className={classes.imageBox}>
                  <div className={classes.mainImage}>
                    <img src={forSale.houseImage[0]}></img>
                  </div>
                  <div className={classes.subImage}>
                    {forSale.houseImage.slice(1, 3).map((image, idx) => {
                      return <img src={image} key={idx}></img>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </form>
  );
};
