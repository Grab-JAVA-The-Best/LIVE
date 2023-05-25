import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../components/common/AuthProtector";
import classes from "./HousePage.module.scss";

const HousePage = () => {
  const { userInfo } = useAuth();

  useEffect(() => {
    if (userInfo.isRealtor !== true) {
      throw new Error("페이지 접근 권한이 없습니다.");
    }
  }, []);

  return (
    <div className={classes.house}>
      <Outlet />
    </div>
  );
};

export default HousePage;
