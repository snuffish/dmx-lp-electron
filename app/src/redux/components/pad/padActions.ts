import { RgbColor } from 'launchpad.js'
import { CHANGE_COLOR, SET_PRESSED } from './padTypes'

export const changeColor = (button: number, color: RgbColor) => ({
  type: CHANGE_COLOR,
  payload: {
    button,
    color,
  },
})

export const setPressed = (button: number, pressed: boolean) => ({
  type: SET_PRESSED,
  payload: {
    button,
    pressed,
  },
})
