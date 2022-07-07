import { configureStore } from "@reduxjs/toolkit";
import signedUserReducers from "redux-setup/features/signedUser";
import userOnPageReducers from "redux-setup/features/userOnPage";
import isBeingLoadedReducers from "./features/isBeingLoaded";

const store = configureStore({
  reducer: {
    signedUser: signedUserReducers,
    userOnPage: userOnPageReducers,
    isBeingLoaded: isBeingLoadedReducers,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;