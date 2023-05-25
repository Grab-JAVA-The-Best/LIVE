import React from "react";
import Card from "./Card";
import classes from "./ListBox.module.scss";

const ListBox = ({ dataArray, children, direction, toStart, active }) => {
  return (
    <>
      {dataArray?.length !== 0 && (
        <ul
          className={`${classes.list_box} ${direction ? classes.row : ""} ${
            toStart ? classes.toStart : ""
          }`}
        >
          {dataArray.length &&
            dataArray.map((element, idx) => {
              return (
                <li key={idx}>
                  <Card>
                    {React.cloneElement(children, { ...element, idx })}
                  </Card>
                </li>
              );
            })}
        </ul>
      )}
    </>
  );
};

export default ListBox;
