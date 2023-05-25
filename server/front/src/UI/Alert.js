import ReactDOM from "react-dom";
import { useEffect } from "react";
import classes from "./Alert.module.scss";
import { NavLink } from "react-router-dom";

const CustomAlert = ({ title, content, link, linkName, setter }) => {
  useEffect(() => {
    setTimeout(() => {
      setter(false);
    }, 5000);
  }, []);

  return (
    <>
      {ReactDOM.createPortal(
        <div className={classes.alert}>
          <h2> {title} </h2>
          <hr />
          <p> {content} </p>
          {link && <NavLink to={link}>{linkName ? linkName : link}</NavLink>}
        </div>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default CustomAlert;
