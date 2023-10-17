import { COLORS } from 'Utils/color'
import { setButtonColor } from 'Utils/launchpad'
import { RgbColor } from 'launchpad.js'
import React, { useState, useEffect } from 'react'
import usePadHold from '../hooks/usePadHold'
import { Button } from 'Types/index'
import { CHANNELS } from 'Constants/ipc'
import { BUTTON_DOWN } from 'Constants/events'
import { setPressed } from 'Redux/components/pad/padActions'
import { useDispatch } from 'react-redux'

type Props = Button & {
  onPressed?: Function,
  onRelease?: Function,
  color?: RgbColor
}

const Pad = ({ button, color, onPressed: onPressed, onRelease }: Props) => {
  const dispatch = useDispatch()
  const [isPressed, _setPressed] = useState(false)
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
    _setPressed(event === BUTTON_DOWN  ?? false)
    dispatch(setPressed(btn, event === BUTTON_DOWN ?? false))
  })
  
  return (
    <></>
  )
}

export default Pad
