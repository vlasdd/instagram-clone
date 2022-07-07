import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebase-setup/firebaseConfig";
import BirthdateState from "types/birthdate-type";
import UserState from "types/user-state-type";
import { setUserOnPage } from "./userOnPage";

export const initialState: { 
    isBeingLoaded: boolean 
} = {
    isBeingLoaded: true
}

const isBeingLoadedSlice = createSlice({
    name: "signedUser",
    initialState: initialState,
    reducers: {
        setIsBeingLoaded: (state, action: PayloadAction<boolean>) => {
            state.isBeingLoaded = action.payload
        },
    },
})

export default isBeingLoadedSlice.reducer
export const { setIsBeingLoaded } = isBeingLoadedSlice.actions;