import { useState, useRef } from "react";
import classes from "./ContractTenantInfo.module.scss";
import Modal from "../../UI/Modal";
import SearchAddress from "../common/SearchAddress";

const ContractTenantInfo = (props) => {
  const [SearchAddressModal, setSearchAddressModal] = useState(false);
  const UserInfo = {
    userName: props.userInfoList.name,
    userPhone: props.userInfoList.phone,
    userGender: props.userInfoList.gender,
  };

  const formData = useRef();

  const searchAddressModalHandler = () => {
    if (SearchAddressModal === false) {
      setSearchAddressModal(true);
      return;
    }
    setSearchAddressModal(false);
  };

  const setAddressInfoHandler = (addressInfo) => {
    formData.current.address.value = addressInfo.address;
    formData.current.addressDetail.value = addressInfo.addressDetail;
  };

  const searchAddressHandler = () => {
    formData.current.address.value = null;
    formData.current.addressDetail.value = null;

    searchAddressModalHandler();
  };

  const insertTenantInfo = (e) => {
    e.preventDefault();

    const tenantInfo = {
      address: formData.current.address.value,
      addressDetail: formData.current.addressDetail.value,
      age: formData.current.age.value,
    };

    props.fx(tenantInfo);
  };

  return (
    <>
      {SearchAddressModal && (
        <Modal onConfirm={searchAddressModalHandler}>
          <SearchAddress
            onChange={setAddressInfoHandler}
            onClose={searchAddressModalHandler}
          />
        </Modal>
      )}
      <form ref={formData}>
        <div className={classes.tenantInfo}>
          <div className={classes.inner}>
            <div className={classes.tenantInfoContent}>
              <h2>입주자 정보</h2>
              <br />
              <div className={classes.infoBoxList}>
                <div className={classes.contractor}>
                  <strong>계약자명</strong>{" "}
                  <input defaultValue={UserInfo.userName} />
                </div>
                <div className={classes.contractorPhone}>
                  <strong>전화번호</strong>{" "}
                  <input defaultValue={UserInfo.userPhone}></input>
                </div>
                <div className={classes.contractorGender}>
                  <strong>성별</strong>{" "}
                  <input defaultValue={UserInfo.userGender} />
                </div>
                <div className={classes.contractorAddress}>
                  <strong>실거주주소</strong>{" "}
                  <div className={classes.searchAddressBox}>
                    <div className={classes.searchAddress}>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        onChange={insertTenantInfo}
                      ></input>
                      <button type="button" onClick={searchAddressHandler}>
                        주소 검색
                      </button>
                    </div>
                    <div className={classes.detailAdress}>
                      <label htmlFor="detailAddress"></label>
                      <input
                        placeholder="상세주소를 입력해주세요"
                        type="text"
                        id="addressDetail"
                        name="addressDetail"
                        onChange={insertTenantInfo}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className={classes.contractorAge}>
                  <strong>나이</strong>{" "}
                  <input
                    type="number"
                    id="age"
                    name="age"
                    onChange={insertTenantInfo}
                  ></input>
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

export default ContractTenantInfo;

export const ContractTenantDetailInfo = (props) => {
  const UserInfo = {
    userName: props.userInfoList.name,
    userPhone: props.userInfoList.phone,
    userGender: props.userInfoList.gender,
    userAddress: props.contractInfoList.tenantAddress,
    userDetailAddress: props.contractInfoList.tenantDetailAddress,
    userAge: props.contractInfoList.tenantAge,
  };

  return (
    <>
      <form>
        <div className={classes.tenantInfo}>
          <div className={classes.inner}>
            <h2>입주자 정보</h2>
            <div className={classes.tenantInfoContent}>
              <br />
              <div className={classes.infoBoxList}>
                <div className={classes.contractor}>
                  <strong>계약자명</strong>{" "}
                  <input defaultValue={UserInfo.userName} readOnly />
                </div>
                <div className={classes.contractorPhone}>
                  <strong>전화번호</strong>{" "}
                  <input defaultValue={UserInfo.userPhone} readOnly></input>
                </div>
                <div className={classes.contractorGender}>
                  <strong>성별</strong>{" "}
                  <input defaultValue={UserInfo.userGender} readOnly />
                </div>
                <div className={classes.contractorAddress}>
                  <strong>실거주주소</strong>{" "}
                  <div className={classes.searchAddressBox}>
                    <div className={classes.searchAddress}>
                      <input
                        defaultValue={UserInfo.userAddress}
                        readOnly
                      ></input>
                    </div>
                    <div className={classes.detailAdress}>
                      <input
                        defaultValue={UserInfo.userDetailAddress}
                        readOnly
                      ></input>
                    </div>
                  </div>
                </div>
                <div className={classes.contractorAge}>
                  <strong>나이</strong>{" "}
                  <input defaultValue={UserInfo.userAge} readOnly></input>
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
