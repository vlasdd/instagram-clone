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
import { useParams } from "react-router-dom";
import SavedPostType from "types/savePostType";

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

type UpdatePostsProps = {
    userId: string,
    newPosts: PostType[],
    uid: string,
}

export const updatePosts = createAsyncThunk(
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

type FollowingProps = {
    userId: string,
    uid: string,
}

export const addToFollowing = createAsyncThunk(
    "signedUser/addToFollowing",
    async ({ userId, uid }: FollowingProps, { rejectWithValue, dispatch, getState }) => {
        const loggedUser = (getState() as RootState).signedUser.user;
        const userOnPage = (getState() as RootState).userOnPage.user;

        const newUser = { userId }

        await updateDoc(doc(db, "users", loggedUser.userId), {
            following: [...loggedUser.following, newUser]
        })

        dispatch(setSignedUser({ ...loggedUser, following: [...loggedUser.following, newUser] }))

        if (uid === loggedUser.userId) {
            dispatch(setUserOnPage({ ...loggedUser, following: [...loggedUser.following, newUser] }))
        }

        const userToUpdate = await getDoc(doc(db, "users", userId));

        const modifiedFollowers = [ ...(userToUpdate.data() as UserState).followers, { userId: loggedUser.userId } ];
        await updateDoc(doc(db, "users", userId), {
            followers: modifiedFollowers
        })

        if (userId === userOnPage.userId) {
            dispatch(setUserOnPage({ ...(userToUpdate.data() as UserState), followers: modifiedFollowers }))
        }
    }
)

export const removeFromFollowing = createAsyncThunk(
    "signedUser/removeFromFollowing",
    async ({ userId, uid }: FollowingProps, { rejectWithValue, dispatch, getState }) => {
        const loggedUser = (getState() as RootState).signedUser.user;
        const userOnPage = (getState() as RootState).userOnPage.user;

        const filteredFollowing = loggedUser.following.filter(data => data.userId !== userId);

        await updateDoc(doc(db, "users", loggedUser.userId), {
            following: filteredFollowing
        })

        dispatch(setSignedUser({ ...loggedUser, following: filteredFollowing }))

        if (uid === loggedUser.userId) {
            dispatch(setUserOnPage({ ...loggedUser, following: filteredFollowing }))
        }

        const userToUpdate = await getDoc(doc(db, "users", userId));

        const modifiedFollowers = (userToUpdate.data() as UserState).followers.filter(data => data.userId !== loggedUser.userId);
        await updateDoc(doc(db, "users", userId), {
            followers: modifiedFollowers
        })

        if (userId === userOnPage.userId) {
            dispatch(setUserOnPage({ ...(userToUpdate.data() as UserState), followers: modifiedFollowers }))
        }
    }
)

type SavedProps = { 
    userId: string, 
    postId: string 
}

export const addToSaved = createAsyncThunk(
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

export const removeFromSaved = createAsyncThunk(
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
        builder.addCase(updatePosts.pending, (state) => {
            state.error = null;
            state.status = "loading";
        })
        builder.addCase(updatePosts.fulfilled, (state, action) => {
            state.error = null;
            state.status = "resolved";
        })
        builder.addCase(updatePosts.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "rejected";
        })
        builder.addCase(addToFollowing.pending, (state) => {
            state.error = null;
            state.status = "loading";
        })
        builder.addCase(addToFollowing.fulfilled, (state, action) => {
            state.error = null;
            state.status = "resolved";
        })
        builder.addCase(addToFollowing.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "rejected";
        })
        builder.addCase(removeFromFollowing.pending, (state) => {
            state.error = null;
            state.status = "loading";
        })
        builder.addCase(removeFromFollowing.fulfilled, (state, action) => {
            state.error = null;
            state.status = "resolved";
        })
        builder.addCase(removeFromFollowing.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "rejected";
        })
        builder.addCase(addToSaved.pending, (state) => {
            state.error = null;
            state.status = "loading";
        })
        builder.addCase(addToSaved.fulfilled, (state, action) => {
            state.error = null;
            state.status = "resolved";
        })
        builder.addCase(addToSaved.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "rejected";
        })
        builder.addCase(removeFromSaved.pending, (state) => {
            state.error = null;
            state.status = "loading";
        })
        builder.addCase(removeFromSaved.fulfilled, (state, action) => {
            state.error = null;
            state.status = "resolved";
        })
        builder.addCase(removeFromSaved.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "rejected";
        })
    }
})

export default signedUserSlice.reducer
export const { setSignedUser, removeSignedUser, clearErrors } = signedUserSlice.actions;