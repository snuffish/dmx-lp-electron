import { Grid } from "@material-ui/core"
import Pad from "Components/Pad"
import { CHANNELS } from "Constants/ipc"
import React, { useState } from "react"
import { createContext } from "react"

const SliderComponent = () => {
  const buttons = [11, 21, 31, 41, 51, 61, 71, 81]

  return (
    <></>
  )
}

const LaunchpadContext = createContext({
  scene: 1,
  components: [SliderComponent]
})

const Launchpad = (props: any) => {
  window.api.send(CHANNELS.LP.CLEAR)  

  console.log("DSDS")

  return (
    <>
      DJDKASHDKJSA
       {/* {createGrid().map((row) => (
        <Grid container>
          {row.map((pad) => (
            <Grid item>{pad}</Grid>
          ))}
        </Grid>
      ))} */}
    </>
  )
}

export default Launchpad