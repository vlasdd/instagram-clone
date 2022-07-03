import { configureStore } from "@reduxjs/toolkit";
import signedUserReducers from "./features/signedUser";
import userOnPageReducers from "./features/userOnPage";
import currentPostReducers from "./features/currentPost";

const store = configureStore({
  reducer: {
    signedUser: signedUserReducers,
    userOnPage: userOnPageReducers,
    currentPost: currentPostReducers,
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;