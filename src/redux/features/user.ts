import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import BirthdateState from "../../types/birthdate-type";
import UserState from "../../types/user-state-type";

export const initialState: { user: UserState } = {
    user: {
        dateCreated: 0,
        emailAddress: "",
        /*following: [
            {profileImage: "../images/default-avatar-image.jpg", username: "1231asd34", fullName: "1231243124", additionalInfo: "asdadasdasdad"},
            {profileImage: "../images/default-avatar-image.jpg", username: "asda", fullName: "sadasdasd"}
        ],
        followers: [
            {profileImage: "../images/default-avatar-image.jpg", username: "12313asdas4", fullName: "1231243124", },
            {profileImage: "../images/default-avatar-image.jpg", username: "asda", fullName: "sadasdasd", additionalInfo: "asdadasdasdad"}
        ],*/
        following: [],
        followers: [],
        fullName: "full name",
        userId: "jXvXw2V5w9fWoLqvEPfGLGp6wMy1",
        username: "usernamea",
        birthdate:  {} as BirthdateState,
        phoneNumber: "",
        profileImage: "",
        posts: []
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setActiveUser: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload
        },
        removeActiveUser: (state) => {
            state = initialState
        }
    }
})

export default userSlice.reducer
export const { setActiveUser, removeActiveUser } = userSlice.actions;