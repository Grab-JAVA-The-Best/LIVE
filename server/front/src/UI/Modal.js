import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.scss";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <div className={classes.modal}>{props.children}</div>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default Modal;
