import { Grid } from '@material-ui/core'
import Pad from 'Components/Pad'
import Test from 'Components/Test'
import { CHANNELS } from 'Constants/ipc'
import React from 'react'


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

type Props = any

const Launchpad = (props: Props) => {
  // @ts-ignore
  window.api.send(CHANNELS.LP.CLEAR)

  return (
    <>
      {createGrid().map((row) => (
        <Grid container>
          {row.map((pad) => (
            <Grid item>{pad}</Grid>
          ))}
        </Grid>
      ))}
      <Test />
    </>
  )
}

export default Launchpad
