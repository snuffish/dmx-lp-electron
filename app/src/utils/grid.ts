import { CHANNELS } from "Constants/ipc"
import { RgbColor } from "launchpad.js"

const GridLayout = {
  1: [11, 21, 31, 41, 51, 61, 71, 71, 81],
  2: [12, 22, 32, 42, 52, 62, 72, 72, 82],
  3: [13, 23, 33, 43, 53, 63, 73, 73, 83],
  4: [14, 24, 34, 44, 54, 64, 74, 74, 84],
  5: [15, 25, 35, 45, 55, 65, 75, 75, 85],
  6: [16, 26, 36, 46, 56, 66, 76, 76, 86],
  7: [17, 27, 37, 47, 57, 67, 77, 77, 87],
  8: [18, 28, 38, 48, 58, 68, 78, 78, 88]
}

export const getGridRow = (row: number)=> {
  // @ts-ignore
  return GridLayout[row]
}

export const setButtonColor = (button: number, color: RgbColor) => {
  window.api.send(CHANNELS.LP.PAD_COLOR, { button, color })
}