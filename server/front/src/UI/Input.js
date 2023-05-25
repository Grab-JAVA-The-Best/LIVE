import classes from "./Input.module.scss";

/**
label : 라벨 글씨
isValid : input이 사라진다
slideInput : 그냥 인풋 클래스 이름
type : 타입
id : id
value : value
onChange : value가 바뀔때 발동되는 액션
onBlur : 입력에서 떨어졌을 때 발동되는 함수
 */

const Input = (props) => {
  return (
    <div className={`${classes.inputBox} ${props.isValid ? "none" : ""}`}>
      <input
        className={classes.slideInput}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export default Input;
