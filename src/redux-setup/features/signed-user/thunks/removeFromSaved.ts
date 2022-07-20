import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "firebase-setup/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { RootState } from "redux-setup";
import { setSignedUser } from "../signedUser";

type SavedProps = { 
    userId: string, 
    postId: string 
}

const removeFromSaved = createAsyncThunk(
    "signedUser/removeFromSaved",
    async ({ userId, postId }: SavedProps, { rejectWithValue, dispatch, getState }) => {
        const loggedUser = (getState() as RootState).signedUser.user;

        const newPosts = loggedUser.savedPosts.filter(post => post.postId !== postId)
        
        dispatch(setSignedUser({ ...loggedUser, savedPosts: newPosts }))

        await updateDoc(doc(db, "users", loggedUser.userId), {
            savedPosts: newPosts
        })
    }
)

export default removeFromSaved