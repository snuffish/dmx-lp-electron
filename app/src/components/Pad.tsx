import { COLORS } from 'Utils/color'
import { setButtonColor } from 'Utils/launchpad'
import { RgbColor } from 'launchpad.js'
import React, { useState } from 'react'
import usePadHold from '../hooks/usePadHold'
import { Button } from 'Types/index'

type Props = Button & {
  onPressed?: Function,
  onRelease?: Function,
  color?: RgbColor
}

const Pad = ({ button, color, onPressed: onPressed, onRelease }: Props) => {
  const [rgbColor, setRgbColor] = useState(color ?? COLORS.OFF)
  
  setButtonColor(button, rgbColor)

  const { seconds } = usePadHold(button)

  console.log("SECONDS=>>>", seconds)

  return (
    <></>
  )
}

export default Pad
