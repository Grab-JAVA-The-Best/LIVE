import axiosInstance, { getAuthHeader } from "../util/axios";

export const searchRealtorList = (params) => {
  const headers = getAuthHeader();

  return axiosInstance.get(`realtors/region`, { params, headers });
};

export const searchReservationRealtorDetail = (realtorNo, params) => {
  const headers = getAuthHeader();
  return axiosInstance.get(`realtors/${realtorNo}/consultings`, {
    params,
    headers,
  });
};

export const registResevation = (data) => {
  const headers = getAuthHeader();
  axiosInstance
    .post(`consultings`, data, { headers })
    .then((res) => {})
    .catch((err) => {
      console.error(err);
    });
};

export const getReservationList = async (data) => {
  let result = null;
  await axiosInstance
    .get(`consultings?situation=${data}`, {
      headers: getAuthHeader(),
    })
    .then((data) => {
      result = data.data;
    });
  return result;
};

export const getTodayReservationList = async () => {
  let result = null;
  await axiosInstance
    .get(`consultings/today`, {
      headers: getAuthHeader(),
    })
    .then((data) => {
      result = data.data;
    });
  return result;
};

export const getReservationDetail = async (data) => {
  let result = null;
  await axiosInstance
    .get(`consultings/${data}`, {
      headers: getAuthHeader(),
    })
    .then((data) => {
      result = data.data;
    });
  return result;
};

export const changeReservationStatus = async (data) => {
  const headers = getAuthHeader();
  let result = null;
  await axiosInstance
    .patch(
      "consultings",
      {
        consultingNo: data["consultingNo"],
        status: data["status"],
      },
      { headers: headers }
    )
    .then((res) => {
      result = res.data;
    })
    .catch((err) => {
      console.error(err);
    });
  return result;
};
