import { createSlice } from '@reduxjs/toolkit'
import { ColorOff } from 'Utils/color'
import { getAllButtons } from 'Utils/index'
import { NAME } from './padTypes'

const padReducer = createSlice({
  name: NAME,
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
    changeColor(state: any, action) {
      const { button, color } = action.payload
      state.buttons[button].color = color
    },
    setPressed(state: any, action) {
      const { button, pressed } = action.payload
      state.buttons[button].isPressed = pressed
      console.log(state, action)
    },
  },
})

export const { changeColor, setPressed } = padReducer.actions

export default padReducer.reducer
