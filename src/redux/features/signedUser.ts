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
        posts: [],
    }
}

const signedUserSlice = createSlice({
    name: "signedUser",
    initialState,
    reducers: {
        setSignedUser: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload
        },
        removeSignedUser: (state) => {
            state.user = initialState.user
        }
    }
})

export default signedUserSlice.reducer
export const { setSignedUser, removeSignedUser } = signedUserSlice.actions;