import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  refreshToken: null,
  userInfo: {
    id: null,
    name: "",
    isRealtor: null,
    profile: null,
    score: 0,
  },
};

const userSlice = createSlice({
  name: `user`,
  initialState,
  reducers: {
    login(state, { payload }) {
      const { accessToken, refreshToken } = payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logout(state) {
      state.userInfo = {
        id: null,
        name: "",
        isRealtor: null,
        profile: null,
        score: 0,
      };
      state.accessToken = null;
      state.refreshToken = null;
    },
    setInfo(state, { payload }) {
      const newInfo = { ...state.userInfo, ...payload };
      state.userInfo = newInfo;
    },
    setIsRealtor(state, { payload }) {
      state.userInfo = { ...state.userInfo, isRealtor: payload };
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;
