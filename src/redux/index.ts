import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./features/user";

const store = configureStore({
  reducer: {
    currentUser: userReducers
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;