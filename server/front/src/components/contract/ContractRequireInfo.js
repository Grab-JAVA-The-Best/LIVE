import { useRef } from "react";
import classes from "./ContractRequireInfo.module.scss";

const ContractRequireInfo = (props) => {
  const formData = useRef();
  const insertRequireInfo = (e) => {
    e.preventDefault();
    const requireInfo = {
      numberOfResidents: formData.current.usernumberOfResidents.value,
      specialContract: formData.current.userSpecialContract.value,
    };
    props.fx(requireInfo);
  };
  return (
    <form ref={formData}>
      <div className={classes.requireInfo}>
        <div className={classes.inner}>
          <div className={classes.requireInfoContent}>
            <h2>요청 정보</h2>
            <div className={classes.resident}>
              <strong>거주인원</strong>{" "}
              <input
                type="number"
                placeholder="거주 인원을 선택해주세요."
                id="usernumberOfResidents"
                name="usernumberOfResidents"
                onChange={insertRequireInfo}
              />
            </div>
            <div className={classes.requirement}>
              <strong>특약 요청사항</strong>{" "}
              <textarea
                placeholder="위의 조건 외 특약사항으로 요청하고 싶으신 내용을 입력해주세요.&#13;요청하고 싶으신 내용이 없을 시, '없음'으로 입력해주세요."
                id="userSpecialContract"
                name="userSpecialContract"
                onChange={insertRequireInfo}
              />
            </div>
          </div>
          <hr />
        </div>
      </div>
    </form>
  );
};

export default ContractRequireInfo;

export const ContractRequireInfoDetailuser = (props) => {
  const contractInfo = {
    numberOfResidents: props.contractInfoList.numberOfResidents,
    specialContract: props.contractInfoList.specialContract,
  };

  return (
    <form>
      <div className={classes.requireInfo}>
        <div className={classes.inner}>
          <div className={classes.requireInfoContent}>
            <h2>요청 정보</h2>
            <div className={classes.resident}>
              <strong>거주인원</strong>{" "}
              <input
                defaultValue={contractInfo.numberOfResidents + "명"}
                readOnly
              />
            </div>
            <div className={classes.requirement}>
              <strong>특약 요청사항</strong>{" "}
              <textarea defaultValue={contractInfo.specialContract} readOnly />
            </div>
          </div>
          <hr />
        </div>
      </div>
    </form>
  );
};

export const ContractRequireInfoDetailRealtor = (props) => {
  const formData = useRef();
  const contractInfo = {
    numberOfResidents: props.contractInfoList.numberOfResidents,
    specialContract: props.contractInfoList.specialContract,
  };

  const insertRequireInfo = (e) => {
    e.preventDefault();
    const requireInfo = {
      specialContract: formData.current.userSpecialContract.value,
    };
    props.fx(requireInfo);
  };

  return (
    <form ref={formData}>
      <div className={classes.requireInfo}>
        <div className={classes.inner}>
          <div className={classes.requireInfoContent}>
            <h2>요청 정보</h2>
            <p>* 은 필수 입력값입니다!</p>
            <br />
            <div className={classes.resident}>
              <strong>거주인원</strong>{" "}
              <input
                defaultValue={contractInfo.numberOfResidents + "명"}
                readOnly
              />
            </div>
            <div className={classes.requirement}>
              <strong>* 특약 요청사항</strong>{" "}
              <textarea
                placeholder={contractInfo.specialContract}
                id="userSpecialContract"
                name="userSpecialContract"
                onChange={insertRequireInfo}
              />
            </div>
          </div>
          <hr />
        </div>
      </div>
    </form>
  );
};
