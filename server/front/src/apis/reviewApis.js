import axiosInstance, { getAuthHeader } from "../util/axios";

export const getReviewList = async () => {
  return axiosInstance.get(`reviews`, {
    headers: getAuthHeader(),
  });
};

export const registReview = async (data) => {
  const headers = getAuthHeader();
  const sendRequest = async () => {
    const response = await axiosInstance.post("/reviews", data, {
      headers,
    });

    return response;
  };

  try {
    return sendRequest();
  } catch {}
};
