import { createSlice } from "@reduxjs/toolkit";

const houseSlice = createSlice({
  name: "house",
  initialState: {
    houseList: [],
  },
  reducers: {
    setHouseList(state, action) {
      state.houseList = action.payload;
    },
  },
});

export const houseActions = houseSlice.actions;

export default houseSlice;
