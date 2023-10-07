import { RgbColor } from "launchpad.js"

export const changeColor = (button: number, color: RgbColor) => ({
  type: "pad/changeColor",
  payload: {
    button,
    color,
  },
})

export const setPressed = (button: number, pressed: boolean) => ({
  type: "pad/setPressed",
  payload: {
    button,
    pressed,
  },
})
