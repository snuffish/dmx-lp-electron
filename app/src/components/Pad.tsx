// @ts-nocheck
import { Paper, styled } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ColorOff, randomRGB, rgbToHex } from '../utils/color'
import { changeColor, setPressed } from '../redux/components/pad/padActions'
import { CHANNELS } from '../constants/ipc'

const Pad = ({ x, y }) => {
  const button = parseInt(`${y}${x}`)

  const dispatch = useDispatch()
  const [isMouseOver, setMouseOver] = useState(false)
  const { isPressed, color } = useSelector((state) => state.pad.buttons[button])

  useEffect(
    () => window.api.send(CHANNELS.LP.PAD_COLOR, { button, color }),
    [color]
  )

  useEffect(() => {
    console.log('INVOKE PRESSED =>', button, 'STATE: ', isPressed)
    if (isPressed) dispatch(changeColor(button, randomRGB()))
    if (!isPressed)
      dispatch(changeColor(button, ColorOff))
      // setTimeout(() => dispatch(changeColor(button, ColorOff)), 1000)
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
