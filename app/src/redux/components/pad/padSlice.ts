import { createSlice } from "@reduxjs/toolkit";

const padSlice = createSlice({
  name: 'pad',
  initialState: {
    color: JSON.stringify([0, 255, 0])
  },
  reducers: {
    changeColor(state, action) {
      console.log("REDUCER =>", action.payload)
      state.color = action.payload
    }
  }
})

export const { changeColor } = padSlice.actions

export default padSlice.reducer
