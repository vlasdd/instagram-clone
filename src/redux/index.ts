import { configureStore } from "@reduxjs/toolkit";
import signedUserReducers from "./features/signedUser";
import userOnPageReducers from "./features/userOnPage";

const store = configureStore({
  reducer: {
    signedUser: signedUserReducers,
    userOnPage: userOnPageReducers
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;