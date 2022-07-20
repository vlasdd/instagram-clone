import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "firebase-setup/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { RootState } from "redux-setup";
import SavedPostType from "types/savePostType";
import { setSignedUser } from "../signedUser";

type SavedProps = { 
    userId: string, 
    postId: string 
}

const addToSaved = createAsyncThunk(
    "signedUser/addToSaved",
    async ({ userId, postId }: SavedProps, { rejectWithValue, dispatch, getState }) => {
        const loggedUser = (getState() as RootState).signedUser.user;

        const newPosts = [...loggedUser.savedPosts, { fromId: userId, postId: postId }] as SavedPostType[]

        dispatch(setSignedUser({ ...loggedUser, savedPosts: newPosts }))

        await updateDoc(doc(db, "users", loggedUser.userId), {
            savedPosts: newPosts
        })
    }
)

export default addToSaved