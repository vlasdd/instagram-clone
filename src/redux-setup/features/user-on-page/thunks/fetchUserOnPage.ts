import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "firebase-setup/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import UserState from "types/userStateType";
import { setUserOnPage } from "../userOnPage";

const fetchUserOnPage = createAsyncThunk(
    "userOnPage/fetchUserOnPage",
    async (uid: string, {rejectWithValue, dispatch}) => {
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
    }
)

export default fetchUserOnPage