import { CHANNELS } from "Constants/ipc"
import { IntRange } from "Types/index"
import { RgbColor } from "launchpad.js"
import { COLORS } from "./color"

type GridMappingProps = Record<number, number[]>
export type GridRowOrientation = 'horizontal' | 'vertical'

const Logo = 99

const TopPanel = {
  ArrowUp: 91,
  ArrowDown: 92,
  ArrowLeft: 93,
  ArrowRight: 94,
  Session: 95,
  Drums: 96,
  Keys: 97,
  User: 98
}

const RightPanel = {
  STOP_SOLO_MUTE: 19,
  Arrow1: 29,
  Arrow2: 39,
  Arrow3: 49,
  Arrow4: 59,
  Arrow5: 69,
  Arrow6: 79,
  Arrow7: 89,
}

export const Grid = {
  Logo,
  TopPanel,
  RightPanel
}

const horizontal: GridMappingProps = {
  1: [11, 12, 13, 14, 15, 16, 17, 18],
  2: [21, 22, 23, 24, 25, 26, 27, 28],
  3: [31, 32, 33, 34, 35, 36, 37, 38],
  4: [41, 42, 43, 44, 45, 46, 47, 48],
  5: [51, 52, 53, 54, 55, 56, 57, 58],
  6: [61, 62, 63, 64, 65, 66, 67, 68],
  7: [71, 72, 73, 74, 75, 76, 77, 78],
  8: [81, 82, 83, 84, 85, 86, 87, 88]
}

const vertical: GridMappingProps = {
  1: [11, 21, 31, 41, 51, 61, 71, 81],
  2: [12, 22, 32, 42, 52, 62, 72, 82],
  3: [13, 23, 33, 43, 53, 63, 73, 83],
  4: [14, 24, 34, 44, 54, 64, 74, 84],
  5: [15, 25, 35, 45, 55, 65, 75, 85],
  6: [16, 26, 36, 46, 56, 66, 76, 86],
  7: [17, 27, 37, 47, 57, 67, 77, 87],
  8: [18, 28, 38, 48, 58, 68, 78, 88]
}

export const GridAllButtons = Object.entries(horizontal).flatMap(([index, value]) => value)

export const GridLayout = { horizontal, vertical }

export const getGridRow = (row: IntRange<1, 9>, orientation: GridRowOrientation = 'vertical'): number[] => GridLayout[orientation][row]

export const setButtonColor = (button: number, color: RgbColor) => window.api.send(CHANNELS.LP.PAD_COLOR, { button, color })

export const clearGrid = () => GridAllButtons.map(button => setButtonColor(button, COLORS.OFF))

// Export to window global scope
window.lpClear = clearGrid
window.lpSetButtonColor = setButtonColor
