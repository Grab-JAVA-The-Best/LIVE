import axiosInstance from "../util/axios";
import { getAuthHeader } from "../util/axios";

export const getContractInfoByItemNo = async (data) => {
  const headers = getAuthHeader();

  const getData = async () => {
    const response = await axiosInstance.get(`/consultings/contracts/${data}`, {
      headers,
    });

    if (response.data.result === "fail") {
      throw new Error(404);
    }

    return response.data;
  };

  try {
    const response = await getData();

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getContractList = async (data) => {
  const headers = getAuthHeader();

  const getData = async () => {
    const response = await axiosInstance.get("/contracts", {
      params: {
        status: data,
      },
      headers,
    });

    return response.data;
  };

  try {
    const response = await getData();

    return response;
  } catch {}
};

export const getContractInfoByContractNo = async (data) => {
  const headers = getAuthHeader();

  const getData = async () => {
    const response = await axiosInstance.get(`/contracts/${data}`, {
      headers,
    });

    if (response.data.result === "fail") {
      throw new Error(404);
    }

    return response.data;
  };

  try {
    const response = await getData();

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
