// @ts-nocheck
import { Paper, styled } from "@material-ui/core"
import { changeColor, setPressed } from "Redux/components/pad/padSlice"
import React, { useEffect } from "react"
import { connect, useSelector } from "react-redux"
import { ColorOff, randomRGB } from "../utils/color"
import { arrayEqual } from "../utils"

const Item = styled(Paper)(() => ({
  backgroundColor: "#fff",
  padding: 10,
  textAlign: "center",
  color: "black",
  background: "#B7BCC2",
  cursor: "pointer",
}))

const Pad = ({ x, y, changeColor, setPressed }) => {
  const button = parseInt(`${y}${x}`)
  const { color, isPressed } = useSelector((state) => state.pad.buttons[button])

  useEffect(() => window.api.send("lpPadColor", { button, color }), [color])

  useEffect(() => {
    console.log("INVOKE PRESSED =>", button, "STATE: ", isPressed)
  }, [isPressed])

  return (
    <Item
      onClick={() => {
        changeColor({
          color: ColorOff,
          button
        })
      }}
      onMouseOver={() => {
        changeColor({
          color: randomRGB(),
          button,
        })
        setPressed({
          pressed: true,
          button,
        })
      }}
      onMouseLeave={() => {
        setPressed({
          pressed: false,
          button,
        })

        // changeColor(JSON.stringify(randomRGB()))
      }}>
      {arrayEqual(color, ColorOff)
        ? button
        : isPressed
        ? `>${button}<`
        : `[${button}]`}
    </Item>
  )
}

const mapStateToProps = (state: any, _props: any) => ({
  color: state.color,
  isPressed: state.isPressed,
})
const mapDispatch = { changeColor, setPressed }

export default connect(mapStateToProps, mapDispatch)(Pad)
