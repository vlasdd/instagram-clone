import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import BirthdateState from "../../types/birthdate-type";
import UserState from "../../types/user-state-type";

export const initialState: { user: UserState } = {
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
        posts: []
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
        }
    }
})

export default userOnPageSlice.reducer
export const { setUserOnPage, removeUserOnPage } = userOnPageSlice.actions;