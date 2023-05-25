import Button from "../../UI/Button";
import DateSelector from "./DateSelector";
import SelectBox from "../../UI/SelectBox";
import { useEffect, useRef, useState } from "react";

import classes from "./ReservationSearchBox.module.scss";
import axiosInstance from "../../util/axios";

const ReservationSearchBox = (props) => {
  const [sido, setSido] = useState("");
  const [gugun, setGugun] = useState("");
  const [dong, setDong] = useState("");
  const refDate = useRef(new Date());

  const [regionsSido] = useState(props.sidos);
  const [regionsGugunList, setGugunList] = useState([]);
  const [regionsDongList, setDongList] = useState([]);

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

  const changeDateHandler = (e, ref) => {
    if (e.target) {
      ref.current = e.target.value;
    } else {
      ref.current = e;
    }
  };

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

  return (
    <div className={classes.searchBox}>
      <div>
        <SelectBox
          dataArray={regionsSido}
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
          dataArray={regionsGugunList}
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
          dataArray={regionsDongList}
          first={"동을 선택해 주세요"}
          defaultValue={dong}
          value={"regionCode"}
          name={"dongName"}
          id={"dongSelector"}
          changeEventHandler={(e) => {
            changeEventHandler(e, setDong);
          }}
        />
        <DateSelector
          changeEventHandler={(e) => {
            changeDateHandler(e, refDate);
          }}
        />
        <Button
          clickEvent={() =>
            props.clickSearchEventHandler(sido, gugun, dong, refDate.current)
          }
        >
          검색
        </Button>
      </div>
    </div>
  );
};

export default ReservationSearchBox;
