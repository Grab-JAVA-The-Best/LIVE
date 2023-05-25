import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import session from "redux-persist/lib/storage/session";
import persistReducer from "redux-persist/es/persistReducer";
import houseSlice from "./house-slice";
import reservedItemSlice from "./reserved-item-slice";
import userSlice from "./user-slice";

const reducers = combineReducers({
  house: houseSlice.reducer,
  user: userSlice.reducer,
  reserve: reservedItemSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage: session,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
