import classes from "./SelectBox.module.scss";

/**
 * @param {*} props
 * @param { name : String, value : String } dataArray
 * @param { default option name } default
 * @param { onChange Function } changeEventHandler
 * @returns { conponent : SelectBox }
 */
const SelectBox = ({ dataArray, id, defaultValue, value, name, first, changeEventHandler }) => {
  return (
    <div className={classes.customSelector}>
      <select
        className={classes.select}
        id={id}
        onChange={changeEventHandler}
        value={defaultValue}
        style={id === "sidoSelector" ? { borderTopLeftRadius: "4px", borderBottomLeftRadius: "4px" } : {}}
      >
        {first && <option value=""> {first} </option>}
        {dataArray?.map((el, idx) => {
          return (
            <option key={idx} value={el[value]} name={el[name]}>
              {el[name]}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectBox;
