import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import fetchUserOnPage from "./thunks/fetch-user-on-page";
import BirthdateState from "types/birthdateType";
import UserState from "types/userStateType";

type InitialStateType = {
    user: UserState,
    error: any,
    status: null | string,
}

export const initialState: InitialStateType = {
    status: null,
    error: null,
    user: {
        dateCreated: 0,
        emailAddress: "",
        following: [],
        followers: [],
        fullName: "",
        userId: "",
        username: "",
        birthdate:  {} as BirthdateState,
        phoneNumber: "",
        profileImage: "",
        posts: [],
        savedPosts: [],
    }
}

const userOnPageSlice = createSlice({
    name: "userOnPage",
    initialState,
    reducers: {
        setUserOnPage: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload
        },
        removeUserOnPage: (state) => {
            state = initialState
        },
        clearErrors: (state) => {
            state.error = null;
            state.status = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserOnPage.pending, (state) => {
            state.error = null;
            state.status = "loading";
        })
        builder.addCase(fetchUserOnPage.fulfilled, (state) => {
            state.error = null;
            state.status = "resolved";
        })
        builder.addCase(fetchUserOnPage.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "rejected";
        })
    }
})
 
export default userOnPageSlice.reducer
export const { setUserOnPage, removeUserOnPage, clearErrors } = userOnPageSlice.actions;