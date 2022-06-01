import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import BirthdateState from "../../types/birthdate-type";
import UserState from "../../types/user-state-type";

const initialState: { user: UserState } = {
    user: {
        dateCreated: 0,
        emailAddress: "",
        following: [],
        followers: [],
        fullName: "",
        userId: "qe132",
        username: "usernameaa",
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
            console.log("//////////////////")
            console.log(action.payload)
            console.log("//////////////////")
            state.user = action.payload
        },
        removeActiveUser: (state) => {
            state = initialState
        }
    }
})

export default userSlice.reducer
export const { setActiveUser, removeActiveUser } = userSlice.actions;