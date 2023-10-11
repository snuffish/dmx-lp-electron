import { Grid } from '@material-ui/core'
import Pad from 'Components/Pad'
import SliderComponent from 'Components/SliderComponent'
import Test from 'Components/Test'
import { CHANNELS } from 'Constants/ipc'
import { getGridRow } from 'Utils/grid'
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
      <SliderComponent buttons={getGridRow(1)}/>
      <SliderComponent buttons={getGridRow(3)}/>
      <SliderComponent buttons={getGridRow(5)}/>
      <SliderComponent buttons={getGridRow(7)}/>
      <Test />
    </>
  )
}

export default Launchpad
