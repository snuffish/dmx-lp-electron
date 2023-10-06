import { styled, Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { CHANNELS } from './../constants/ipc'
import { randomRGB } from "../utils/color";

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

const Pad = ({ x, y }: Props) => {
  const button = parseInt(`${y}${x}`)

  const [isPressed, setPressed] = useState(false)
  const [rgbColor, setRgbColor] = useState([0, 0, 0])

  useEffect(() => {
    // @ts-ignore
    window.api.send(CHANNELS.LP.PAD, {
      rgbColor, button
    })
  }, [isPressed, rgbColor])

  useEffect(() => {
    // @ts-ignore
    window.api.receive(`pad_${button}`, ({ event }) => {
      console.log(`BUTTON => ${button} [Event: ${event} | Color: ${rgbColor}]`)

      setPressed(event === 'BUTTON_DOWN' ?? false)
      setRgbColor(randomRGB())
    })
  }, [])

  return (
    <Item
      onClick={() => {
        setRgbColor([0, 0, 0])
      }}
      onMouseOver={() => {
        setRgbColor(randomRGB())
        setPressed(true)
      }}
      onMouseLeave={() => {
        setPressed(false)
        if (JSON.stringify(rgbColor) !== JSON.stringify([0, 0, 0]))
          return

        setRgbColor(randomRGB())
      }}
    >
      {JSON.stringify(rgbColor) === JSON.stringify([0, 0, 0]) ?
        button : isPressed ? `>${button}<` : `[${button}]`
      }
    </Item>
  )
}

export default Pad
