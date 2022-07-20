import { createAsyncThunk } from "@reduxjs/toolkit";
import { db, storage } from "firebase-setup/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { RootState } from "redux-setup";
import { setIsBeingLoaded } from "redux-setup/features/is-being-loaded/isBeingLoaded";
import { v4 } from "uuid";
import { setSignedUser } from "../signedUser";

type CreateNewProfileImageProps = {
    image: File
}

const createNewProfileImage = createAsyncThunk(
    "signedUser/createNewProfileImage",
    async ({ image }: CreateNewProfileImageProps, { rejectWithValue, dispatch, getState }) => {
        const currentUser = (getState() as RootState).signedUser.user;
        dispatch(setIsBeingLoaded(true))

        if (currentUser.profileImage !== "") {
            const deleteImageRef = ref(storage, currentUser.profileImage);
            await deleteObject(deleteImageRef);
        }

        const imageRef = ref(storage, `Images/${image.name + v4()}`)
        await uploadBytes(imageRef, image)

        const imageUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "users", currentUser.userId), {
            profileImage: imageUrl
        });

        dispatch(setSignedUser({ ...currentUser, profileImage: imageUrl }));
        dispatch(setIsBeingLoaded(false))
    }
)

export default createNewProfileImage