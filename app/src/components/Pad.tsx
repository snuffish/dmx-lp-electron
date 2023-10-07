// @ts-nocheck
import { Paper, styled } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ColorOff, randomRGB, rgbToHex } from '../utils/color'
import { changeColor, setPressed } from '../redux/components/pad/padActions'
import { CHANNELS } from '../constants/ipc'

const Pad = ({ x, y }) => {
  const button = parseInt(`${y}${x}`)

  const dispatch = useDispatch()
  const { isPressed, color } = useSelector((state) => state.pad.buttons[button])

  useEffect(() => window.api.send(CHANNELS.LP.PAD_COLOR, { button, color }), [color])

  useEffect(() => {
    console.log('INVOKE PRESSED =>', button, 'STATE: ', isPressed)
  }, [isPressed])

  const onClick = () => {
    dispatch(changeColor(button, ColorOff))
  }

  const onMouseOver = () => {
    dispatch(changeColor(button, randomRGB()))
    dispatch(setPressed(button, true))
  }

  const onMouseLeave = () => {
    useDispatch(setPressed(button, false))
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
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}>
      {button}
    </Item>
  )
}

export default Pad
