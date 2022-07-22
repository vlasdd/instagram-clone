import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "firebase-setup/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { RootState } from "redux-setup";
import { setUserOnPage } from "redux-setup/features/user-on-page/userOnPage";
import PostType from "types/postType";
import { setSignedUser } from "../../signed-user/signedUser";

type UpdatePostsProps = {
    userId: string,
    newPosts: PostType[],
    uid: string,
}

const updatePosts = createAsyncThunk(
    "signedUser/updatePosts",
    async ({ userId, newPosts, uid }: UpdatePostsProps, { rejectWithValue, dispatch, getState }) => {
        const loggedUser = (getState() as RootState).signedUser.user;
        const userOnPage = (getState() as RootState).userOnPage.user;

        if (uid === userId) {
            dispatch(setUserOnPage({ ...userOnPage, posts: newPosts }))
        }
        
        if (userOnPage.userId === loggedUser.userId) {
            dispatch(setSignedUser({ ...loggedUser, posts: newPosts }))
        }

        await updateDoc(doc(db, "users", userId), {
            posts: newPosts
        })
    }
)

export default updatePosts