import PreviewCarousel from "./house/PreviewCarousel";
import Map from "./common/Map";
import Icons from "../assets/Icons";
import { useDispatch } from "react-redux";
import { reservedItemAction } from "../store/reserved-item-slice";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import classes from "./HouseDetailCom.module.scss";
import { useEffect } from "react";
import { getHouseByItemNo } from "../apis/houseApis";
import Modal from "../UI/Modal";
import { useAuth } from "./common/AuthProtector";

const HouseDetailCom = (props) => {
  const [houseInfo, setHouseInfo] = useState();
  const [options, setOptions] = useState([]);
  const [isInfoMore, setIsInfoMore] = useState(false);
  const [isOptionMore, setIsOptionMore] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const navigate = useNavigate();

  const { userInfo } = useAuth();

  const dispatch = useDispatch();

  const params = useParams();

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

  useEffect(() => {
    const response = async () => {
      const itemNo = params.itemNo;

      const result = await getHouseByItemNo(itemNo ? itemNo : props.itemNo);

      if (result.result === "fail") {
        setErrMessage(result.message);
        return;
      }

      setHouseInfo(result.data);
    };

    response();
  }, []);

  useEffect(() => {
    if (houseInfo === undefined) return;

    setOptions(
      Object.entries(houseInfo.itemOption).filter((option) => {
        return option[1] === true;
      })
    );
  }, [houseInfo]);

  const previewModalHandler = () => {
    setPreviewModal(!previewModal);
  };

  return (
    <>
      {previewModal && (
        <Modal onConfirm={previewModalHandler} className={classes.previewModal}>
          <PreviewCarousel settings={carouselSettings} items={houseInfo.itemImages} onClose={previewModalHandler} />
        </Modal>
      )}
      {houseInfo ? (
        <div
          className={`${classes.houseDetailCom} ${props.isModal && classes.isModal} ${
            props.isConsulting && classes.isConsulting
          }`}
        >
          {houseInfo && (
            <>
              <div className={classes.imageContent}>
                <div className={classes.imageBox}>
                  <div className={classes.mainImage}>
                    <img src={houseInfo.itemImages[0].imageSrc}></img>
                  </div>
                  <div className={classes.subImage}>
                    {houseInfo.itemImages.slice(1, 5).map((image) => {
                      return <img src={image.imageSrc} key={image.itemImageNo}></img>;
                    })}
                  </div>
                </div>

                {!props.isConsulting && (
                  <div className={classes.imageButtonBox}>
                    <div>.</div>
                    <button onClick={previewModalHandler}>
                      <div>
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect />
                          <rect y="0.375em" />
                          <rect y="0.75em" />
                          <rect x="0.375em" />
                          <rect x="0.375em" y="0.375em" />
                          <rect x="0.375em" y="0.75em" />
                          <rect x="0.75em" />
                          <rect x="0.75em" y="0.375em" />
                          <rect x="0.75em" y="0.75em" />
                        </svg>
                        전체 보기
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          <div className={classes.contentBox}>
            <div className={classes.InnerBox}>
              <div className={classes.innerHeader}>
                <div className={classes.itemDesc}>
                  <p>
                    {houseInfo.house.sido} {houseInfo.house.gugun} {houseInfo.house.dong}
                  </p>
                  <div>
                    <span>보증금/월세</span>
                    <p>
                      {houseInfo.deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 만원 /{" "}
                      {houseInfo.rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 만원
                    </p>
                  </div>
                  <div>
                    <span>관리비</span>
                    <p>{houseInfo.maintenanceFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 만원</p>
                  </div>
                </div>
                {!props.isConsulting && (
                  <div className={classes.controlButtonBox}>
                    {userInfo.isRealtor === true ? (
                      <>
                        <button
                          className={classes.modifyButton}
                          onClick={() => {
                            navigate(`/house/modify/${houseInfo.itemNo}`);
                          }}
                        >
                          수 정
                        </button>
                      </>
                    ) : userInfo.isRealtor === false ? (
                      <>
                        <button
                          className={classes.pickButton}
                          onClick={() => {
                            dispatch(reservedItemAction.addItem(houseInfo));
                            props.onClose();
                          }}
                        >
                          담 기
                        </button>
                        <button
                          className={classes.contractButton}
                          onClick={() => {
                            navigate(`/contract/user-contract/${houseInfo.itemNo}`);
                          }}
                        >
                          계 약
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              </div>

              <div className={classes.itemInfo}>
                <h3>매물 정보</h3>
                <div>
                  <div className={classes.Area}>
                    {Icons.area} {houseInfo.house.exclusivePrivateArea.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    m² (전용{" "}
                    {Math.round(houseInfo.house.exclusivePrivateArea / 3.3)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    평) / {houseInfo.house.supplyArea.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    m² (공급{" "}
                    {Math.round(houseInfo.house.supplyArea / 3.3)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    평)
                  </div>
                </div>
                <div>
                  <div>
                    {Icons.room}{" "}
                    {houseInfo.house.room === 1
                      ? "원룸 "
                      : houseInfo.house.room === 2
                      ? "투룸 "
                      : "방 " + houseInfo.house.room + "개 "}
                    (욕실 {houseInfo.house.bathroom}개)
                  </div>
                  <div>
                    {Icons.parking} {houseInfo.itemOption.parkingLot ? "주차 가능" : "주차 불가능"}
                  </div>
                  <div>
                    {Icons.buildingFloor} {houseInfo.house.floor}층 / {houseInfo.house.totalFloor}층
                  </div>
                </div>
                <div>
                  <div>
                    {Icons.calendar}{" "}
                    {houseInfo.moveInDate.replaceAll("-", "") <
                    new Date().toISOString().substring(0, 10).replaceAll("-", "")
                      ? "즉시 입주 가능"
                      : houseInfo.moveInDate.replaceAll("-", ".") + " 이후 입주 가능"}
                  </div>
                  <div>
                    {Icons.compass}{" "}
                    {houseInfo.direction === "EAST"
                      ? "동향"
                      : houseInfo.direction === "WEST"
                      ? "서향"
                      : houseInfo.direction === "SOUTH"
                      ? "남향"
                      : houseInfo.direction === "NORTH"
                      ? "북향"
                      : houseInfo.direction === "SOUTH_EAST"
                      ? "남동향"
                      : houseInfo.direction === "SOUTH_WEST"
                      ? "남서향"
                      : houseInfo.direction === "NORTH_EAST"
                      ? "북동향"
                      : "북서향"}
                    (주실 기준)
                  </div>
                  <div>
                    {Icons.elevator} {houseInfo.itemOption.elevator ? "엘리베이터 있음" : "엘리베이터 없음"}
                  </div>
                </div>
                {!isInfoMore ? (
                  <button
                    onClick={() => {
                      setIsInfoMore(true);
                    }}
                  >
                    추가 정보 보기 ▶
                  </button>
                ) : (
                  <>
                    <div>
                      <div>
                        {Icons.purpose} {houseInfo.house.purpose}
                      </div>
                      <div>
                        {Icons.entrance}{" "}
                        {houseInfo.entrance === "STAIR"
                          ? "계단식"
                          : houseInfo.entrance === "PASSAGE"
                          ? "복도식"
                          : "복합식"}
                      </div>
                      <div>
                        {Icons.heating}
                        {houseInfo.heating === "INDIVIDUAl"
                          ? "개별난방"
                          : houseInfo.heating === "CENTERAL"
                          ? "중앙난방"
                          : "지역난방"}
                      </div>
                    </div>
                    <div>
                      <div>
                        {Icons.completionYear} {houseInfo.house.completionYear}년 준공
                      </div>
                      <div className={classes.addressInfo}>
                        {Icons.marker} {houseInfo.house.address}
                        {houseInfo.house.buildingName ? " (" + houseInfo.house.buildingName + ")" : ""}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIsInfoMore(false);
                      }}
                    >
                      ◀ 추가 정보 접기
                    </button>
                  </>
                )}
              </div>

              <hr />

              <div className={`${classes.optionInfo} ${props.isConsulting && classes.isConsulting}`}>
                <h3>옵션 정보</h3>
                <div>
                  {options.slice(0, 6).map((option) => {
                    if (option[0] === "bed") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.bed}</div>
                          <p>침대</p>
                        </div>
                      );
                    } else if (option[0] === "bed") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.bed}</div>
                          <p>침대</p>
                        </div>
                      );
                    } else if (option[0] === "washingMachine") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.washingMachine}</div> <p>세탁기</p>
                        </div>
                      );
                    } else if (option[0] === "airConditioner") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.airConditioner}</div> <p>에어컨</p>
                        </div>
                      );
                    } else if (option[0] === "desk") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.desk}</div> <p>책상</p>
                        </div>
                      );
                    } else if (option[0] === "closet") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.closet}</div> <p>옷장</p>
                        </div>
                      );
                    } else if (option[0] === "bathtub") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.bathtub}</div> <p>욕조</p>
                        </div>
                      );
                    } else if (option[0] === "sink") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.sink}</div> <p>싱크대</p>
                        </div>
                      );
                    } else if (option[0] === "cctv") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.cctv}</div> <p>CCTV</p>
                        </div>
                      );
                    } else if (option[0] === "diningTable") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.diningTable}</div> <p>식탁</p>
                        </div>
                      );
                    } else if (option[0] === "sofa") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.sofa}</div> <p>소파</p>
                        </div>
                      );
                    } else if (option[0] === "shoeRack") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.shoeRack}</div> <p>신발장</p>
                        </div>
                      );
                    } else if (option[0] === "refrigerator") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.refrigerator}</div> <p>냉장고</p>
                        </div>
                      );
                    } else if (option[0] === "dryingMachine") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.dryingMachine}</div> <p>건조기</p>
                        </div>
                      );
                    } else if (option[0] === "bidet") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.bidet}</div> <p>비데</p>
                        </div>
                      );
                    } else if (option[0] === "dishwasher") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.dishWasher}</div> <p>식기세척기</p>
                        </div>
                      );
                    } else if (option[0] === "gasStove") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.gasStove}</div> <p>가스레인지</p>
                        </div>
                      );
                    } else if (option[0] === "inductionCooktop") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.inductionCooktop}</div> <p>인덕션</p>
                        </div>
                      );
                    } else if (option[0] === "microwave") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.microwave}</div> <p>전자레인지</p>
                        </div>
                      );
                    } else if (option[0] === "oven") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.oven}</div> <p>오븐</p>
                        </div>
                      );
                    } else if (option[0] === "guard") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.guard}</div> <p>경비원</p>
                        </div>
                      );
                    } else if (option[0] === "intercom") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.intercom}</div> <p>인터폰</p>
                        </div>
                      );
                    } else if (option[0] === "keycard") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.keycard}</div> <p>카드키</p>
                        </div>
                      );
                    } else if (option[0] === "fireAlarm") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.fireAlarm}</div> <p>화재경보기</p>
                        </div>
                      );
                    } else if (option[0] === "veranda") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.veranda}</div> <p>베란다</p>
                        </div>
                      );
                    } else if (option[0] === "terrace") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.terrace}</div> <p>테라스</p>
                        </div>
                      );
                    } else if (option[0] === "garden") {
                      return (
                        <div className={classes.optionBox} key={option[0]}>
                          <div>{Icons.garden}</div> <p>마당</p>
                        </div>
                      );
                    }
                  })}

                  {isOptionMore && (
                    <>
                      {options.slice(6, options.length).map((option) => {
                        if (option[0] === "bed") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.bed}</div>
                              <p>침대</p>
                            </div>
                          );
                        } else if (option[0] === "bed") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.bed}</div>
                              <p>침대</p>
                            </div>
                          );
                        } else if (option[0] === "washingMachine") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.washingMachine}</div> <p>세탁기</p>
                            </div>
                          );
                        } else if (option[0] === "airConditioner") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.airConditioner}</div> <p>에어컨</p>
                            </div>
                          );
                        } else if (option[0] === "desk") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.desk}</div> <p>책상</p>
                            </div>
                          );
                        } else if (option[0] === "closet") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.closet}</div> <p>옷장</p>
                            </div>
                          );
                        } else if (option[0] === "bathtub") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.bathtub}</div> <p>욕조</p>
                            </div>
                          );
                        } else if (option[0] === "sink") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.sink}</div> <p>싱크대</p>
                            </div>
                          );
                        } else if (option[0] === "cctv") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.cctv}</div> <p>CCTV</p>
                            </div>
                          );
                        } else if (option[0] === "diningTable") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.diningTable}</div> <p>식탁</p>
                            </div>
                          );
                        } else if (option[0] === "sofa") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.sofa}</div> <p>소파</p>
                            </div>
                          );
                        } else if (option[0] === "shoeRack") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.shoeRack}</div> <p>신발장</p>
                            </div>
                          );
                        } else if (option[0] === "refrigerator") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.refrigerator}</div> <p>냉장고</p>
                            </div>
                          );
                        } else if (option[0] === "dryingMachine") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.dryingMachine}</div> <p>건조기</p>
                            </div>
                          );
                        } else if (option[0] === "bidet") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.bidet}</div> <p>비데</p>
                            </div>
                          );
                        } else if (option[0] === "dishwasher") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.dishWasher}</div> <p>식기세척기</p>
                            </div>
                          );
                        } else if (option[0] === "gasStove") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.gasStove}</div> <p>가스레인지</p>
                            </div>
                          );
                        } else if (option[0] === "inductionCooktop") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.inductionCooktop}</div> <p>인덕션</p>
                            </div>
                          );
                        } else if (option[0] === "microwave") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.microwave}</div> <p>전자레인지</p>
                            </div>
                          );
                        } else if (option[0] === "oven") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.oven}</div> <p>오븐</p>
                            </div>
                          );
                        } else if (option[0] === "guard") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.guard}</div> <p>경비원</p>
                            </div>
                          );
                        } else if (option[0] === "intercom") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.intercom}</div> <p>인터폰</p>
                            </div>
                          );
                        } else if (option[0] === "keycard") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.keycard}</div> <p>카드키</p>
                            </div>
                          );
                        } else if (option[0] === "fireAlarm") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.fireAlarm}</div> <p>화재경보기</p>
                            </div>
                          );
                        } else if (option[0] === "veranda") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.veranda}</div> <p>베란다</p>
                            </div>
                          );
                        } else if (option[0] === "terrace") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.terrace}</div> <p>테라스</p>
                            </div>
                          );
                        } else if (option[0] === "garden") {
                          return (
                            <div className={classes.optionBox} key={option[0]}>
                              <div>{Icons.garden}</div> <p>마당</p>
                            </div>
                          );
                        }
                      })}
                    </>
                  )}
                </div>
                {options.length > 6 &&
                  (!isOptionMore ? (
                    <button
                      onClick={() => {
                        setIsOptionMore(true);
                      }}
                    >
                      추가 정보 보기 ▶
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsOptionMore(false);
                      }}
                    >
                      ◀ 추가 정보 접기
                    </button>
                  ))}
              </div>

              <hr />

              <div className={classes.detailDesc}>
                <h3>상세 설명</h3>
                <div>
                  <pre>{houseInfo.description}</pre>
                </div>
              </div>

              <hr />

              <div className={classes.mapBox}>
                <h3>위치</h3>
                <div>
                  <p>{houseInfo.house.address}</p>
                  <div>
                    <Map
                      address={houseInfo.house.address}
                      houseName={
                        houseInfo.house.buildingName ? houseInfo.house.buildingName : houseInfo.house.addressDetail
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div>
            <h1>{errMessage}</h1>
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              홈으로
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default HouseDetailCom;
