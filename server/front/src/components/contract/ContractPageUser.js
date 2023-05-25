import { useEffect, useState, useRef } from "react";
import ContractInfo from "./ContractInfo";
import ContractForSale from "./ContractForSale";
import ContractTenantInfo from "./ContractTenantInfo";
import ContractRequireInfo from "./ContractRequireInfo";
import ContractExpectedCost from "./ContractExpectedCost";
import { getContractInfoByItemNo } from "../../apis/ContractApis";
import { useLoaderData } from "react-router-dom";

const ContractPageUser = () => {
  const data = useLoaderData();

  const [forSaleInfo, setForSaleInfo] = useState({
    userTermOfContract: "",
    userMoveOnDate: "",
  });

  const [tenantInfo, setTeanatInfo] = useState({
    address: "",
    addressDetail: "",
    age: 0,
  });

  const [requireInfo, setRequireInfo] = useState({
    numberOfResidents: "",
    specialContract: "",
  });

  const passInfo = {
    userTermOfContract: Number(forSaleInfo.userTermOfContract),
    userMoveOnDate: forSaleInfo.userMoveOnDate,
    address: tenantInfo.address,
    addressDetail: tenantInfo.addressDetail,
    age: Number(tenantInfo.age),
    numberOfResidents: Number(requireInfo.numberOfResidents),
    specialContract: requireInfo.specialContract,
    deposit: data.data.itemInfo.deposit,
    rent: data.data.itemInfo.rent,
    realtorNo: data.data.realtorInfo.realtorNo,
    userNo: data.data.userInfo.userNo,
    itemNo: data.data.itemInfo.itemNo,
  };

  return (
    <>
      <section>
        <ContractInfo realtorInfoList={data.data.realtorInfo} />
      </section>
      <section>
        <ContractForSale
          itemInfoList={data.data.itemInfo}
          fx={setForSaleInfo}
        />
      </section>
      <section>
        <ContractTenantInfo
          userInfoList={data.data.userInfo}
          fx={setTeanatInfo}
        />
      </section>
      <section>
        <ContractRequireInfo fx={setRequireInfo} />
      </section>
      <section>
        <ContractExpectedCost passInfo={passInfo} />
      </section>
    </>
  );
};

export const loader = async ({ params }) => {
  const itemNo = params.itemNo;
  const result = await getContractInfoByItemNo(itemNo);

  return result;
};

export default ContractPageUser;
