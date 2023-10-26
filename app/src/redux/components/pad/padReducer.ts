import { createSlice } from '@reduxjs/toolkit'
import { COLORS } from 'Utils/color'
import { getAllButtons } from 'Utils/index'
import { NAME } from './padTypes'

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
    tempo: 430,
    brightness: 1
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
    changeTempo(state: any, action) {
      const { tempo } = action.payload
      state.tempo = tempo
    },
    setBrightness(state: any, action) {
      const { brightness } = action.payload
      state.brightness = brightness
    }
  },
})

export const { changeColor, setPressed, changeTempo } = padReducer.actions

export default padReducer.reducer
