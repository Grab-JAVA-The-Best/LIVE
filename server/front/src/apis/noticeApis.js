import axiosInstance, { getAuthHeader } from "../util/axios";

export const getAlertList = async () => {
  const headers = getAuthHeader();
  let result = null;
  await axiosInstance
    .get("notices", { headers: headers })
    .then((res) => {
      result = res.data.data;
    })
    .catch((err) => {});
  return result;
};
