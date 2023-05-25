import { Outlet } from "react-router-dom";
import classes from "./SignUpPage.module.scss";

const SignUpPage = () => {
  return (
    <div className={classes.signup}>
      <Outlet />
    </div>
  );
};

export default SignUpPage;
