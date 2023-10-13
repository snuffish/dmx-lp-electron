import { COLORS } from 'Utils/color'
import { setButtonColor } from 'Utils/launchpad'
import { RgbColor } from 'launchpad.js'
import React, { useState } from 'react'
import usePadHold from '../hooks/usePadHold'

type Props = {
  button: number,
  onPressed?: Function,
  onRelease?: Function,
  color?: RgbColor
}

const Pad = ({ button, color, onPressed: onPressed, onRelease }: Props) => {
  const [rgbColor, setRgbColor] = useState(color ?? COLORS.OFF)
  
  setButtonColor(button, rgbColor)

  const { seconds } = usePadHold(button)

  console.log("SECONDS=>>>", seconds)


  // window.api.receive(CHANNELS.LP.PAD, ({ event, button: _button }: ReceiveProps) => {
    // console.log("DSDS")
    // if (_button !== button)
    //   return

    //   if (event === BUTTON_DOWN && onPressed) {
    //     onPressed()
    //     return
    //   }
      
    //   if (event === BUTTON_UP && onRelease) {
    //     onRelease()
    //     return
    //   }
  // })

  return (
    <></>
  )
}

export default Pad
