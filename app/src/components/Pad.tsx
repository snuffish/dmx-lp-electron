// @ts-nocheck
import { Paper, styled } from "@material-ui/core"
import { changeColor, setPressed } from "Redux/components/pad/padSlice"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ColorOff, randomRGB, rgbToHex } from "../utils/color"

const Pad = ({ x, y }) => {
  const button = parseInt(`${y}${x}`)

  const { isPressed, color } = useSelector((state) => state.pad.buttons[button])
  const dispatch = useDispatch()

  useEffect(() => window.api.send("lpPadColor", { button, color }), [color])

  useEffect(() => {
    console.log("INVOKE PRESSED =>", button, "STATE: ", isPressed)
  }, [isPressed])

  const onClick = () => {
    dispatch(
      changeColor({
        color: ColorOff,
        button,
      })
    )
  }

  const onMouseOver = () => {
    dispatch(
      changeColor({
        color: randomRGB(),
        button,
      })
    )
    dispatch(
      setPressed({
        pressed: true,
        button,
      })
    )
  }

  const onMouseLeave = () => {
    dispatch(
      setPressed({
        pressed: false,
        button,
      })
    )
  }

  const Item = styled(Paper)(() => ({
    backgroundColor: color === ColorOff ? "#fff" : rgbToHex(color),
    padding: 10,
    textAlign: "center",
    color: "black",
    background: "#B7BCC2",
    cursor: "pointer",
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
