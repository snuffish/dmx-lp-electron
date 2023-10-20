import { BUTTON_DOWN } from 'Constants/events'
import { CHANNELS } from 'Constants/ipc'
import { setPressed as setPressedAction } from 'Redux/components/pad/padActions'
import { Button } from 'Types/index'
import { setButtonColor } from 'Utils/launchpad'
import { RgbColor } from 'launchpad.js'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

type Props = Button & {
  onPressed?: Function,
  onRelease?: Function,
  color?: RgbColor
}

const Pad = ({ button, color, onPressed: onPressed, onRelease }: Props) => {
  const dispatch = useDispatch()
  const [isPressed, setPressed] = useState(false)
  const [rgbColor, setRgbColor] = useState() as any

  useEffect(() => {
    setRgbColor(color)
  }, [])

  useEffect(() => {
    setButtonColor(button, rgbColor)
  }, [rgbColor])

  useEffect(() => {
    isPressed && onPressed && onPressed()
    !isPressed && onRelease && onRelease()
  }, [isPressed])
  
  window.api.receive(CHANNELS.LP.PAD, ({ event, button: btn }: any) => {
    if (btn !== button) return
    setPressed(event === BUTTON_DOWN  ?? false)
    dispatch(setPressedAction(btn, event === BUTTON_DOWN ?? false))
  })
  
  return (
    <></>
  )
}

export default Pad
