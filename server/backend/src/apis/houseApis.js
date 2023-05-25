import { useDispatch } from "react-redux";
import { houseActions } from "../store/house-slice";
import axiosInstance, { getAuthHeader } from "../util/axios";

export const registHouseData = async (data) => {
  const formData = new FormData();

  formData.append(
    "itemRegistRequest",
    new Blob([JSON.stringify(data.jsonData)], { type: "application/json" })
  );

  data.files.forEach((element) => {
    formData.append("files", element);
  });

  const headers = getAuthHeader();

  const sendRequest = async () => {
    const response = await axiosInstance.post("items", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...headers,
      },
    });

    return response.data.result;
  };

  try {
    const response = await sendRequest();
    return response;
  } catch (error) {
    alert("등록에 실패했습니다.");
  }
};

export const findHouseByAddress = async (data) => {
  const getData = async () => {
    const response = await axiosInstance.get("/houses", {
      params: {
        address: data.address,
        addressDetail: data.addressDetail,
      },
    });

    return response.data;
  };

  try {
    const response = await getData();
    return response;
  } catch {
    alert("조회에 실패했습니다.");
  }
};

export const getHouseByItemNo = async (data) => {
  const headers = getAuthHeader();

  const getData = async () => {
    const response = await axiosInstance.get(`/items/${data}`, { headers });

    return response.data;
  };

  try {
    const response = await getData();

    return response;
  } catch {}
};

export const modifyHouseData = async (data) => {
  const formData = new FormData();

  formData.append(
    "itemUpdateRequest",
    new Blob([JSON.stringify(data.jsonData)], { type: "application/json" })
  );

  data.files.forEach((element) => {
    formData.append("files", element);
  });

  const headers = getAuthHeader();

  const sendRequest = async () => {
    const response = await axiosInstance.put(
      `/items/${data.jsonData.itemNo}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...headers,
        },
      }
    );

    return response.data;
  };

  try {
    const response = await sendRequest();

    return response;
  } catch (error) {
    alert("수정에 실패했습니다.");
  }
};

export const getItemListBySearch = async (data) => {
  let response = [];

  const headers = getAuthHeader();

  await axiosInstance
    .post(`items/regions`, data, {
      headers,
    })
    .then((res) => {
      if (res) {
        response = res.data.data;
      }
    });

  return response;
};

export const getRealtorsHouseList = async (dispatch) => {
  const headers = getAuthHeader();

  const getData = async () => {
    const response = await axiosInstance.get("/items/realtor", { headers });

    await dispatch(houseActions.setHouseList(response.data.data));
  };

  try {
    await getData();
  } catch {}
};
