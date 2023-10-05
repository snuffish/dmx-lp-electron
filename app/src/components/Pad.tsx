import { styled, Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";

const Item = styled(Paper)(() => ({
  backgroundColor: '#fff',
  padding: 10,
  textAlign: 'center',
  color: 'black',
  background: '#B7BCC2',
  cursor: 'pointer'
}));

type PadProps = {
  x: number,
  y: number
}

const Pad = ({ x, y }: PadProps) => {
  const button = parseInt(`${y}${x}`)

  const [isActive, setActive] = useState(false)
  const [isPressed, setPressed] = useState(false)

  useEffect(() => {
    // @ts-ignore
    window.api.receive(`pad_${button}`, ({ event, rgbColor }) => {
      console.log(`BUTTON => ${button} [Event: ${event} | Color: ${rgbColor}]`)
      setActive(true)
  
      setPressed(event === 'BUTTON_DOWN' ?? false)
    })
  }, [])

  const handleClick = () => {
    // @ts-ignore
    window.api.send(CHANNELS.LP.PAD, button)
    setActive(true)
  }

  return (
    <Item
      onClick={handleClick}
      onMouseOver={() => {
        setPressed(true)
        setActive(true)
        // @ts-ignore
        window.api.send(CHANNELS.LP.PAD, button)
      }}
      onMouseLeave={() => {
        setPressed(false)
      }}
    >
      {isActive ?
        isPressed ? `>${button}<` : `[${button}]` : button
      }
    </Item>
  )
}

export default Pad
