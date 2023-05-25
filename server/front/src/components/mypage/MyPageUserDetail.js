import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { getUserInfo } from "../../apis/MemberService";
import axiosInstance, { getAuthHeader } from "../../util/axios";
import { useAuth } from "../common/AuthProtector";
import { useDispatch } from "react-redux";
import { userAction } from "../../store/user-slice";
import ImageInput from "../common/ImageInput";
import sample from "../../assets/image/sample.jpg";
import classes from "./MyPageUserDetail.module.scss";

const MyPageUserDetail = () => {
  const formData = useRef();
  const navigate = useNavigate();
  const { doLogout } = useAuth();
  const dispatch = useDispatch();
  const [userDetail, setUserDetail] = useState("");
  const [profile, setProfile] = useState("");
  const [previewProfile, setPreviewProfile] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [userPassError, setUserPassError] = useState(false);

  const onQuitHandler = async () => {
    if (confirm("정말로 탈퇴하시겠습니까?")) {
      try {
        const result = await axiosInstance.delete("users", {
          headers: getAuthHeader(),
        });
        if (result) {
          alert("탈퇴되었습니다!");
          doLogout();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getUserInfo(getAuthHeader());
      setUserDetail(result);
      if (result.imageSrc !== null) {
        setPreviewProfile(result.imageSrc);
        setImageSrc(result.imageSrc);
      }
    }
    fetchData();
  }, []);

  const profileImgHandler = (data) => {
    setProfile(data);
  };
  const deleteHandler = (data) => {
    setProfile(data);
    setImageSrc(null);
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

  const onChangeUser = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$^*+=-])(?=.*[0-9]){9,16}/;
    if (
      !formData.current.userPass.value.trim ||
      !passwordRegex.test(formData.current.userPass.value)
    ) {
      setUserPassError(true);
      return;
    } else {
      setUserPassError(false);
    }

    const changeData = {
      password: formData.current.userPass.value,
      email: formData.current.userEmail.value,
      phone: formData.current.userPhone.value,
      region: "봉명동",
      imageSrc: imageSrc,
    };

    const frm = new FormData();

    frm.append("file", profile);
    frm.append(
      "Update",
      new Blob([JSON.stringify(changeData)], { type: "application/json" })
    );

    try {
      const result = await axiosInstance.post("users/info", frm, {
        headers: {
          Authorization: getAuthHeader().Authorization,
          "Content-Type": "multipart/form-data",
        },
      });
      if (result) {
        const data = {
          id: userDetail.id,
          name: userDetail.name,
          isRealtor: false,
          profile: result.data.data.imageSrc,
          score: userDetail.score,
        };
        dispatch(userAction.setInfo(data));
        navigate("/mypage/user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={onChangeUser} ref={formData}>
        <div className={classes.detailUser}>
          <div className={classes.detailFieldSet}>
            <div className={classes.formInner}>
              <div className={classes.profile}>
                {previewProfile ? (
                  <img src={previewProfile} alt="User Profile" />
                ) : (
                  <img src={sample} alt="Blank Profile" />
                )}
                <div>
                  <div className={classes.profileBtn}>
                    <ImageInput
                      setImage={profileImgHandler}
                      addButton={
                        previewProfile ? (
                          <div className={classes.modBtn}>변경</div>
                        ) : (
                          <div className={classes.modBtn}>프로필 등록</div>
                        )
                      }
                      delButton={
                        previewProfile ? (
                          <div
                            className={classes.delBtn}
                            onClick={deleteHandler}
                          >
                            삭제
                          </div>
                        ) : (
                          ""
                        )
                      }
                    ></ImageInput>
                  </div>
                </div>
              </div>
              <div className={classes.inputBox}>
                <label>이름</label>
                <div className={classes.inputButton}>
                  <span>{userDetail.name}</span>
                </div>
              </div>
              <div className={classes.inputBox}>
                <label>아이디</label>
                <div className={classes.inputButton}>
                  <span>{userDetail.id}</span>
                </div>
              </div>
              <div className={classes.inputBox}>
                <label>비밀번호</label>
                <div className={classes.inputButton}>
                  <input
                    type="password"
                    id="userPass"
                    name="userPass"
                    defaultValue={userDetail.password || ""}
                  ></input>
                </div>
                {userPassError && (
                  <div style={{ color: "red" }}>
                    비밀번호는 문자,숫자,특수문자를 조합하여 9자이상 16자
                    이내이어야 합니다.
                  </div>
                )}
              </div>
              <div className={classes.inputBox}>
                <label>이메일</label>
                <div className={classes.inputButton}>
                  <input
                    type="text"
                    id="userEmail"
                    name="userEmail"
                    defaultValue={userDetail.email || ""}
                  ></input>
                </div>
              </div>
              <div className={classes.inputBox}>
                <label>전화번호 </label>
                <div className={classes.inputButton}>
                  <input
                    type="text"
                    id="userPhone"
                    name="userPhone"
                    defaultValue={userDetail.phone || ""}
                  ></input>
                </div>
              </div>
              <div className={classes.inputBox}>
                <label>지역</label>
                <div className={classes.inputButton}>
                  <span>{userDetail.region}</span>
                </div>
              </div>
              <div className={classes.inputBox}>
                <label>성별 </label>
                <div className={classes.inputButton}>
                  <span>{userDetail.gender}</span>
                </div>
              </div>
              <div className={classes.inputBox}>
                <label>평가점수</label>
                <div className={classes.inputButton}>
                  <span>{userDetail.score}</span>
                </div>
              </div>
            </div>

            <br />
            <div>
              <span className={classes.delBtn}>
                <button onClick={onQuitHandler}>회원탈퇴</button>
              </span>
              <span className={classes.modifyBtn}>
                <button onClick={onChangeUser}>정보수정</button>
              </span>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export const userDetailInfoLoader = async () => {
  const response = await getUserInfo(getAuthHeader());
  return response;
};

export default MyPageUserDetail;
