import classes from "./ContractModalOveraly.module.scss";

const ContractModalOverlay = (props) => {
  const onConfirmHandler = async () => {
    try {
      const result = await axiosInstance.patch(
        `contracts/${props.passInfo.itemNo}/${2}`,
        {
          headers: {
            Authorization: getAuthHeader().Authorization,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const modalStateChangeHandler = () => {
    props.onModalStateChange();
  };

  return (
    <>
      <div>계약 내용이 실제 계약 내용과 동일한가요?</div>
      <div>
        실제 계약과 다를 시 불이익이 있을 수 있습니다. 내용 수정 후 계약 체결
        버튼을 눌러주세요
      </div>
      <div>
        <button onClick={onConfirmHandler}>계약 완료</button>
        <button onClick={modalStateChangeHandler}>뒤로 가기</button>
      </div>
    </>
  );
};

export default ContractModalOverlay;
