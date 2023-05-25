import classes from "./MainContentInputBox.module.scss";

const MainContentInputBox = () => {
  return (
    <div className={classes.inputbox}>
      <label htmlFor="singleroom" style={{ fontSize: "1.1rem" }}>
        원룸
      </label>
      <div className={classes.singleroom}>
        <input readOnly value={250} />
        <input readOnly value={50} />
      </div>
      <label htmlFor="tworoom" style={{ fontSize: "1.1rem" }}>
        투룸
      </label>
      <div className={classes.tworoom}>
        <input readOnly value={300} />
        <input readOnly value={60} />
      </div>
      <label htmlFor="houselease" style={{ fontSize: "1.1rem" }}>
        전세
      </label>
      <div className={classes.houselease}>
        <input readOnly value={"1억 2500"} />
      </div>
    </div>
  );
};

export default MainContentInputBox;
