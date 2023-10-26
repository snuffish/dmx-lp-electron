// @ts-nocheck
import { COLORS } from "Utils/color"
import { Grid, setButtonColor } from "Utils/launchpad"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"

const setBrightness = (direction: 'UP' | 'DOWN') => {
  let ratio = window.brightnessRatio
  // if (ratio === 0 || ratio === 100) return

  if (direction === 'UP')
    ratio += 5

  if (direction === 'DOWN')
    ratio -= 5

  window.brightnessRatio = ratio
  console.log("RATIO => ", window.brightnessRatio)
}

const BrightnessComponent = () => {
  const brightness = useSelector((state: any) => state.pad.brightness)
  const upArrowIsPressed = useSelector((state: any) => state.pad.buttons[Grid.TopPanel.UpArrow].isPressed)
  const downArrowIsPressed = useSelector((state: any) => state.pad.buttons[Grid.TopPanel.DownArrow].isPressed)

  useEffect(() => {
    setButtonColor(91, COLORS.WHITE)
    setButtonColor(92, COLORS.WHITE)
  }, [])

  useEffect(() => {
    upArrowIsPressed && setBrightness('UP')
    downArrowIsPressed && setBrightness('DOWN')
  }, [upArrowIsPressed, downArrowIsPressed])

  return (
    <></>
  )
}

export default BrightnessComponent