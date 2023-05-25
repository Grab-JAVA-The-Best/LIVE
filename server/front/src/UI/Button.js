import classes from "./Button.module.scss";

/**
 *
 * @param { isSubmit : boolean}
 * @param { clickEvent : function } onClickEvent
 * @param { children : String }
 *
 * @returns
 */
const Button = ({ isSubmit, clickEvent, children, type }) => {
  const clickEventHandler = (e) => {
    e.preventDefault();
    clickEvent();
  };

  return (
    <button
      className={`${classes.button}`}
      type={isSubmit ? "submit" : "button"}
      onClick={clickEventHandler}
    >
      {children}
    </button>
  );
};

export default Button;
