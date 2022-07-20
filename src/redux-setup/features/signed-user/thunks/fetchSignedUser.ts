import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "firebase-setup/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { setUserOnPage } from "redux-setup/features/user-on-page/userOnPage";
import UserState from "types/userStateType";
import { setSignedUser } from "../signedUser";

const fetchSignedUser = createAsyncThunk(
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

export default fetchSignedUser