import HouseListContent from "./HouseListContent";
import Pagination from "../common/Pagination";
import classes from "./HouseList.module.scss";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRealtorsHouseList } from "../../apis/houseApis";
import { GiConversation } from "react-icons/gi";

const HouseList = () => {
  const [houseList, setHouseList] = useState([]);
  const [currList, setCurrList] = useState([]);
  const searchInputRef = useRef();
  const itemsPerPage = 5;
  const totalList = useSelector((state) => {
    return state.house.houseList;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getRealtorsHouseList(dispatch);
  }, []);

  useEffect(() => {
    setHouseList(totalList);
  }, [totalList]);

  useEffect(() => {
    setCurrList(houseList.slice(0, 5));
  }, [houseList]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const searchEventHandler = () => {
    const searchList = totalList.filter((item) => {
      return (
        item.address.includes(searchInputRef.current.value) ||
        item.addressDetail.includes(searchInputRef.current.value)
      );
    });

    setHouseList(searchList);

    searchInputRef.current.value = "";
  };

  const paginateHandler = (pageNum) => {
    let tempArr = [];
    let endNum = pageNum * itemsPerPage;
    const srtNum = endNum - itemsPerPage;
    endNum = endNum > houseList.length ? houseList.length : endNum;

    for (let i = srtNum; i < endNum; i++) {
      tempArr.push(houseList[i]);
    }

    setCurrList(tempArr);
  };

  const houseRegistHandler = () => {
    navigate("/house/regist");
  };

  return (
    <div className={classes.houseList}>
      <div className={classes.listInner}>
        <h1>보유 매물 목록 </h1>
        <div className={classes.listDescription}>
          <div className={classes.descIcon}>
            <GiConversation className={classes.icon} />
          </div>
          <div className={classes.descText}>
            <h4>
              ‘나의 매물 목록’ 을 통해 등록한 매물을 확인하고 관리할 수
              있습니다.
            </h4>
            <p>원하는 매물을 클릭하여 상세 화면으로 이동할 수 있습니다.</p>
            <p>
              새로운 매물을 등록하고 싶으면 `매물 등록` 버튼을 통해 등록하실 수
              있습니다.
            </p>
          </div>
        </div>
        <div className={classes.registContent}>
          <button onClick={houseRegistHandler}>매물 등록</button>
        </div>
        {!houseList ? (
          <p> 등록된 매물이 없습니다</p>
        ) : (
          <>
            <div>
              <HouseListContent houses={currList} />
            </div>
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={houseList.length}
              paginate={paginateHandler}
            />
            <div className={classes.inputButton}>
              <input
                type="text"
                ref={searchInputRef}
                placeholder="지역명을 입력해주세요"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchEventHandler();
                  }
                }}
              />
              <button onClick={searchEventHandler}>검 색</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HouseList;
