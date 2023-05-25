import { useContext } from "react";
import { useMemo } from "react";
import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { userLogout } from "../../apis/MemberService";
import { userAction } from "../../store/user-slice";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const userInfo = useSelector((state) => {
    return state.user.userInfo;
  });

  const accessToken = useSelector((state) => {
    return state.user.accessToken;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doLogin = async (data) => {
    dispatch(userAction.login(data));
    navigate("/mypage");
  };

  const doLogout = async () => {
    await userLogout(dispatch);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      userInfo,
      doLogin,
      doLogout,
      accessToken,
    }),
    [userInfo, accessToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ProtectedRouter = ({ children, condition }) => {
  const { userInfo } = useAuth();

  if (!userInfo?.id) {
    alert("로그인이 필요한 페이지입니다.");
    return <Navigate to="/login" />;
  }

  if (
    (condition === true && userInfo.isRealtor === false) ||
    (condition === false && userInfo.isRealtor === true)
  ) {
    alert(
      condition
        ? "중개사만 사용할 수 있는 페이지입니다."
        : "일반 고객만 사용할 수 있는 페이지입니다"
    );
    return <Navigate to="/" />;
  }

  return children;
};
