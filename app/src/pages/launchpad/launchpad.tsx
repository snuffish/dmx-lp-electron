import { Grid, Paper, styled } from "@material-ui/core";
import React, { useState, useEffect } from 'react';

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
  const buttonNr = `${y}${x}`

  const [isActive, setActive] = useState(false)

  useEffect(() => {
    console.log("ACTIVE =>", isActive)
  }, [isActive])

  // @ts-ignore
  window.api.receive(`pad_${buttonNr}`, button => {
    console.log("BUTTON =>", button, "NR =>", buttonNr)
    setActive(true)
  })

  const handleClick = () => {
    // @ts-ignore
    window.api.send('pad', buttonNr)
  }

  return (
    <Item onClick={handleClick}>
      {isActive ? 'ON' : ''}
      {buttonNr}
    </Item>
  )
}

const createGrid = () => {
  const rows = []
  for (let y = 8; y >= 1; y--) {
    const pads = []
    for (let x = 1; x <= 8; x++) {
      pads.push(<Pad x={x} y={y} />)
    }

    rows.push(pads)
  }

  return rows
}

export default () => {
  const grid = createGrid()

  return (
    <>
      {grid.map(row => (
        <Grid container>
          {row.map(pad => (
            <Grid item>
              {pad}
            </Grid>
          ))}
        </Grid>
      ))}
    </>
  )
}