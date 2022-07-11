import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: { isBeingLoaded: boolean } = {
    isBeingLoaded: true
}

const isBeingLoadedSlice = createSlice({
    name: "signedUser",
    initialState: initialState,
    reducers: {
        setIsBeingLoaded: (state, action: PayloadAction<boolean>) => {
            state.isBeingLoaded = action.payload
        },
    },
})

export default isBeingLoadedSlice.reducer
export const { setIsBeingLoaded } = isBeingLoadedSlice.actions;