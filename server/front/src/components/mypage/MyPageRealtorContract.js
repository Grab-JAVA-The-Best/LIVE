import { useEffect, useState } from "react";
import classes from "./MyPageRealtorContract.module.scss";
import ListBox from "../../UI/ListBox";
import ContractCardContent from "../ContractCardContent";
import { getContractList } from "../../apis/ContractApis";
import { useAuth } from "../common/AuthProtector";

const data = ["대기중 계약", "진행중 계약", "완료된 계약"];

const MyPageRealtorContract = () => {
  const [contractItem, setContractItem] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const { userInfo } = useAuth();

  useEffect(() => {
    const response = async () => {
      const contractList = await getContractList(currentTab);

      const result = contractList.data.map((item) => {
        return { ...item, status: currentTab, isRealtor: userInfo.isRealtor };
      });

      setContractItem(result);
    };

    response();
  }, [currentTab]);

  const tabChangeHandler = (e) => {
    setCurrentTab(Number.parseInt(e.target.value));
  };

  return (
    <>
      <div className={classes.consultBox}>
        <div className={classes.consulting}>
          <div className={classes.consultingContent}>
            <div className={classes.inner}>
              <div>
                <h3>계약 관리</h3>

                <span>
                  {data.map((title, index) => {
                    return (
                      <button
                        key={index}
                        value={index}
                        className={`${classes.btn} ${
                          index === currentTab ? classes.active : ""
                        }`}
                        onClick={tabChangeHandler}
                      >
                        {title}
                      </button>
                    );
                  })}
                </span>

                <div className={classes.consultingList}>
                  <div>
                    {contractItem.length !== 0 ? (
                      <ListBox dataArray={contractItem} direction={false}>
                        <ContractCardContent />
                      </ListBox>
                    ) : (
                      <li>
                        <p> 해당 내역은 존재하지 않습니다.</p>
                      </li>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPageRealtorContract;
