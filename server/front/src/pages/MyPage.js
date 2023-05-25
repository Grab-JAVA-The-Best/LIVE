import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../components/common/AuthProtector";

const MyPage = () => {
  const { userInfo } = useAuth();
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/mypage") {
      navigation(userInfo.isRealtor ? "/mypage/realtor" : "/mypage/user");
    }
  }, [location]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default MyPage;
