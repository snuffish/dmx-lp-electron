// @ts-nocheck
import { Paper, styled } from "@material-ui/core";
import { changeColor } from "Redux/components/pad/padSlice";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { randomRGB } from "../utils/color";
import { CHANNELS } from './../constants/ipc';

const Item = styled(Paper)(() => ({
  backgroundColor: '#fff',
  padding: 10,
  textAlign: 'center',
  color: 'black',
  background: '#B7BCC2',
  cursor: 'pointer'
}));

type Props = {
  x: number,
  y: number
}

const Pad = ({
  x, y,
  changeColor
}) => {
  const button = parseInt(`${y}${x}`)

  const [isPressed, setPressed] = useState(false)
  // const [rgbColor, setRgbColor] = useState([0, 0, 0])

  const color = useSelector(state => state.pad.color)

  useEffect(() => {
    // console.log("CHANGED STOREVALUE FOR =>", button, " ##### ", color)
    window.api.send('lpPadColor', { button, color })
  }, [color])

  return (
    <Item
      onClick={() => {
        changeColor(JSON.stringify([0, 0, 0]))
      }}
      onMouseOver={() => {
        changeColor(JSON.stringify(randomRGB()))
        setPressed(true)
      }}
      onMouseLeave={() => {
        setPressed(false)
        if (JSON.stringify(color) !== JSON.stringify([0, 0, 0]))
          return

        changeColor(JSON.stringify(randomRGB()))
      }}
    >
      {JSON.stringify(color) === JSON.stringify([0, 0, 0]) ?
        button : isPressed ? `>${button}<` : `[${button}]`
      }
    </Item>
  )
}

const mapStateToProps = (state: any, _props: any) => ({
  color: state.color
})
const mapDispatch = { changeColor }

export default connect(mapStateToProps, mapDispatch)(Pad)
