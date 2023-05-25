import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItems: [],
};

const reservedItemSlice = createSlice({
  name: `reservedItem`,
  initialState,
  reducers: {
    addItem(state, { payload }) {
      const newArray = [...state.selectedItems, payload];

      const filterArray = newArray.filter((el, idx) => {
        for (let index = 0; index < idx; index++) {
          const element = newArray[index];

          if (element.itemNo === el.itemNo) {
            return false;
          }
        }

        return true;
      });

      state.selectedItems = filterArray;
    },
    removeItem(state, { payload }) {
      state.selectedItems = state.selectedItems.filter(
        (el) => el.itemNo !== payload
      );
    },
    clearItem(state) {
      state.selectedItems = [];
    },
  },
});

export const reservedItemAction = reservedItemSlice.actions;

export default reservedItemSlice;
