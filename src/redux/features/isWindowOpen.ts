import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { isWindowOpen: boolean } = {
    isWindowOpen: false
}
const windowSlice = createSlice({
    name: "isWindowOpen",
    initialState,
    reducers: {
        setIsWindowOpen: (state, action: PayloadAction<boolean>) => {
            state.isWindowOpen = action.payload
        },
        toggleIsWindowOpen: (state) => {
            state.isWindowOpen = !state.isWindowOpen
        }
    }
})

export default windowSlice.reducer
export const { setIsWindowOpen, toggleIsWindowOpen } = windowSlice.actions;