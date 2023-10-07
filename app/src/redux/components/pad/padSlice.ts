// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit"
import { getAllButtons } from "../../../utils"
import { ColorOff } from "../../../utils/color"

const padSlice = createSlice({
  name: "pad",
  initialState: {
    buttons: getAllButtons().reduce(
      (acc, value) => ({
        ...acc,
        [value]: { color: ColorOff, isPressed: false },
      }),
      {}
    ),
    isPressed: false,
  },
  reducers: {
    changeColor(state, action) {
      const { button, color } = action.payload
      state.buttons[button].color = color
    },
    setPressed(state, action) {
      const { button, pressed } = action.payload
      console.log("PRESS=>",button,pressed)
      state.buttons[button].isPressed = pressed
    },
  },
})

export const { changeColor, setPressed } = padSlice.actions

export default padSlice.reducer
