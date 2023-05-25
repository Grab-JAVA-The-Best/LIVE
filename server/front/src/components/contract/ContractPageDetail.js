import classes from "./ContractPageDetail.module.scss";
import { useState } from "react";
import ContractInfo from "./ContractInfo";
import { ContractForSaleDetailUser } from "./ContractForSale";
import { ContractForSaleDetailRealtor } from "./ContractForSale";
import { ContractRequireInfoDetailuser } from "./ContractRequireInfo";
import { ContractRequireInfoDetailRealtor } from "./ContractRequireInfo";
import { ContractTenantDetailInfo } from "./ContractTenantInfo";
import { ContractExpectedCostDetailUser } from "./ContractExpectedCost";
import { ContractExpectedCostDetailRealtor } from "./ContractExpectedCost";
import { getContractInfoByContractNo } from "../../apis/ContractApis";
import { useLoaderData } from "react-router-dom";
import { useAuth } from "../common/AuthProtector";

const ContractPageDetail = () => {
  const data = useLoaderData();

  const { userInfo } = useAuth();

  const [forSaleInfo, setForSaleInfo] = useState({
    deposit: "",
    rent: "",
    maintenanceFee: "",
    termOfContract: "",
    moveOnDate: "",
  });

  const [requireInfo, setRequireInfo] = useState({
    specialContract: "",
  });

  const [expectedCostInfo, setExpectedCostInfo] = useState({
    commission: "",
  });

  const passInfo = {
    itemNo: data.data.contractInfo.contractNo,
    deposit: forSaleInfo.deposit,
    rent: forSaleInfo.rent,
    maintenanceFee: forSaleInfo.maintenanceFee,
    termOfContract: forSaleInfo.termOfContract,
    moveOnDate: forSaleInfo.moveOnDate,
    specialContract: requireInfo.specialContract,
    commission: expectedCostInfo.commission,
  };

  const contractInfo = {
    itemNo: data.data.contractInfo.contractNo,
  };

  return (
    <>
      <section>
        <ContractInfo realtorInfoList={data.data.realtorInfo} />
      </section>
      <section>
        {userInfo.isRealtor === false ? (
          <ContractForSaleDetailUser
            itemInfoList={data.data.itemInfo}
            contractInfoList={data.data.contractInfo}
          />
        ) : (
          <ContractForSaleDetailRealtor
            fx={setForSaleInfo}
            itemInfoList={data.data.itemInfo}
            contractInfoList={data.data.contractInfo}
          />
        )}
      </section>
      <section>
        <ContractTenantDetailInfo
          userInfoList={data.data.userInfo}
          contractInfoList={data.data.contractInfo}
        />
      </section>
      <section>
        {userInfo.isRealtor === false ? (
          <ContractRequireInfoDetailuser
            contractInfoList={data.data.contractInfo}
          />
        ) : (
          <ContractRequireInfoDetailRealtor
            contractInfoList={data.data.contractInfo}
            fx={setRequireInfo}
          />
        )}
      </section>
      <section>
        {userInfo.isRealtor === false ? (
          <ContractExpectedCostDetailUser
            contractInfoList={data.data.contractInfo}
            contractInfo={contractInfo}
          />
        ) : (
          <ContractExpectedCostDetailRealtor
            contractInfoList={data.data.contractInfo}
            forSaleInfo={forSaleInfo}
            passInfo={passInfo}
          />
        )}
      </section>
    </>
  );
};

export const loader = async ({ params }) => {
  const itemNo = params.contractNo;
  const result = await getContractInfoByContractNo(itemNo);

  return result;
};

export default ContractPageDetail;
