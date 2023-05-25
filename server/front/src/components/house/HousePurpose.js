/**
 * 매물등록 - 건축물 용도 작성 방법 컴포넌트
 * props
 *  - onClose(), 완료 후 모달 창 닫는 함수
 */
import Logo from "../../assets/image/liveLogo.png";
import classes from "./HousePurpose.module.scss";

const HousePurpose = (props) => {
  return (
    <div className={classes.purposeContent}>
      <header>
        <img src={Logo} alt="Live Logo" />
        <button type="button" onClick={props.onClose}>
          ✖
        </button>
      </header>
      <div className={classes.purposeInner}>
        <div className={classes.innerBlock}>
          <h2>건물 종류</h2>
          <p>
            <span>
              건물 종류는 2020년 8월 21일 중개사법 개정에 의한 필수 표기
              정보입니다.
            </span>
          </p>
          <blockquote>
            중개대상물의 표시·광고 명시사항 세부기준 “중개대상물 종류”는
            「건축법」 제2조제1항제2호에 따른 건축물과 그 밖의 토지의 정착물로
            구분하여 표시하되, 건축물은 「건축법」 제2조제2항에 따른 건축물의
            용도로 구분하여 표시하여야 한다. 다만,{" "}
            <span>미등기건물의 경우에는 “미등기건물”이라고 표시</span>
            하여야 한다.
          </blockquote>
        </div>

        <div className={classes.innerBlock}>
          <h2>중개대상물 입력 방법</h2>
          <blockquote>
            그 외 중개대상물을 입력해주실 때는{" "}
            <span>이모티콘을 사용하거나</span> 단독주택, 다중주택, 다가구주택,
            공동주택, 아파트, 연립주택, 다세대주택, 기숙사, 제1종근린생활시설,
            제2종근린생활시설 등{" "}
            <span>정확한 건물 종류가 작성되지 않으면 반려</span> 될 수 있습니다.
          </blockquote>
          <p>
            <span>
              ☞ 건축법 시행령 [별표1]{" "}
              <a
                href="https://law.go.kr/%EB%B2%95%EB%A0%B9%EB%B3%84%ED%91%9C%EC%84%9C%EC%8B%9D/(%EA%B1%B4%EC%B6%95%EB%B2%95%EC%8B%9C%ED%96%89%EB%A0%B9,%EB%B3%84%ED%91%9C1)"
                target="_blank"
                rel="noreferrer"
              >
                용도별 건축물의 종류
              </a>
            </span>
          </p>
          <blockquote>
            "「건축법」 제2조제2항에 따른 건축물의 상위 용도"를{" "}
            <span>건축물대장에서 찾을 수 없을 경우 </span>
            건축물대장에 쓰여 있는 <span>층별용도 기준으로 작성</span>해주세요.
          </blockquote>
        </div>
        <div className={classes.innerBlock}>
          <p>
            <span>이렇게 작성해주세요!</span>
          </p>
          <figure>⭕ 다가구주택</figure>
          <p>
            <span>이렇게 작성하면 안돼요!</span>
          </p>
          <figure>
            ❌
            <div>
              깨끗한 단독주택
              <mark>
                <code>
                  <small>→ 건물 종류 외의 문구가 포함되면 안돼요.</small>
                </code>
              </mark>
            </div>
          </figure>
          <figure>
            ❌
            <div>
              💯 단독주택
              <mark>
                <code>
                  <small>→ 이모티콘이 들어가면 안돼요.</small>
                </code>
              </mark>
            </div>
          </figure>
          <p>
            단, 미등기건물 중 관계법령에 따라{" "}
            <span>
              건축허가나 신고 등을 하였으나 등기가 완료되지 않은 건축물인 경우
            </span>
            에는 신청서에 기재된 용도를 같이 작성할 수 있습니다.
          </p>
          <p>
            <span>이렇게 작성해주세요!</span>
          </p>
          <figure>⭕ 공동주택 (미등기 건물)</figure>
          <p>
            <span>이렇게 작성하면 안돼요!</span>
          </p>
          <figure>
            ❌
            <div>
              공동주택 🚨 미등기 건물
              <mark>
                <code>
                  <small>→ 이모티콘이 들어가면 안돼요.</small>
                </code>
              </mark>
            </div>
          </figure>
          <p>
            <span>
              단독주택, 다가구주택, 공동주택 등 정확한 건물 종류 작성을
              부탁드립니다!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HousePurpose;
