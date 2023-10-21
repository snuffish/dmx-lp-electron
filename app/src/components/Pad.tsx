import { changeColor } from 'Redux/components/pad/padActions'
import { Button } from 'Types/index'
import { randomRGB } from 'Utils/color'
import { setButtonColor } from 'Utils/launchpad'
import { RgbColor } from 'launchpad.js'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = Button & {
  onPressed?: Function,
  onRelease?: Function,
  onInit?: Function
  color?: RgbColor
  children: any
}

const Pad = ({ button, color, onInit, onPressed, onRelease, children }: Props) => {
  const dispatch = useDispatch()
  const isPressed = useSelector((state: any) => state.pad.buttons[button].isPressed)
  const rgbColor = useSelector((state: any) => state.pad.buttons[button].color)

  onInit && onInit()

  useEffect(() => {
    dispatch(changeColor(button, color as RgbColor))
  }, [])

  useEffect(() => {
    setButtonColor(button, rgbColor)
  }, [rgbColor])

  useEffect(() => {
    isPressed && onPressed && onPressed()
    !isPressed && onRelease && onRelease()
  }, [isPressed])
  
  return <>{children}</>
}

export default Pad
