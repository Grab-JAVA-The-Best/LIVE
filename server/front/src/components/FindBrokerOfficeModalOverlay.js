import classes from "./FindBrokerOfficeModalOverlay.module.scss";
import { useRef, useState } from "react";
import Card from "../UI/Card";

const FindBrokerOfficeModalOverlay = (props) => {
  const modalBusinessCorpRef = useRef();
  const modalRealtorName = useRef();

  const [realtorList, setRealtorList] = useState([]);
  const [page, setPage] = useState(1);

  const modalStateChangeHandler = () => {
    props.onModalStateChange();
  };



  const onClickHandler = () => {
    const bsnmCmpnm = modalBusinessCorpRef.current.value;
    const brkrNm = modalRealtorName.current.value;

    const url = `https://apis.data.go.kr/1611000/nsdi/EstateBrkpgService/attr/getEBOfficeInfo?bsnmCmpnm=${bsnmCmpnm}&brkrNm=${brkrNm}&pageNo=${page}&format=json&SttusSeCode=1&ServiceKey=WJW00Su3vUYQxWl%2FCdTWnPqgt4dnBsErjbqIqeo9I7%2BWiVcC4HDx26kL%2BYDc0MRTL%2BjZ6RC1BWUVlf9Z8rWQPg%3D%3D`;

    fetch(url)
      .then((result) => result.json())
      .then((json) => {
        const realtorList = json.EBOffices.field;

        setRealtorList(realtorList);
      });
  };

  return (
    <div className={classes.searchModal}>
      <h2>중개사무소 찾기</h2>
      <div>
        <form>
          <div>
            <label htmlFor="businesscorp">사업자 상호 </label>
            <input type="text" id="businesscorp" ref={modalBusinessCorpRef} />
          </div>
          <div>
            <label htmlFor="realtorname">중개업자 명 </label>
            <input type="text" id="realtorname" ref={modalRealtorName} />
          </div>
        </form>
        <button onClick={onClickHandler}>찾기</button>
      </div>
      <div className={classes.listBox}>
        {realtorList.map((item, idx) => {
          return (
            <Card key={idx}>
              <div
                className={classes.brokerList}
                onClick={() => {
                  modalStateChangeHandler();
                  props.addRealtorInformationHandler(realtorList[idx]);
                }}
              >
                <h4>{item.bsnmCmpnm}</h4>
                <p>
                  {item.brkrNm} | {item.ldCodeNm}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FindBrokerOfficeModalOverlay;
