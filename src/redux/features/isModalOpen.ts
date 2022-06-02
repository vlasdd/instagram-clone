import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { isModalOpen: boolean } = {
    isModalOpen: false
}
const modalSlice = createSlice({
    name: "isModalOpen",
    initialState,
    reducers: {
        setIsModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isModalOpen = action.payload
        },
        toggleIsModalOpen: (state) => {
            state.isModalOpen = !state.isModalOpen
        }
    }
})

export default modalSlice.reducer
export const { setIsModalOpen, toggleIsModalOpen } = modalSlice.actions;