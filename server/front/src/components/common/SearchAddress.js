/**
 * 주소 검색(SearchAddress) 컴포넌트
 *
 * props
 *  - onChange(), 주소를 반환받을 함수
 *  - onClose(), 완료 후 모달 창 닫는 함수
 */

import DaumPostcode from "react-daum-postcode";
import classes from "./SearchAddress.module.scss";
import Logo from "../../assets/image/liveLogo.png";

const SearchAddress = (props) => {
  const PostHandler = (data) => {
    let roadAddr = data.roadAddress;
    let extraRoadAddr = "";
    let roadAddress = "";
    let extraAddress = "";

    if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
      extraRoadAddr += data.bname;
    }

    if (data.buildingName !== "" && data.apartment === "Y") {
      extraRoadAddr +=
        extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
    }

    if (extraRoadAddr !== "") {
      extraRoadAddr = " (" + extraRoadAddr + ")";
    }

    roadAddress = data.roadAddress;

    if (roadAddr !== "") {
      extraAddress = extraRoadAddr;
    } else {
      extraAddress = "";
    }

    if (data.autoRoadAddress) {
      let expRoadAddr = data.autoRoadAddress + extraRoadAddr;
      roadAddress = expRoadAddr;
    }

    const addressInfo = {
      address: roadAddress,
      addressDetail: extraAddress,
      sido: data.sido,
      gugun: data.sigungu,
      dong: data.bname,
      zipcode: data.zonecode,
      regionCode: data.bcode,
    };

    props.onChange(addressInfo);

    props.onClose();
  };

  return (
    <div className={classes.addressContent}>
      <header>
        <img src={Logo} alt="Live Logo" />
        <button>
          <strong onClick={props.onClose}>✖</strong>
        </button>
      </header>
      <div>
        <DaumPostcode onComplete={PostHandler} classNam />
      </div>
    </div>
  );
};

export default SearchAddress;
