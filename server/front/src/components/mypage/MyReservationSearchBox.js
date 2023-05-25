import SelectBox from "../../UI/SelectBox";
import React, { useRef, useState, useEffect } from "react";
import axiosInstance from "../../util/axios";
import classes from "./MyReservationSearchBox.module.scss";
import { getItemListBySearch } from "../../apis/houseApis";
import HouseCardContent from "../HouseCardContent";

const MyReservationSearchBox = (props) => {
  const [sido, setSido] = useState("");
  const [gugun, setGugun] = useState("");
  const [dong, setDong] = useState("");
  const buildingName = useRef();
  const [gugunList, setGugunList] = useState([]);
  const [dongList, setDongList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);

  const changeEventHandler = (e, setter) => {
    if (e.target) {
      if (e.target.id === "sidoSelector") {
        setGugun("");
        setDong("");
      }

      if (e.target.id === "gugunSelector") {
        setDong("");
      }

      setter(e.target.value);
    } else {
    }
  };

  useEffect(() => {
    if (props.sidoList) {
    } else {
      (async () => {
        try {
          const result = await axiosInstance.get("regions", {
            params: {
              regionCode: "",
            },
          });

          const dataArray = result.data.data;
          setSidoList(dataArray);
        } catch (err) {
          throw new Error(err);
        }
      })();
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (!sido) {
        setGugunList([]);
        setDongList([]);
        return;
      }

      try {
        const result = await axiosInstance.get("regions", {
          params: {
            regionCode: sido.substring(0, 2),
          },
        });

        const dataArray = result.data.data;
        dataArray.shift();
        setGugunList(dataArray);
      } catch (err) {
        throw new Error(err);
      }
    })();
  }, [sido]);

  useEffect(() => {
    (async () => {
      if (!gugun) {
        setDongList([]);
        return;
      }

      try {
        const result = await axiosInstance.get("regions", {
          params: {
            regionCode: gugun.substring(0, 5),
          },
        });

        const dataArray = result.data.data;
        dataArray.shift();
        setDongList(dataArray);
      } catch (err) {
        throw new Error(err);
      }
    })();
  }, [gugun]);

  const searchEventHandler = async () => {
    const data = {};

    let word = buildingName.current.value;
    if (!word) {
      word = "";
    }

    data["word"] = word;

    if (!sido) {
      alert("광역시도는 필수 입력값입니다.");
      return;
    }

    if (!gugun) {
      data["regionCode"] = sido.substring(0, 2);
    } else if (!dong) {
      data["regionCode"] = gugun.substring(0, 5);
    } else {
      data["regionCode"] = dong;
    }

    const response = await getItemListBySearch(data);
    setSearchedList(response);
  };

  const clickSearchedListHandler = (data) => {
    if (props?.searchedListClickHander) {
      props.searchedListClickHander(data);
    }

    setSearchedList([]);
  };

  return (
    <div className={classes.searchBox}>
      <div className={classes.selectBox}>
        <SelectBox
          dataArray={props.sidoList}
          first={"시를 선택해 주세요"}
          defaultValue={sido}
          value={"regionCode"}
          name={"sidoName"}
          id={"sidoSelector"}
          changeEventHandler={(e) => {
            changeEventHandler(e, setSido);
          }}
        />
        <SelectBox
          dataArray={gugunList}
          first={"구를 선택해 주세요"}
          defaultValue={gugun}
          value={"regionCode"}
          name={"gugunName"}
          id={"gugunSelector"}
          changeEventHandler={(e) => {
            changeEventHandler(e, setGugun);
          }}
        />
        <SelectBox
          dataArray={dongList}
          first={"동을 선택해 주세요"}
          defaultValue={dong}
          value={"regionCode"}
          name={"dongName"}
          id={"dongSelector"}
          changeEventHandler={(e) => {
            changeEventHandler(e, setDong);
          }}
        />
      </div>
      <div className={classes.searchInput}>
        <div className={classes.inputText}>
          <input
            placeholder="건물명을 입력해주세요."
            id="buildingName"
            ref={buildingName}
          />
          <button onClick={() => searchEventHandler()}>검색</button>
        </div>
        {searchedList.length !== 0 && (
          <ul className={classes.badge}>
            {searchedList.map((item, idx) => {
              return (
                <li key={idx}>
                  {React.cloneElement(
                    <HouseCardContent
                      searchedListClickHandler={clickSearchedListHandler}
                    />,
                    {
                      ...item,
                      idx,
                    }
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyReservationSearchBox;
