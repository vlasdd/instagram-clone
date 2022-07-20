import { createAsyncThunk } from "@reduxjs/toolkit";
import { db, storage } from "firebase-setup/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { RootState } from "redux-setup";
import { setIsBeingLoaded } from "redux-setup/features/is-being-loaded/isBeingLoaded";
import { setSignedUser } from "../signedUser";

const deleteProfileImage = createAsyncThunk(
    "signedUser/deleteProfileImage",
    async (_, { rejectWithValue, dispatch, getState }) => {
        const currentUser = (getState() as RootState).signedUser.user;

        dispatch(setIsBeingLoaded(true))
        
        const imageRef = ref(storage, currentUser.profileImage);
        await deleteObject(imageRef);

        await updateDoc(doc(db, "users", currentUser.userId), {
            profileImage: ""
        });

        dispatch(setSignedUser({ ...currentUser, profileImage: "" }));
        dispatch(setIsBeingLoaded(false))
    }
)

export default deleteProfileImage