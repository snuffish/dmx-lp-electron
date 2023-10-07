import { Grid } from '@material-ui/core'
import Pad from 'Components/Pad'
import Slider from 'Components/Slider'
import Test from 'Components/Test'
import { CHANNELS } from 'Constants/ipc'
import React, { createContext } from 'react'

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

const SliderButtonMapping = {
  buttons: [11, 21, 31, 41, 51, 61, 71, 81]
}

const GridContext = createContext('Components')

type Props = { component: any }
const Launchpad = ({ component }: Props) => {
  // @ts-ignore
  window.api.send(CHANNELS.LP.CLEAR)

  return (
    <>
      <Slider buttonMap={SliderButtonMapping.buttons}/>
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
