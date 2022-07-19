import { createAsyncThunk, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "firebase-setup/firebaseConfig";
import BirthdateState from "types/birthdateType";
import UserState from "types/userStateType";
import { setUserOnPage } from "./userOnPage";
import { setIsBeingLoaded } from "./isBeingLoaded";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import PostType from "types/postType";
import { RootState } from "redux-setup";

export const fetchSignedUser = createAsyncThunk(
    "signedUser/fetchSignedUser",
    async (uid: string, {rejectWithValue, dispatch}) => {
        console.log("func signed")

        try {
            const loggedUser = await getDoc(doc(db, "users", uid));

            if(!loggedUser.data()){
                throw new Error("No users registered with this ID");
            }

            dispatch(setSignedUser(loggedUser.data() as UserState))
            dispatch(setUserOnPage(loggedUser.data() as UserState))
        } 
        catch (error) {
            if(error instanceof Error){
                return rejectWithValue(error.message)
            }
            else{
                return rejectWithValue("Unknown error")
            }
        }
    }
)

type CreatePostProps = {
    image: any[],
    text: string,
}

export const addNewPost = createAsyncThunk(
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

type CreateNewCommentProps = {
    text: string,
    currentPostFromId: string,
    postId: string
    uid: string,
    usePostsObj: {
        posts: PostType[];
        changePosts: any;
    },
}

export const createNewComment = createAsyncThunk(
    "signedUser/createNewComment",
    async (
        { text, currentPostFromId, postId, uid, usePostsObj }: CreateNewCommentProps, 
        { rejectWithValue, dispatch, getState }
    ) => {
        const loggedUser = (getState() as RootState).signedUser.user;
        const userOnPage = (getState() as RootState).userOnPage.user;

        const hotPosts = ((await getDoc(doc(db, "users", currentPostFromId))).data() as UserState).posts
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

        await updateDoc(doc(db, "users", currentPostFromId), {
            posts: newPosts
        })

        if (uid === currentPostFromId) {
            dispatch(setUserOnPage({ ...userOnPage, posts: newPosts }))
        }

        if (userOnPage.userId === loggedUser.userId) {
            dispatch(setSignedUser({ ...loggedUser, posts: newPosts }))
        }

        if (usePostsObj?.changePosts) {
            usePostsObj.changePosts(newPosts)
        }
    }
)

type CreateNewProfileImageProps = {
    image: File
}

export const createNewProfileImage = createAsyncThunk(
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

export const deleteProfileImage = createAsyncThunk(
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
        builder.addCase(addNewPost.pending, (state) => {
            state.error = null;
            state.status = "loading";
        })
        builder.addCase(addNewPost.fulfilled, (state, action) => {
            state.error = null;
            state.status = "resolved";
        })
        builder.addCase(addNewPost.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "rejected";
        })
        builder.addCase(createNewComment.pending, (state) => {
            state.error = null;
            state.status = "loading";
        })
        builder.addCase(createNewComment.fulfilled, (state, action) => {
            state.error = null;
            state.status = "resolved";
        })
        builder.addCase(createNewComment.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "rejected";
        })
        builder.addCase(createNewProfileImage.pending, (state) => {
            state.error = null;
            state.status = "loading";
        })
        builder.addCase(createNewProfileImage.fulfilled, (state, action) => {
            state.error = null;
            state.status = "resolved";
        })
        builder.addCase(createNewProfileImage.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "rejected";
        })
        builder.addCase(deleteProfileImage.pending, (state) => {
            state.error = null;
            state.status = "loading";
        })
        builder.addCase(deleteProfileImage.fulfilled, (state, action) => {
            state.error = null;
            state.status = "resolved";
        })
        builder.addCase(deleteProfileImage.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "rejected";
        })
    }
})

export default signedUserSlice.reducer
export const { setSignedUser, removeSignedUser, clearErrors } = signedUserSlice.actions;