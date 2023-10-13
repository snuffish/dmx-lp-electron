import { CHANNELS } from 'Constants/ipc'
import { ReceiveProps } from 'Types/index'
import { COLORS } from 'Utils/color'
import { setButtonColor } from 'Utils/launchpad'
import { RgbColor } from 'launchpad.js'
import React, { useState } from 'react'

type Props = { padButton: number, onClick?: Function, color?: RgbColor }
const Pad = ({ padButton, onClick, color }: Props) => {
  const [rgbColor, setRgbColor] = useState(color ?? COLORS.OFF)
  
  setButtonColor(padButton, rgbColor)

  window.api.receive(CHANNELS.LP.PAD, ({ event, button }: ReceiveProps) => {
    if (button !== padButton)
      return

      onClick && onClick()
  })

  return (
    <></>
  )
}

export default Pad
