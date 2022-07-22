import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "firebase-setup/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { RootState } from "redux-setup";
import PostType from "types/postType";
import UserState from "types/userStateType";
import { nanoid } from "nanoid";
import updatePosts from "../../user-on-page/thunks/updatePosts";

type CreateNewCommentProps = {
    text: string,
    fromId: string,
    postId: string
    uid: string,
    changePosts: any,
}

const createNewComment = createAsyncThunk(
    "signedUser/createNewComment",
    async (
        { text, fromId, postId, uid, changePosts }: CreateNewCommentProps, 
        { rejectWithValue, dispatch, getState }
    ) => {
        const loggedUser = (getState() as RootState).signedUser.user;

        const hotPosts = ((await getDoc(doc(db, "users", fromId))).data() as UserState).posts
        const hotPost = hotPosts.find(post => post.postId === postId) as PostType

        const newComment = {
            userId: loggedUser.userId,
            text: text,
            likes: [],
            commentId: nanoid(),
            createdAt: (new Date()).getTime()
        }

        const newPosts = hotPosts.map(post => {
            if (post.postId === postId) {
                return { ...post, comments: [...hotPost.comments, newComment] }
            }

            return post
        }) as PostType[]

        await dispatch(updatePosts({ userId: fromId, newPosts, uid }))

        changePosts((prevPosts: PostType[]) => prevPosts.map(post => {
            if (post.postId === postId) {
                return { ...post, comments: [...hotPost.comments, newComment] }
            }

            return post
        }) as PostType[])
    }
)

export default createNewComment