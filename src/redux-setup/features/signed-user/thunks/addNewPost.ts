import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { db, storage } from "firebase-setup/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { RootState } from "redux-setup";
import { setIsBeingLoaded } from "redux-setup/features/is-being-loaded/isBeingLoaded";
import { setUserOnPage } from "redux-setup/features/user-on-page/userOnPage";
import { v4 } from "uuid";
import { setSignedUser } from "../signedUser";

type CreatePostProps = {
    image: any[],
    text: string,
}

const addNewPost = createAsyncThunk(
    "signedUser/createPost",
    async ({image, text}: CreatePostProps, { rejectWithValue, dispatch, getState }) => {
        const user = (getState() as RootState).signedUser.user;
        const userOnPage = (getState() as RootState).userOnPage.user;

        try {
            dispatch(setIsBeingLoaded(true));
            const imageRef = ref(storage, `Images/${image[0].name + v4()}`)
            await uploadBytes(imageRef, image[0])

            const imageUrl = await getDownloadURL(imageRef);

            const newPost = {
                postId: nanoid(),
                postImage: imageUrl,
                likes: [],
                comments: [],
                text: text,
                fromId: user.userId,
                createdAt: (new Date()).getTime(),
            }

            await updateDoc(doc(db, "users", user.userId), {
                posts: [...user.posts, newPost]
            })

            dispatch(setSignedUser({ ...user, posts: [...user.posts, newPost] }));

            if (user.userId === userOnPage.userId) {
                dispatch(setUserOnPage({ ...user, posts: [...user.posts, newPost] }))
            }

            dispatch(setIsBeingLoaded(false));
        } catch (error) {
            dispatch(setIsBeingLoaded(false));
            if (error instanceof Error) {
                return rejectWithValue(error.message)
            }
            else {
                return rejectWithValue("Unknown error")
            }
        }
    }
)

export default addNewPost