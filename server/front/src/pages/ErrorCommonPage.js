import { useNavigate, useRouteError } from "react-router-dom";

const ErrorCommonPage = ({ navigate, errorMsg }) => {
  const error = useRouteError();
  const navigation = useNavigate();

  return (
    <>
      <h1> Error Page ! </h1>
      {errorMsg ? (
        <p>{errorMsg}</p>
      ) : (
        <p> {error.error?.message ? error.error.message : error.message} </p>
      )}
      <button
        onClick={() => {
          navigation("/");
        }}
      >
        고 홈
      </button>
    </>
  );
};

export default ErrorCommonPage;
