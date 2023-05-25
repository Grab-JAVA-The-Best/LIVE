import React, { useState, useEffect, useRef } from "react";
import classes from "./SignUpPageUser.module.scss";
import ImageInput from "./common/ImageInput";
import blankImage from "../assets/image/blank_profile.png";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../util/axios";

const SignUpPageUser = () => {
  const navigation = useNavigate();

  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userPassCheck, setUserPassCheck] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [userIdError, setUserIdError] = useState(false);
  const [idDuplicateError, setIdDuplicateError] = useState(0);
  const [userPassError, setUserPassError] = useState(false);
  const [userPassCheckError, setUserPassCheckError] = useState(false);
  const [userEmailError, setUserEmailError] = useState(false);

  const [profile, setProfile] = useState("");
  const [previewProfile, setPreviewProfile] = useState("");

  const formData = useRef();

  const onChangeUserId = (e) => {
    if (e.target.value.length > 16 || e.target.value.length < 3)
      setUserIdError(true);
    else setUserIdError(false);

    setUserId(e.target.value);
  };

  const checkIdDuplicate = async () => {
    try {
      const result = await axiosInstance.post("users/id", { id: userId });

      if (!userId || !result.data.data) {
        setIdDuplicateError(-1);
      } else {
        setIdDuplicateError(1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onChangeUserPass = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$^*+=-])(?=.*[0-9]){9,16}/;
    if (!e.target.value || passwordRegex.test(e.target.value))
      setUserPassError(false);
    else setUserPassError(true);

    if (!userPassCheck || e.target.value === userPassCheck)
      setUserPassCheckError(false);
    else setUserPassCheckError(true);

    setUserPass(e.target.value);
  };

  const onChangeUserPassCheck = (e) => {
    if (userPass === e.target.value) setUserPassCheckError(false);
    else setUserPassCheckError(true);

    setUserPassCheck(e.target.value);
  };

  const onChangeEmail = (e) => {
    if (e.target.value.includes("@")) setUserEmailError(false);
    else setUserEmailError(true);

    setUserEmail(e.target.value);
  };

  const profileHandler = (data) => {
    setProfile(data);
  };

  useEffect(() => {
    if (!profile) {
      setPreviewProfile(null);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(profile);

    reader.onload = () => {
      const preview = reader.result;

      setPreviewProfile(preview);
    };
  }, [profile]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const joinUser = async (e) => {
    e.preventDefault();

    if (!userId || userIdError || idDuplicateError !== 1) {
      alert(`현재 입력하신 아이디는 사용할 수 없는 아이디입니다`);
      return;
    }
    if (!userPass || userPassCheckError || userPassError) {
      alert(`현재 입력하신 비밀번호는 사용할 수 없는 비밀번호입니다`);
      return;
    }
    if (!userEmail || userEmailError) {
      alert(`현재 입력하신 이메일은 사용할 수 없는 이메일입니다`);
      return;
    }

    const joinData = {
      id: userId,
      password: userPass,
      email: userEmail,
      name: formData.current.userName.value,
      phone: formData.current.userPhone.value,
      region: "봉명동",
      gender: "남",
    };

    const frm = new FormData();

    frm.append("file", profile);
    frm.append(
      "SignUp",
      new Blob([JSON.stringify(joinData)], { type: "application/json" })
    );

    try {
      const result = await axiosInstance.post("users", frm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (result) {
        alert(`회원가입 성공`);

        navigation("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={classes.signupUser} onSubmit={joinUser} ref={formData}>
      <div className={classes.signupFieldSet}>
        <h1>일반 회원 가입</h1>
        <div className={classes.formInner}>
          <div className={classes.profile}>
            {previewProfile ? (
              <img src={previewProfile} alt="User Profile" />
            ) : (
              <img src={blankImage} alt="Blank Profile" />
            )}
            <div className={classes.profileBtn}>
              <ImageInput
                setImage={profileHandler}
                addButton={
                  previewProfile ? (
                    <div className={classes.modBtn}>변경</div>
                  ) : (
                    <div className={classes.modBtn}>프로필 등록</div>
                  )
                }
                delButton={
                  previewProfile ? (
                    <div className={classes.delBtn}>삭제</div>
                  ) : (
                    false
                  )
                }
              />
            </div>
          </div>
          <div className={classes.inputBox}>
            <label htmlFor="userId">아이디 </label>
            <div className={classes.inputButton}>
              <input
                id="userId"
                name="userId"
                type="text"
                value={userId}
                onChange={onChangeUserId}
              />
              <button onClick={checkIdDuplicate} type="button">
                중복확인
              </button>
            </div>
            {userIdError && (
              <div className={classes.errorText}>
                아이디는 최소 3자부터 최대 16자까지 입력가능합니다.
              </div>
            )}
            {idDuplicateError === -1 && (
              <div className={classes.errorText}>
                사용 불가능한 아이디입니다.
              </div>
            )}
            {idDuplicateError === 1 && (
              <div className={classes.goodText}>사용 가능한 아이디입니다.</div>
            )}
          </div>
          <div className={classes.inputBox}>
            <label htmlFor="userPass">비밀번호 </label>
            <input
              id="userPass"
              name="userPass"
              type="password"
              value={userPass}
              onChange={onChangeUserPass}
            />
            {userPassError && (
              <div className={classes.errorText}>
                비밀번호는 문자,숫자,특수문자를 조합하여 9자이상 16자 이내이어야
                합니다.
              </div>
            )}
          </div>
          <div className={classes.inputBox}>
            <label htmlFor="userPassCheck">비밀번호 확인 </label>
            <input
              id="userPassCheck"
              name="userPassCheck"
              type="password"
              value={userPassCheck}
              onChange={onChangeUserPassCheck}
            />
            {userPassCheckError && (
              <div className={classes.errorText}>
                비밀번호 입력값이 다릅니다!
              </div>
            )}
          </div>
          <div className={classes.inputBox}>
            <label htmlFor="userName">이름 </label>
            <input id="userName" name="userName" type="text" />
          </div>
          <div className={classes.inputBox}>
            <label htmlFor="userEmail">이메일 </label>
            <input
              id="userEmail"
              name="userEmail"
              type="email"
              value={userEmail}
              onChange={onChangeEmail}
            />
            {userEmailError && (
              <div className={classes.errorText}>
                올바른 이메일 형식이 아닙니다!
              </div>
            )}
          </div>
          <div className={classes.inputBox}>
            <label htmlFor="userPhone">전화번호 </label>
            <input id="userPhone" name="userPhone" type="text" />
          </div>
          <div className={classes.signUpBtn}>
            <button type="submit">회원가입</button>
          </div>
        </div>
        <div className={classes.realtorLink}>
          <Link to="/signup/realtor">중개사 회원이신가요?</Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpPageUser;
