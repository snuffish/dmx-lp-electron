import { BUTTON_DOWN, BUTTON_UP } from 'Constants/events'
import { CHANNELS } from 'Constants/ipc'
import { ReceiveProps } from 'Types/index'
import { COLORS } from 'Utils/color'
import { setButtonColor } from 'Utils/launchpad'
import { RgbColor } from 'launchpad.js'
import React, { useState } from 'react'

type Props = {
  button: number,
  onClick?: Function,
  onRelease?: Function,
  color?: RgbColor
}

const Pad = ({ button, color, onClick, onRelease }: Props) => {
  const [rgbColor, setRgbColor] = useState(color ?? COLORS.OFF)
  
  setButtonColor(button, rgbColor)

  window.api.receive(CHANNELS.LP.PAD, ({ event, button: _button }: ReceiveProps) => {
    if (_button !== button)
      return

      if (event === BUTTON_DOWN && onClick) {
        onClick()
        return
      }
      
      if (event === BUTTON_UP && onRelease) {
        onRelease()
        return
      }
  })

  return (
    <></>
  )
}

export default Pad
