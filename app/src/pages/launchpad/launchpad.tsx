import { Box, Container } from '@material-ui/core'
import Debug from 'Components/Debug'
import Pad from 'Components/Pad'
import SliderComponent from 'Components/SliderComponent'
import { CHANNELS } from 'Constants/ipc'
import { getGridRow } from 'Utils/grid'
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
      <Debug />
    </>
  )
}

export default Launchpad
