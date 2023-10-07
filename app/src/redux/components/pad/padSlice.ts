// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit"
import { ColorOff, randomRGB } from "../../../utils/color"
import { getAllButtons } from "../../../utils"

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
      console.log("PÅRESSED=>",action.payload)
      state.buttons[button].isPressed = pressed
    },
  },
})

export const { changeColor, setPressed } = padSlice.actions

export default padSlice.reducer
