import Card from "../../UI/Card";
import { RealtorContractCardContent } from "../RealtorCardContent";
import classes from "./ContractInfo.module.scss";

const ContractInfo = (props) => {
  const realtorInfo = {
    image: props.realtorInfoList.imageSrc,
    realtoroffice: props.realtorInfoList.corp,
    name: props.realtorInfoList.name,
    realtorAddress: props.realtorInfoList.businessAddress,
    realtorPhone: props.realtorInfoList.phone,
  };

  return (
    <div className={classes.contractInfo}>
      <div className={classes.inner}>
        <div className={classes.infoContent}>
          <h2>계약정보</h2>
          <Card>
            <RealtorContractCardContent data={realtorInfo} />
          </Card>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ContractInfo;
