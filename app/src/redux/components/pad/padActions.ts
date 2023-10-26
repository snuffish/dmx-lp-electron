import { RgbColor } from 'launchpad.js'
import { CHANGE_COLOR, SET_PRESSED, CHANGE_TEMPO, SET_BRIGHTNESS } from './padTypes'

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

export const changeTempo = (tempo: number) => ({
  type: CHANGE_TEMPO,
  payload: {
    tempo
  }
})

export const setBrightness = (brightness: number) => ({
  type: SET_BRIGHTNESS,
  payload: {
    brightness
  }
})