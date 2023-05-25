import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axiosInstance, { getAuthHeader } from "../../util/axios";
import { getRealtorInfo } from "../../apis/MemberService";
import { useAuth } from "../common/AuthProtector";
import { useDispatch } from "react-redux";
import { userAction } from "../../store/user-slice";
import ImageInput from "../common/ImageInput";
import sample from "../../assets/image/sample.jpg";
import classes from "./MyPageUserDetail.module.scss";

const MyPageRealtorDetail = () => {
  const formData = useRef();
  const navigate = useNavigate();
  const { doLogout } = useAuth();
  const dispatch = useDispatch();
  const [realtorDetail, setRealtorDetail] = useState("");
  const [profile, setProfile] = useState("");
  const [previewProfile, setPreviewProfile] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [realtorPassError, setRealtorPassError] = useState(false);

  const onQuitHandler = async () => {
    if (confirm("정말로 탈퇴하시겠습니까?")) {
      try {
        const result = await axiosInstance.delete("realtors", {
          headers: getAuthHeader(),
        });
        if (result) {
          alert("탈퇴되었습니다!");
          doLogout();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getRealtorInfo(getAuthHeader());
      setRealtorDetail(result);
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
      !formData.current.realtorPass.value.trim ||
      !passwordRegex.test(formData.current.realtorPass.value)
    ) {
      setRealtorPassError(true);
      return;
    } else {
      setRealtorPassError(false);
    }

    const changeData = {
      password: formData.current.realtorPass.value,
      email: formData.current.realtorEmail.value,
      phone: formData.current.realtorPhone.value,
      description: formData.current.realtorDescription.value,
      imageSrc: imageSrc,
    };

    const frm = new FormData();

    frm.append("file", profile);
    frm.append(
      "Update",
      new Blob([JSON.stringify(changeData)], { type: "application/json" })
    );

    try {
      const result = await axiosInstance.post("realtors/info", frm, {
        headers: {
          Authorization: getAuthHeader().Authorization,
          "Content-Type": "multipart/form-data",
        },
      });

      if (result) {
        const data = {
          id: realtorDetail.id,
          name: realtorDetail.name,
          isRealtor: true,
          profile: result.data.data.imageSrc,
          score: realtorDetail.score,
        };
        dispatch(userAction.setInfo(data));
        navigate("/mypage/realtor");
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
                  <span>{realtorDetail.name}</span>
                </div>
              </div>
              <div className={classes.inputBox}>
                <label>중개사무소 주소</label>
                <div className={classes.inputButton}>
                  <span>{realtorDetail.businessAddress}</span>
                </div>
              </div>
              <div className={classes.inputBox}>
                <label>비밀번호</label>
                <div className={classes.inputButton}>
                  <input
                    type="password"
                    id="realtorPass"
                    name="realtorPass"
                    defaultValue={realtorDetail.password || ""}
                  ></input>
                </div>
                {realtorPassError && (
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
                    id="realtorEmail"
                    name="realtorEmail"
                    defaultValue={realtorDetail.email || ""}
                  ></input>
                </div>
              </div>
              <div className={classes.inputBox}>
                <label>전화번호 </label>
                <div className={classes.inputButton}>
                  <input
                    type="text"
                    id="realtorPhone"
                    name="realtorPhone"
                    defaultValue={realtorDetail.phone || ""}
                  ></input>
                </div>
              </div>
              <div className={classes.inputBox}>
                <label>소개글</label>
                <div className={classes.inputButton}>
                  <input
                    type="text"
                    id="realtorDescription"
                    name="realtorDescription"
                    defaultValue={realtorDetail.description || ""}
                  ></input>
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

export const realtorDetailInfoLoader = async () => {
  const response = await getRealtorInfo(getAuthHeader());
  return response;
};

export default MyPageRealtorDetail;
