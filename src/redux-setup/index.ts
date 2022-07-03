import { configureStore } from "@reduxjs/toolkit";
import signedUserReducers from "redux-setup/features/signedUser";
import userOnPageReducers from "redux-setup/features/userOnPage";
import currentPostReducers from "redux-setup/features/currentPost";

const store = configureStore({
  reducer: {
    signedUser: signedUserReducers,
    userOnPage: userOnPageReducers,
    currentPost: currentPostReducers,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;