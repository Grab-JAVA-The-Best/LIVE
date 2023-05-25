import axiosInstance, { getAuthHeader } from "../util/axios";

export const getConsultingList = async (situation) => {
  const headers = getAuthHeader();
  let result = null;

  await axiosInstance
    .get("consultings", { params: { situation }, headers })
    .then((res) => {
      result = res;
    })
    .catch((err) => console.error(err));

  return result;
};

export const getConsultingDetail = async (consultingNo) => {
  const headers = getAuthHeader();
  let result = null;

  await axiosInstance
    .get(`consultings/${consultingNo}`, { headers })
    .then((res) => {
      result = res.data;
    })
    .catch((err) => console.error(err));

  return result;
};

export const registConsultingItems = (consultingNo, data) => {
  const headers = getAuthHeader();
  axiosInstance.post(`consultings/${consultingNo}/items`, data, {
    headers,
  });
};

export const registConsultingRoomLink = async (consultingNo, link) => {
  const headers = getAuthHeader();
  axiosInstance
    .post(`/consultings/${consultingNo}`, { link }, { headers })
    .then()
    .catch((err) => {
      err;
    });
};

export const changeConsultinRoomNo = (consultingNo, status) => {
  const headers = getAuthHeader();
  const data = { consultingNo, status };
  axiosInstance.patch("consultings", data, {
    headers,
  });
};
