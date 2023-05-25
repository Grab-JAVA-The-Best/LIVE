import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Header.module.scss";
import logo from "../../assets/image/liveLogo.png";
import { makeUUID } from "../../util/UUID";
import { useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { useAuth } from "./AuthProtector";
import { realtorLogout, userLogout } from "../../apis/MemberService";

const Header = () => {
  const [isToggled, setIsToggled] = useState(false);

  const isToggledHandler = () => {
    setIsToggled(!isToggled);
  };

  const { userInfo, accessToken } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutEventHandler = (e) => {
    e.preventDefault();

    if (isToggled) isToggledHandler();

    if (userInfo.isRealtor) {
      realtorLogout(dispatch);
    } else {
      userLogout(dispatch);
    }

    navigate("/");
  };

  return (
    <div className={classes.header}>
      <div className={classes.headerInner}>
        <div className={classes.item}>
          <NavLink to={"/"} onClick={isToggled && isToggledHandler}>
            <img src={logo} alt="Live Logo" />
          </NavLink>
          <button className={classes.toggleBtn}>
            <GiHamburgerMenu onClick={isToggledHandler} />
          </button>
        </div>
        <ul className={`${classes["menu"]} ${isToggled && classes.active}`}>
          {accessToken ? (
            <li>
              <NavLink to={"/alert"} onClick={isToggled && isToggledHandler}>
                알림
              </NavLink>
            </li>
          ) : (
            ""
          )}
          {userInfo.isRealtor ? (
            <li>
              <NavLink to={"/house"} onClick={isToggled && isToggledHandler}>
                매물
              </NavLink>{" "}
            </li>
          ) : (
            ""
          )}
          {userInfo.isRealtor === false && (
            <li>
              <NavLink
                to={"/reservation"}
                onClick={isToggled && isToggledHandler}
              >
                예약
              </NavLink>
            </li>
          )}
          {userInfo.isRealtor && (
            <li>
              <NavLink
                to={`/consulting/${makeUUID()}`}
                onClick={isToggled && isToggledHandler}
              >
                상담
              </NavLink>
            </li>
          )}
          {accessToken && (
            <li>
              <NavLink to={"/mypage"} onClick={isToggled && isToggledHandler}>
                마이페이지
              </NavLink>
            </li>
          )}
          {accessToken ? (
            <li>
              <NavLink onClick={logoutEventHandler}>로그아웃</NavLink>
            </li>
          ) : (
            ""
          )}{" "}
          {accessToken ? (
            ""
          ) : (
            <li>
              <NavLink to={"/login"} onClick={isToggled && isToggledHandler}>
                로그인
              </NavLink>
            </li>
          )}
          {accessToken ? (
            ""
          ) : (
            <li>
              <NavLink to={"/signup"} onClick={isToggled && isToggledHandler}>
                회원가입
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
