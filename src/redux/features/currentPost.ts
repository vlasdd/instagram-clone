import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PostType from "../../types/post-type";

type InitialStateType = {
    post: PostType
}

export const initialState: InitialStateType = {
    post: {
        postId: "",
        postImage: "",
        likes: [],
        comments: [],
        text: "",
        fromId: "",
    }
}

const currentPostSlice = createSlice({
    name: "currentPost",
    initialState,
    reducers: {
        setCurrentPost: (state, action: PayloadAction<PostType>) => {
            state.post = action.payload
        },
        removeCurrentPost: (state) => {
            state.post = initialState.post
        }
    },
})

export default currentPostSlice.reducer
export const { setCurrentPost, removeCurrentPost } = currentPostSlice.actions;