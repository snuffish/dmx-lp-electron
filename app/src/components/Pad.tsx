import { changeColor } from 'Redux/components/pad/padActions'
import { Button } from 'Types/index'
import { setButtonColor } from 'Utils/launchpad'
import { RgbColor } from 'launchpad.js'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = Button & {
  onPressed?: Function,
  onRelease?: Function,
  color?: RgbColor
}

const Pad = ({ button, color, onPressed, onRelease }: Props) => {
  const dispatch = useDispatch()
  const isPressed = useSelector((state: any) => state.pad.buttons[button].isPressed)
  const rgbColor = useSelector((state: any) => state.pad.buttons[button].color)

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
  
  return null
}

export default Pad
