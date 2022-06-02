import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./features/user";
import windowReducers from "./features/isWindowOpen";
import modalReducers from "./features/isModalOpen";

const store = configureStore({
  reducer: {
    currentUser: userReducers,
    isWindowOpen: windowReducers,
    isModalOpen: modalReducers,
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;