import { Grid } from "@material-ui/core"
import Pad from "Components/launchpad/Pad"
import { CHANNELS } from "Constants/ipc"
import React, { useContext, useState } from "react"
import { createContext } from "react"

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

const SliderComponent = () => {
  const buttons = [11, 21, 31, 41, 51, 61, 71, 81]

  return (
    <></>
  )
}

export const LaunchpadContext = createContext({
  components: [SliderComponent]
})

const Launchpad = (props: any) => {
  window.api.send(CHANNELS.LP.CLEAR)

  const { components } = useContext(LaunchpadContext)s

  return (
    <>
      {createGrid().map((row) => (
        <Grid container>
          {row.map((pad) => (
            <Grid item>{pad}</Grid>
          ))}
        </Grid>
      ))}
    </>
  )
}

export default Launchpad
