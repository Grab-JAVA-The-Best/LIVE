import { userAction } from "../store/user-slice";
import axiosInstance, { getAuthHeader } from "../util/axios";
import store from "../store/store";

export const userLogin = async (data, dispatch) => {
  let result = {
    accessToken: null,
    refreshToken: null,
    message: null,
  };

  await axiosInstance
    .post(`users/login`, data, {})
    .then(({ data }) => {
      if (data.state === 200) {
        result = data.data;
        dispatch(userAction.login(result));
      } else {
        result["message"] = data.message;
      }
    })
    .catch((err) => {
      console.error(err);
    });

  return result;
};

export const userLogout = async (dispatch) => {
  const headers = getAuthHeader();

  await axiosInstance.post("users/logout", undefined, { headers }).then((res) => {
    dispatch(userAction.logout());
  });
};

export const getUserInfo = async (accessToken) => {
  let userInfo = null;

  const myAccessToken = store.getState().user.accessToken;

  if (accessToken) {
    await axiosInstance
      .get("users", {
        headers: getAuthHeader(),
      })
      .then((res) => {
        if (res.data.state === 200) {
          userInfo = res.data.data;
          return userInfo;
        }
      });
  } else {
    const headers = getAuthHeader();

    await axiosInstance
      .get("users", {
        headers,
      })
      .then((res) => {
        const data = res.data;

        if (data.state === 200) {
          userInfo = data.data;
          return userInfo;
        }
      });
  }

  return userInfo;
};

export const realtorLogin = async (data, dispatch) => {
  let result = {
    accessToken: null,
    refreshToken: null,
    message: null,
  };
  await axiosInstance
    .post(`realtors/login`, data, {})
    .then(({ data }) => {
      if (data.state === 200) {
        result = data.data;
        dispatch(userAction.login(result));
      } else {
        result["message"] = data.message;
      }
    })
    .catch((err) => {
      console.error(err);
    });

  return result;
};

export const getRealtorInfo = async (accessToken) => {
  let realtorInfo = null;

  const myAccessToken = store.getState().user.accessToken;

  if (accessToken) {
    await axiosInstance
      .get("realtors", {
        headers: getAuthHeader(),
      })
      .then((res) => {
        if (res.data.state === 200) {
          realtorInfo = res.data.data;
          return realtorInfo;
        }
      });
  } else {
    const headers = getAuthHeader();

    await axiosInstance
      .get("realtors", {
        headers,
      })
      .then((res) => {
        const data = res.data;

        if (data.state === 200) {
          realtorInfo = data.data;
          return realtorInfo;
        }
      });
  }

  return realtorInfo;
};

export const realtorLogout = async (dispatch) => {
  const headers = getAuthHeader();

  await axiosInstance.post("realtors/logout", undefined, { headers }).then((res) => {
    dispatch(userAction.logout());
  });
};

export const realtorRank = async (orderBy) => {
  let rankInfo = {};
  await axiosInstance.get(`realtors/popular?orderBy=${orderBy}`).then(({ data }) => {
    if (data.state === 200) {
      rankInfo = data.data;
    }
  });
  return rankInfo;
};
