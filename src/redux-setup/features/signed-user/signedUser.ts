import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import BirthdateState from "types/birthdateType";
import UserState from "types/userStateType";
import fetchSignedUser from "./thunks/fetchSignedUser";
import addNewPost from "./thunks/addNewPost";
import createNewComment from "./thunks/createNewComment";
import createNewProfileImage from "./thunks/createNewProfileImage";
import deleteProfileImage from "./thunks/deleteProfileImage";
import addToFollowing from "./thunks/addToFollowing";
import removeFromFollowing from "./thunks/removeFromFollowing";
import removeFromSaved from "./thunks/removeFromSaved";
import addToSaved from "./thunks/addToSaved"

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

const signedUserSlice = createSlice({
    name: "signedUser",
    initialState,
    reducers: {
        setSignedUser: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload
        },
        removeSignedUser: (state) => {
            state.user = initialState.user
        },
        clearErrors: (state) => {
            state.error = null;
            state.status = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSignedUser.pending, (state) => {
            state.error = null;
            state.status = "loading";
        })
        builder.addCase(fetchSignedUser.fulfilled, (state) => {
            state.error = null;
            state.status = "resolved";
        })
        builder.addCase(fetchSignedUser.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "rejected";
        })
        builder.addCase(addNewPost.fulfilled, (state, action) => {
            state.error = null;
            state.status = "resolved";
        })
        builder.addCase(createNewComment.fulfilled, (state, action) => {
            state.error = null;
            state.status = "resolved";
        })
        builder.addCase(createNewProfileImage.fulfilled, (state, action) => {
            state.error = null;
            state.status = "resolved";
        })
        builder.addCase(deleteProfileImage.fulfilled, (state, action) => {
            state.error = null;
            state.status = "resolved";
        })
        builder.addCase(addToFollowing.fulfilled, (state, action) => {
            state.error = null;
            state.status = "resolved";
        })
        builder.addCase(removeFromFollowing.fulfilled, (state, action) => {
            state.error = null;
            state.status = "resolved";
        })
        builder.addCase(addToSaved.fulfilled, (state, action) => {
            state.error = null;
            state.status = "resolved";
        })
        builder.addCase(removeFromSaved.fulfilled, (state, action) => {
            state.error = null;
            state.status = "resolved";
        })
    }
})

export default signedUserSlice.reducer
export const { setSignedUser, removeSignedUser, clearErrors } = signedUserSlice.actions;