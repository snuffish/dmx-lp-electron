import { RgbColor } from 'launchpad.js'

export const randomRGB = (): RgbColor => {
  const num = Math.round(0xffffff * Math.random())
  const r = num >> 16
  const g = (num >> 8) & 255
  const b = num & 255

  return [r, g, b]
}

const componentToHex = (c: number): string => {
  var hex = c.toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

export const rgbToHex = ([r, g, b]: RgbColor) =>
  '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)

export const COLORS: Record<string, RgbColor> = {
  OFF: [0, 0, 0],
  RED: [255, 0, 0],
  GREEN: [0, 255, 0],
  BLUE: [0, 0, 255],
  WHITE: [255, 255, 255]

}
