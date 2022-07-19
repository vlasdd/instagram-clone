import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebase-setup/firebaseConfig";
import BirthdateState from "types/birthdateType";
import UserState from "types/userStateType";
import { setIsBeingLoaded } from "./isBeingLoaded";

type InitialStateType = {
    user: UserState,
    error: any,
    status: null | string,
}

export const fetchUserOnPage = createAsyncThunk(
    "userOnPage/fetchUserOnPage",
    async (uid: string, {rejectWithValue, dispatch}) => {
       // dispatch(setIsBeingLoaded(true));
        console.log("func page")

        try {
            const loggedUser = await getDoc(doc(db, "users", uid));

            if(!loggedUser.data()){
                throw new Error("No users registered with this ID");
            }

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

        //dispatch(setIsBeingLoaded(false))
    }
)

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

const userOnPageSlice = createSlice({
    name: "userOnPage",
    initialState,
    reducers: {
        setUserOnPage: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload
        },
        removeUserOnPage: (state) => {
            state = initialState
        },
        clearErrors: (state) => {
            state.error = null;
            state.status = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserOnPage.pending, (state) => {
            state.error = null;
            state.status = "loading";
        })
        builder.addCase(fetchUserOnPage.fulfilled, (state) => {
            state.error = null;
            state.status = "resolved";
        })
        builder.addCase(fetchUserOnPage.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "rejected";
        })
    }
})
 
export default userOnPageSlice.reducer
export const { setUserOnPage, removeUserOnPage, clearErrors } = userOnPageSlice.actions;