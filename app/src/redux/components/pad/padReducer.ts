import { createSlice } from '@reduxjs/toolkit'
import { COLORS, randomRGB } from 'Utils/color'
import { getAllButtons } from 'Utils/index'
import { NAME } from './padTypes'
import { RgbColor } from 'launchpad.js'

const padReducer = createSlice({
  name: NAME,
  initialState: {
    color: '',
    buttons: getAllButtons().reduce(
      (acc, value) => ({
        ...acc,
        [value]: { color: JSON.stringify(COLORS.OFF), isPressed: false },
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
    },
  },
})

export const { changeColor, setPressed } = padReducer.actions

export default padReducer.reducer
