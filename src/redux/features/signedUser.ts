import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import BirthdateState from "../../types/birthdate-type";
import UserState from "../../types/user-state-type";
import { setUserOnPage } from "./userOnPage";

type InitialStateType = {
    user: UserState,
    error: any,
    status: null | string,
}

export const fetchSignedUser = createAsyncThunk(
    "signedUser/fetchSignedUser",
    async (uid: string, {rejectWithValue, dispatch}) => {
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
        posts: []
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
    }
})

export default signedUserSlice.reducer
export const { setSignedUser, removeSignedUser, clearErrors } = signedUserSlice.actions;