import ImageInput from "../common/ImageInput";
import classes from "./HouseModify.module.scss";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { getHouseByItemNo, modifyHouseData } from "../../apis/houseApis";
import { useLoaderData, useNavigate } from "react-router-dom";

const HouseModify = () => {
  const navigate = useNavigate();
  const getLoaderData = useLoaderData().data;

  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState(getLoaderData.itemImages);
  const [direction, setDirection] = useState(getLoaderData.direction);
  const [entrance, setEntrance] = useState(getLoaderData.entrance);
  const [heating, setHeating] = useState(getLoaderData.heating);

  const buildingName = useRef();
  const deposit = useRef();
  const description = useRef();
  const itemNo = useRef();
  const maintenanceFee = useRef();
  const moveInDate = useRef();
  const rent = useRef();

  const address = useRef();
  const addressDetail = useRef();
  const bathroom = useRef();
  const completionYear = useRef();
  const exclusivePrivateArea = useRef();
  const floor = useRef();
  const houseNo = useRef();
  const contracted = useRef();
  const purpose = useRef();
  const room = useRef();
  const sido = useRef();
  const supplyArea = useRef();
  const gugun = useRef();
  const dong = useRef();
  const zipcode = useRef();
  const regionCode = useRef();
  const totalFloor = useRef();

  const airConditioner = useRef();
  const bathtub = useRef();
  const bed = useRef();
  const bidet = useRef();
  const cctv = useRef();
  const closet = useRef();
  const desk = useRef();
  const diningTable = useRef();
  const dishwasher = useRef();
  const dryingMachine = useRef();
  const elevator = useRef();
  const fireAlarm = useRef();
  const garden = useRef();
  const gasStove = useRef();
  const guard = useRef();
  const inductionCooktop = useRef();
  const intercom = useRef();
  const keycard = useRef();
  const microwave = useRef();
  const oven = useRef();
  const parkingLot = useRef();
  const refrigerator = useRef();
  const shoeRack = useRef();
  const sink = useRef();
  const sofa = useRef();
  const terrace = useRef();
  const veranda = useRef();
  const washingMachine = useRef();

  const setImageHandler = (data) => {
    setImages(data);
  };

  const setLoadedImageHandler = (data) => {
    setLoadedImages(data);
  };

  const modifyHouseInfo = async (event) => {
    event.preventDefault();

    const validText = "기본 정보, 추가 정보(옵션 제외) 입력은 필수입니다.";

    if (deposit.current.value.trim() === "") {
      deposit.current.focus();
      alert(validText);
      return;
    } else if (rent.current.value.trim() === "") {
      rent.current.focus();
      alert(validText);
      return;
    } else if (maintenanceFee.current.value.trim() === "") {
      maintenanceFee.current.focus();
      alert(validText);
      return;
    } else if (moveInDate.current.value.trim() === "") {
      moveInDate.current.focus();
      alert(validText);
      return;
    } else if (direction.trim() === "") {
      alert("추가정보[방향] 선택은 필수입니다.");
      return;
    } else if (entrance.trim() === "") {
      alert("추가정보[현관구조] 선택은 필수입니다.");
      return;
    } else if (heating.trim() === "") {
      alert("추가정보[난방방식] 선택은 필수입니다.");
      return;
    } else if (images.length + loadedImages.length < 5) {
      alert("최소 5장 이상의 사진을 등록해야 합니다.");
      return;
    }

    const response = await modifyHouseData({
      jsonData: {
        itemNo: itemNo.value,
        deposit: deposit.current.value.replaceAll(",", ""),
        description: description.current.value,
        direction: direction,
        entrance: entrance,
        heating: heating,
        maintenanceFee: maintenanceFee.current.value.replaceAll(",", ""),
        moveInDate: moveInDate.current.value,
        rent: rent.current.value.replaceAll(",", ""),
        itemImages: loadedImages.map((image) => {
          return image.itemImageNo;
        }),
        contracted: contracted.current.checked,
        itemOption: {
          airConditioner: airConditioner.current.checked,
          bathtub: bathtub.current.checked,
          bed: bed.current.checked,
          bidet: bidet.current.checked,
          cctv: cctv.current.checked,
          closet: closet.current.checked,
          desk: desk.current.checked,
          diningTable: diningTable.current.checked,
          dishwasher: dishwasher.current.checked,
          dryingMachine: dryingMachine.current.checked,
          elevator: elevator.current.checked,
          fireAlarm: fireAlarm.current.checked,
          garden: garden.current.checked,
          gasStove: gasStove.current.checked,
          guard: guard.current.checked,
          inductionCooktop: inductionCooktop.current.checked,
          intercom: intercom.current.checked,
          keycard: keycard.current.checked,
          microwave: microwave.current.checked,
          oven: oven.current.checked,
          parkingLot: parkingLot.current.checked,
          refrigerator: refrigerator.current.checked,
          shoeRack: shoeRack.current.checked,
          sink: sink.current.checked,
          sofa: sofa.current.checked,
          terrace: terrace.current.checked,
          veranda: veranda.current.checked,
          washingMachine: washingMachine.current.checked,
        },
      },
      files: [...images],
    });

    if (response.result === "fail") {
      alert(response.message);
    } else {
      alert("수정이 완료되었습니다.");
    }

    navigate("/house");
  };

  const inputNumBlurHandler = (event) => {
    event.target.value = event.target.value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const inputNumFocusHandler = (event) => {
    event.target.value = event.target.value.replaceAll(",", "");
  };

  const dateValidHandler = (event) => {
    const value = event.target.value.replaceAll("-", "");
    const today = new Date().toISOString().substring(0, 10).replaceAll("-", "");
    const futureValid = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    )
      .toISOString()
      .substring(0, 10)
      .replaceAll("-", "");

    if (!value) {
      alert("정확한 날짜를 입력바랍니다.");
      event.target.value = new Date().toISOString().substring(0, 10);
      event.target.focus();
    } else if (value < today) {
      alert("입주가능일은 과거일 수 없습니다.\n다시 입력해주세요.");
      event.target.value = new Date().toISOString().substring(0, 10);
      event.target.focus();
    } else if (value > futureValid) {
      alert(
        "입주가능일은 등록일 기준 1년 이내여야 합니다.\n다시 입력해주세요."
      );
      event.target.value = new Date().toISOString().substring(0, 10);
      event.target.focus();
    }
  };

  const inputNumVaild = (event, dotValid) => {
    const data = event.target.value;
    const valid = /^[0-9]$/;

    if (data.length > 7) {
      event.target.value = data.substring(0, 7);
      return;
    }

    let result = "";
    let dotChk = false;
    let dotCnt = 0;

    if (+data[0] === 0 || data[0] === ".") {
      event.target.value = null;
      return;
    }

    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      if (valid.test(element)) {
        if (dotChk && dotCnt < dotValid) {
          dotCnt++;
        } else if (dotChk) {
          break;
        }
        result += element;
      } else {
        if (dotValid !== 0 && !dotChk && element === ".") {
          result += element;
          dotChk = true;
        } else {
          break;
        }
      }
    }

    event.target.value = result;
  };

  useEffect(() => {
    buildingName.current.value = getLoaderData.house.buildingName;
    deposit.current.value = getLoaderData.deposit
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    description.current.value = getLoaderData.description;
    itemNo.value = getLoaderData.itemNo;
    maintenanceFee.current.value = getLoaderData.maintenanceFee
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    moveInDate.current.value = getLoaderData.moveInDate;
    rent.current.value = getLoaderData.rent
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    address.current.value = getLoaderData.house.address;
    addressDetail.current.value = getLoaderData.house.addressDetail;
    bathroom.current.value = getLoaderData.house.bathroom
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    completionYear.current.value = getLoaderData.house.completionYear;
    exclusivePrivateArea.current.value =
      getLoaderData.house.exclusivePrivateArea
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    floor.current.value = getLoaderData.house.floor
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    contracted.current.value = getLoaderData.house.contracted;
    purpose.current.value = getLoaderData.house.purpose;
    room.current.value = getLoaderData.house.room
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    supplyArea.current.value = getLoaderData.house.supplyArea
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    totalFloor.current.value = getLoaderData.house.totalFloor
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    dong.value = getLoaderData.house.dong;
    gugun.value = getLoaderData.house.gugun;
    houseNo.value = getLoaderData.house.houseNo;
    regionCode.value = getLoaderData.house.regionCode;
    sido.value = getLoaderData.house.sido;

    airConditioner.current.checked = getLoaderData.itemOption.airConditioner;
    bathtub.current.checked = getLoaderData.itemOption.bathtub;
    bed.current.checked = getLoaderData.itemOption.bed;
    bidet.current.checked = getLoaderData.itemOption.bidet;
    cctv.current.checked = getLoaderData.itemOption.cctv;
    closet.current.checked = getLoaderData.itemOption.closet;
    desk.current.checked = getLoaderData.itemOption.desk;
    diningTable.current.checked = getLoaderData.itemOption.diningTable;
    dishwasher.current.checked = getLoaderData.itemOption.dishwasher;
    dryingMachine.current.checked = getLoaderData.itemOption.dryingMachine;
    elevator.current.checked = getLoaderData.itemOption.elevator;
    fireAlarm.current.checked = getLoaderData.itemOption.fireAlarm;
    garden.current.checked = getLoaderData.itemOption.garden;
    gasStove.current.checked = getLoaderData.itemOption.gasStove;
    guard.current.checked = getLoaderData.itemOption.guard;
    inductionCooktop.current.checked =
      getLoaderData.itemOption.inductionCooktop;
    intercom.current.checked = getLoaderData.itemOption.intercom;
    keycard.current.checked = getLoaderData.itemOption.keycard;
    microwave.current.checked = getLoaderData.itemOption.microwave;
    oven.current.checked = getLoaderData.itemOption.oven;
    parkingLot.current.checked = getLoaderData.itemOption.parkingLot;
    refrigerator.current.checked = getLoaderData.itemOption.refrigerator;
    shoeRack.current.checked = getLoaderData.itemOption.shoeRack;
    sink.current.checked = getLoaderData.itemOption.sink;
    sofa.current.checked = getLoaderData.itemOption.sofa;
    terrace.current.checked = getLoaderData.itemOption.terrace;
    veranda.current.checked = getLoaderData.itemOption.veranda;
    washingMachine.current.checked = getLoaderData.itemOption.washingMachine;

    document.getElementById(direction).checked = true;
    document.getElementById(entrance).checked = true;
    document.getElementById(heating).checked = true;
  }, []);

  return (
    <>
      <form className={classes.houseModify}>
        <div className={classes.modifyFieldSet}>
          <h1>매물 정보 수정</h1>
          <div className={classes.modifyDescription}>
            <div className={classes.descIcon}>
              <BsFillExclamationCircleFill className={classes.icon} />
            </div>
            <div className={classes.descText}>
              <p>
                ㆍ 수정하신 방은 방 정보와 계정 정보&#40;가입된 아이디, 이름,
                연락처 정보 등&#41;가 함께 노출됩니다.
              </p>
              <p>
                ㆍ 허위 매물&#40;계약이 완료된 매물, 허위 정보가 기재된
                매물&#41; 등록 시 서비스 이용이 제한될 수 있습니다.
              </p>
            </div>
          </div>
          <div className={classes.formInner}>
            <div className={classes.defaultInfo}>
              <h2>기본 정보</h2>
              <table>
                <tbody>
                  <tr>
                    <td className={classes.infoTitle}>
                      <h3>주소</h3>
                    </td>
                    <td>
                      <div>
                        <input
                          type="text"
                          ref={address}
                          id="roadAddress"
                          className={classes.mainAddress}
                          disabled
                        />
                      </div>
                      <input
                        type="text"
                        ref={addressDetail}
                        id="detailAddress"
                        className={classes.subAddress}
                        disabled
                      />
                      <input
                        type="text"
                        ref={buildingName}
                        id="buildingName"
                        className={classes.buildingName}
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.infoTitle}>
                      <h3>가격 정보</h3>
                    </td>
                    <td>
                      <label htmlFor="deposit">보증금</label>
                      <div className={classes.unitInput}>
                        <input
                          type="text"
                          id="deposit"
                          placeholder="(예시)  300"
                          ref={deposit}
                          onBlur={inputNumBlurHandler}
                          onFocus={inputNumFocusHandler}
                          onChange={(event) => inputNumVaild(event, 0)}
                        />
                        <p>만원</p>
                      </div>
                      <label htmlFor="rent">월세</label>
                      <div className={classes.unitInput}>
                        <input
                          type="text"
                          id="rent"
                          placeholder="(예시)  50"
                          ref={rent}
                          onBlur={inputNumBlurHandler}
                          onFocus={inputNumFocusHandler}
                          onChange={(event) => inputNumVaild(event, 0)}
                        />
                        <p>만원</p>
                      </div>
                      <label htmlFor="maintenanceFee">관리비</label>
                      <div className={classes.unitInput}>
                        <input
                          type="text"
                          id="maintenanceFee"
                          placeholder="(예시)  5"
                          ref={maintenanceFee}
                          onBlur={inputNumBlurHandler}
                          onFocus={inputNumFocusHandler}
                          onChange={(event) => inputNumVaild(event, 0)}
                        />
                        <p>만원</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.infoTitle}>
                      <h3>방 개수</h3>
                    </td>
                    <td>
                      <label>방</label>
                      <div className={classes.unitInput}>
                        <input type="text" id="room" ref={room} disabled />
                        <p>개</p>
                      </div>
                      <label>욕실</label>
                      <div className={classes.unitInput}>
                        <input
                          type="text"
                          id="bathroom"
                          ref={bathroom}
                          disabled
                        />
                        <p>개</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.infoTitle}>
                      <h3>층 수</h3>
                    </td>
                    <td>
                      <label htmlFor="floor">해당층</label>
                      <div className={classes.unitInput}>
                        <input type="text" id="floor" ref={floor} disabled />
                        <p>층</p>
                      </div>
                      <label htmlFor="totalFloor">전체층</label>
                      <div className={classes.unitInput}>
                        <input
                          type="text"
                          id="totalFloor"
                          ref={totalFloor}
                          disabled
                        />
                        <p>층</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.infoTitle}>
                      <h3>평수</h3>
                    </td>
                    <td>
                      <label htmlFor="supplyArea">공급면적</label>
                      <div className={classes.unitInput}>
                        <input
                          type="text"
                          id="supplyArea"
                          ref={supplyArea}
                          disabled
                        />
                        <p>㎡</p>
                      </div>
                      <label htmlFor="exclusivePrivateArea">전용면적</label>
                      <div className={classes.unitInput}>
                        <input
                          type="text"
                          id="exclusivePrivateArea"
                          ref={exclusivePrivateArea}
                          disabled
                        />
                        <p>㎡</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.infoTitle}>
                      <h3>준공년도</h3>
                    </td>
                    <td>
                      <label htmlFor="completionYear">준공년도</label>
                      <div className={classes.unitInput}>
                        <input
                          type="text"
                          id="completionYear"
                          ref={completionYear}
                          maxLength={4}
                          disabled
                        />
                        <p>년</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.infoTitle}>
                      <h3>건축물 용도</h3>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="purpose"
                        placeholder="(예시)  공동주택"
                        ref={purpose}
                        className={classes.purpose}
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.infoTitle}>
                      <h3>계약 여부</h3>
                    </td>
                    <td className={classes.constract}>
                      <input
                        type="checkbox"
                        id="contractStatus"
                        ref={contracted}
                      />
                      <label htmlFor="contractStatus">계약 완료</label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={classes.additionalInfo}>
              <h2>추가 정보</h2>
              <table>
                <tbody>
                  <tr>
                    <td className={classes.infoTitle}>
                      <h3>방향</h3>
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="direction"
                        onChange={(event) => {
                          setDirection(event.target.value);
                        }}
                        value="EAST"
                        id="EAST"
                      />
                      <label htmlFor="EAST">동</label>
                      <input
                        type="radio"
                        name="direction"
                        onChange={(event) => {
                          setDirection(event.target.value);
                        }}
                        value="WEST"
                        id="WEST"
                      />
                      <label htmlFor="WEST">서</label>
                      <input
                        type="radio"
                        name="direction"
                        onChange={(event) => {
                          setDirection(event.target.value);
                        }}
                        value="SOUTH"
                        id="SOUTH"
                      />
                      <label htmlFor="SOUTH">남</label>
                      <input
                        type="radio"
                        name="direction"
                        onChange={(event) => {
                          setDirection(event.target.value);
                        }}
                        value="NORTH"
                        id="NORTH"
                      />
                      <label htmlFor="NORTH">북</label>
                      <input
                        type="radio"
                        name="direction"
                        onChange={(event) => {
                          setDirection(event.target.value);
                        }}
                        value="SOUTH_EAST"
                        id="SOUTH_EAST"
                      />
                      <label htmlFor="SOUTH_EAST">남동</label>
                      <input
                        type="radio"
                        name="direction"
                        onChange={(event) => {
                          setDirection(event.target.value);
                        }}
                        value="SOUTH_WEST"
                        id="SOUTH_WEST"
                      />
                      <label htmlFor="SOUTH_WEST">남서</label>
                      <input
                        type="radio"
                        name="direction"
                        onChange={(event) => {
                          setDirection(event.target.value);
                        }}
                        value="NORTH_EAST"
                        id="NORTH_EAST"
                      />
                      <label htmlFor="NORTH_EAST">북동</label>
                      <input
                        type="radio"
                        name="direction"
                        onChange={(event) => {
                          setDirection(event.target.value);
                        }}
                        value="NORTH_WEST"
                        id="NORTH_WEST"
                      />
                      <label htmlFor="NORTH_WEST">북서</label>
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.infoTitle}>
                      <h3>현관구조</h3>
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="entrance"
                        onChange={(event) => {
                          setEntrance(event.target.value);
                        }}
                        id="STAIR"
                        value="STAIR"
                      />
                      <label htmlFor="STAIR">계단식</label>
                      <input
                        type="radio"
                        name="entrance"
                        onChange={(event) => {
                          setEntrance(event.target.value);
                        }}
                        id="PASSAGE"
                        value="PASSAGE"
                      />
                      <label htmlFor="PASSAGE">복도식</label>
                      <input
                        type="radio"
                        name="entrance"
                        onChange={(event) => {
                          setEntrance(event.target.value);
                        }}
                        id="COMPLEX"
                        value="COMPLEX"
                      />
                      <label htmlFor="COMPLEX">복합식</label>
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.infoTitle}>
                      <h3>난방방식</h3>
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="heating"
                        onChange={(event) => {
                          setHeating(event.target.value);
                        }}
                        id="INDIVIDUAl"
                        value="INDIVIDUAl"
                      />
                      <label htmlFor="INDIVIDUAl">개별난방</label>
                      <input
                        type="radio"
                        name="heating"
                        onChange={(event) => {
                          setHeating(event.target.value);
                        }}
                        id="CENTERAL"
                        value="CENTERAL"
                      />
                      <label htmlFor="CENTERAL">중앙난방</label>
                      <input
                        type="radio"
                        name="heating"
                        onChange={(event) => {
                          setHeating(event.target.value);
                        }}
                        id="DISTRICT"
                        value="DISTRICT"
                      />
                      <label htmlFor="DISTRICT">지역난방</label>
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.infoTitle}>
                      <h3>입주가능일</h3>
                    </td>
                    <td>
                      <div className={classes.dateInput}>
                        <div>
                          <label
                            className={classes.calendar}
                            htmlFor="moveInDate"
                          >
                            <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0.25 3.875C0.25 2.97754 0.977537 2.25 1.875 2.25H18.125C19.0225 2.25 19.75 2.97754 19.75 3.875V20.125C19.75 21.0225 19.0225 21.75 18.125 21.75H1.875C0.977537 21.75 0.25 21.0225 0.25 20.125V3.875ZM18.125 3.875H1.875V20.125H18.125V3.875Z"
                                fill="#BBBBBB"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M14.875 0.625C15.3237 0.625 15.6875 0.988769 15.6875 1.4375V4.6875C15.6875 5.13623 15.3237 5.5 14.875 5.5C14.4263 5.5 14.0625 5.13623 14.0625 4.6875V1.4375C14.0625 0.988769 14.4263 0.625 14.875 0.625Z"
                                fill="#BBBBBB"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.125 0.625C5.57373 0.625 5.9375 0.988769 5.9375 1.4375V4.6875C5.9375 5.13623 5.57373 5.5 5.125 5.5C4.67627 5.5 4.3125 5.13623 4.3125 4.6875V1.4375C4.3125 0.988769 4.67627 0.625 5.125 0.625Z"
                                fill="#BBBBBB"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0.25 7.9375C0.25 7.48877 0.613769 7.125 1.0625 7.125H18.9375C19.3862 7.125 19.75 7.48877 19.75 7.9375C19.75 8.38623 19.3862 8.75 18.9375 8.75H1.0625C0.613769 8.75 0.25 8.38623 0.25 7.9375Z"
                                fill="#BBBBBB"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M14.2476 11.4428C14.5553 11.7694 14.54 12.2836 14.2134 12.5914L9.47046 17.0601C9.15674 17.3557 8.66681 17.3549 8.3541 17.0582L5.78457 14.6207C5.45902 14.3119 5.44546 13.7976 5.75428 13.4721C6.06311 13.1465 6.57738 13.133 6.90293 13.4418L8.91518 15.3506L13.0991 11.4086C13.4257 11.1009 13.9399 11.1162 14.2476 11.4428Z"
                                fill="#BBBBBB"
                              />
                            </svg>
                          </label>
                        </div>
                        <input
                          type="date"
                          id="moveInDate"
                          ref={moveInDate}
                          defaultValue={new Date()
                            .toISOString()
                            .substring(0, 10)}
                          onBlur={dateValidHandler}
                        />
                        <p>
                          <span>*</span> 즉시입주나 협의가능 등 입주가능일 관련
                          내용은 상세 설명에 작성바랍니다.
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr className={classes.optionRow}>
                    <td className={classes.infoTitle}>
                      <h3>옵션</h3>
                    </td>
                    <td className={classes.optionBox}>
                      <input type="checkbox" id="bed" ref={bed} />
                      <label htmlFor="bed">침대</label>
                      <input
                        type="checkbox"
                        id="washingMachine"
                        ref={washingMachine}
                      />
                      <label htmlFor="washingMachine">세탁기</label>
                      <input
                        type="checkbox"
                        id="airConditioner"
                        ref={airConditioner}
                      />
                      <label htmlFor="airConditioner">에어컨</label>
                      <input type="checkbox" id="desk" ref={desk} />
                      <label htmlFor="desk">책상</label>
                      <input type="checkbox" id="closet" ref={closet} />
                      <label htmlFor="closet">옷장</label>
                      <input type="checkbox" id="sink" ref={sink} />
                      <label htmlFor="sink">싱크대</label>
                      <input
                        type="checkbox"
                        id="diningTable"
                        ref={diningTable}
                      />
                      <label htmlFor="diningTable">식탁</label>
                      <input type="checkbox" id="sofa" ref={sofa} />
                      <label htmlFor="sofa">소파</label>
                      <input type="checkbox" id="shoeRack" ref={shoeRack} />
                      <label htmlFor="shoeRack">신발장</label>
                      <input
                        type="checkbox"
                        id="refrigerator"
                        ref={refrigerator}
                      />
                      <label htmlFor="refrigerator">냉장고</label>
                      <input
                        type="checkbox"
                        id="dryingMachine"
                        ref={dryingMachine}
                      />
                      <label htmlFor="dryingMachine">건조기</label>
                      <input type="checkbox" id="bathtub" ref={bathtub} />
                      <label htmlFor="bathtub">욕조</label>
                      <input type="checkbox" id="bidet" ref={bidet} />
                      <label htmlFor="bidet">비데</label>
                      <input type="checkbox" id="dishwasher" ref={dishwasher} />
                      <label htmlFor="dishwasher">식기세척기</label>
                      <input type="checkbox" id="gasStove" ref={gasStove} />
                      <label htmlFor="gasStove">가스레인지</label>
                      <input
                        type="checkbox"
                        id="inductionCooktop"
                        ref={inductionCooktop}
                      />
                      <label htmlFor="inductionCooktop">인덕션</label>
                      <input type="checkbox" id="microwave" ref={microwave} />
                      <label htmlFor="microwave">전자레인지</label>
                      <input type="checkbox" id="oven" ref={oven} />
                      <label htmlFor="oven">오븐</label>
                    </td>
                  </tr>
                  <tr className={classes.optionRow}>
                    <td className={classes.infoTitle}>
                      <h3>보안 시설</h3>
                    </td>
                    <td className={classes.optionBox}>
                      <input type="checkbox" id="guard" ref={guard} />
                      <label htmlFor="guard">경비원</label>
                      <input type="checkbox" id="cctv" ref={cctv} />
                      <label htmlFor="cctv">CCTV</label>
                      <input type="checkbox" id="intercom" ref={intercom} />
                      <label htmlFor="intercom">인터폰</label>
                      <input type="checkbox" id="keycard" ref={keycard} />
                      <label htmlFor="keycard">카드키</label>
                    </td>
                  </tr>
                  <tr className={classes.optionRow}>
                    <td className={classes.infoTitle}>
                      <h3>기타 시설</h3>
                    </td>
                    <td className={classes.optionBox}>
                      <input type="checkbox" id="elevator" ref={elevator} />
                      <label htmlFor="elevator">엘리베이터</label>
                      <input type="checkbox" id="fireAlarm" ref={fireAlarm} />
                      <label htmlFor="fireAlarm">화재경보기</label>
                      <input type="checkbox" id="veranda" ref={veranda} />
                      <label htmlFor="veranda">베란다</label>
                      <input type="checkbox" id="terrace" ref={terrace} />
                      <label htmlFor="terrace">테라스</label>
                      <input type="checkbox" id="garden" ref={garden} />
                      <label htmlFor="garden">마당</label>
                      <input type="checkbox" id="parkingLot" ref={parkingLot} />
                      <label htmlFor="parkingLot">주차장</label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={classes.detailInfo}>
              <h2>상세 정보</h2>
              <table>
                <tbody>
                  <tr>
                    <td className={classes.deatailDesc}>
                      <p>
                        * 해당 방에 대한 자세한 설명을 입력해주세요. ex&#40; 방
                        구조, 교통, 편의 시설 등 구체적인 방 정보
                      </p>
                      <p>
                        * 방 정보, 가격 및 입주일 협의 여부, 교통 등 자세한
                        내용을 작성하시면 거래가 성사될 가능성이 높습니다.
                      </p>
                      <p>
                        * 한글, 영어, 숫자 ㎡을 제외한 특수문자(괄호포함)는
                        입력할 수 없습니다.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.infoTitle}>
                      <h3>상세설명</h3>
                    </td>
                    <td>
                      <textarea
                        className={classes.detailDescInput}
                        ref={description}
                        placeholder="방 구조, 교통, 주변 편의시설 등 구체적인 방 정보를 작성해 주세요."
                      ></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={classes.houseImage}>
              <h2>사진 등록</h2>
              <table>
                <tbody>
                  <tr>
                    <td className={classes.imageDesc}>
                      <p>
                        * 최소 5장 이상의 사진을 등록해야 하며 최대 10장까지
                        등록이 가능합니다. (한 장당 10MB 이내)
                      </p>
                      <p>
                        * 첫번째 사진이 대표 이미지로 보여지며 순서를 변경할 수
                        있습니다.
                      </p>
                      <p>
                        * 워터마크, 상호, 전화번호 등이 포함된 사진이나 관련
                        없는 사진을 등록할 경우 서비스 이용이 제한됩니다.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.infoTitle}>
                      <h3>사진 추가</h3>
                    </td>
                    <td className={classes.imagePreview}>
                      <ImageInput
                        setImage={setImageHandler}
                        maxFileNum={10}
                        maxFileSize={10}
                        isPreview={true}
                        loadedImages={loadedImages}
                        setLoadedImages={setLoadedImageHandler}
                        addButton={
                          <div className={classes.addButton}>
                            <p className={classes.plus}>+</p>
                            <p>사진 추가</p>
                          </div>
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={classes.modifyBtn}>
            <button type="button" onClick={modifyHouseInfo}>
              수정
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default HouseModify;

export const loader = async ({ params }) => {
  const itemNo = params.itemNo;

  const result = await getHouseByItemNo(itemNo);

  return result;
};
