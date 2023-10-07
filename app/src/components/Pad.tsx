import { Paper, styled } from '@material-ui/core'
import { CHANNELS } from 'Constants/ipc'
import { changeColor, setPressed } from 'Redux/components/pad/padActions'
import { ColorOff, randomRGB, rgbToHex } from 'Utils/color'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = { x: number, y: number }

const Pad = ({ x, y }: Props) => {
  const button = parseInt(`${y}${x}`)

  const dispatch = useDispatch()
  const [isMouseOver, setMouseOver] = useState(false)
  const { isPressed, color } = useSelector((state: any) => state.pad.buttons[button])

  useEffect(() => {
    console.log("MOUNTED => ", button)
    return () => console.log("DISMOUNTED!!!!")
  }, [])

  useEffect(
    () => window.api.send(CHANNELS.LP.PAD_COLOR, { button, color }),
    [color]
  )

  useEffect(() => {
    console.log('INVOKE PRESSED =>', button, 'STATE: ', isPressed)
    if (isPressed) {
      dispatch(changeColor(button, randomRGB()))
      return
    }
    if (!isPressed) {
      setTimeout(() => dispatch(changeColor(button, ColorOff)), 1000)
    }
  }, [isPressed])

  const onClick = () => {
    dispatch(changeColor(button, ColorOff))
  }

  const onMouseEnter = () => {
    if (isMouseOver) return
    setMouseOver(true)
    dispatch(setPressed(button, true))
  }

  const onMouseLeave = () => {
    if (!isMouseOver) return
    setMouseOver(false)
    dispatch(setPressed(button, false))
  }

  // console.log("RGB=>", color)

  const Item = styled(Paper)(() => ({
    backgroundColor: color === ColorOff ? '#fff' : rgbToHex(color),
    padding: 10,
    textAlign: 'center',
    color: 'black',
    background: '#B7BCC2',
    cursor: 'pointer',
  }))

  return (
    <Item
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {button}
    </Item>
  )
}

export default Pad
