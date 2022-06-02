import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import BirthdateState from "../../types/birthdate-type";
import UserState from "../../types/user-state-type";

const initialState: { user: UserState } = {
    user: {
        dateCreated: 0,
        emailAddress: "",
        following: [
            {profileImage: "../images/default-avatar-image.jpg", username: "123134", fullName: "1231243124", isFollowed: true, additionalInfo: "asdadasdasdad"},
            {profileImage: "../images/default-avatar-image.jpg", username: "asda", fullName: "sadasdasd", isFollowed: false}
        ],
        followers: [
            {profileImage: "../images/default-avatar-image.jpg", username: "123134", fullName: "1231243124", isFollowed: true},
            {profileImage: "../images/default-avatar-image.jpg", username: "asda", fullName: "sadasdasd", isFollowed: false, additionalInfo: "asdadasdasdad"}
        ],
        fullName: "full name",
        userId: "qe132",
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