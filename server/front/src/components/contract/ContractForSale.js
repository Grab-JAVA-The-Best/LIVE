import { useState } from "react";
import classes from "./ContractForSale.module.scss";
import { ContractHouseCardContent } from "../HouseCardContent";
import { ContractDetailUserCardContent } from "../HouseCardContent";
import { ContractDetailRealtorCardContent } from "../HouseCardContent";

const ContractForSale = (props) => {
  const ContractInfo = {
    houseNumber: props.itemInfoList.itemNo,
    houseName: props.itemInfoList.buildingName,
    houseAddress: props.itemInfoList.address,
    houseSupplyArea: props.itemInfoList.area,
    houseExclusivePrivateArea: props.itemInfoList.mainteneceFee,
    houseDeposit: props.itemInfoList.deposit,
    houseMonthlyFee: props.itemInfoList.rent,
    houseExtraFee: props.itemInfoList.maintenanceFee,
    houseImage: props.itemInfoList.images,
  };

  return (
    <div className={classes.contractForSale}>
      <ContractHouseCardContent ContractInfo={ContractInfo} fx2={props.fx} />
    </div>
  );
};

export default ContractForSale;

export const ContractForSaleDetailUser = (props) => {
  const ContractInfo = {
    houseNumber: props.itemInfoList.itemNo,
    houseName: props.itemInfoList.buildingName,
    houseAddress: props.itemInfoList.address,
    houseSupplyArea: props.itemInfoList.exclusivePrivateArea,
    houseDeposit: props.itemInfoList.deposit,
    houseMonthlyFee: props.itemInfoList.rent,
    houseExtraFee: props.itemInfoList.maintenanceFee,
    houseTermOfContract: props.contractInfoList.termOfContract,
    houseMoveOnDate: props.contractInfoList.moveOnDate,
    houseImage: props.itemInfoList.images,
  };

  return (
    <div className={classes.contractForSale}>
      <ContractDetailUserCardContent ContractInfo={ContractInfo} />
    </div>
  );
};

export const ContractForSaleDetailRealtor = (props) => {
  const ContractInfo = {
    houseNumber: props.itemInfoList.itemNo,
    houseName: props.itemInfoList.buildingName,
    houseAddress: props.itemInfoList.address,
    houseSupplyArea: props.itemInfoList.exclusivePrivateArea,
    houseDeposit: props.itemInfoList.deposit,
    houseMonthlyFee: props.itemInfoList.rent,
    houseExtraFee: props.itemInfoList.maintenanceFee,
    houseTermOfContract: props.contractInfoList.termOfContract,
    houseMoveOnDate: props.contractInfoList.moveOnDate,
    houseImage: props.itemInfoList.images,
  };
  return (
    <div className={classes.contractForSale}>
      <ContractDetailRealtorCardContent
        ContractInfo={ContractInfo}
        fx2={props.fx}
      />
    </div>
  );
};
