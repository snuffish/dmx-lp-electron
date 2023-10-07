// @ts-nocheck
import { Grid } from "@material-ui/core"
import { changeColor, setPressed } from "Redux/components/pad/padSlice"
import React from "react"
import { connect } from "react-redux"
import Pad from "../../components/Pad"
import Test from "../../components/Test"
import { CHANNELS } from "../../constants/ipc"
import { randomRGB } from "../../utils/color"

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

const Launchpad = ({ changeColor, setPressed }) => {
  // @ts-ignore
  window.api.receive("pad", ({ event, button }) => {
    // console.log("PAD EVENT => ", event, " BUTTON => ", button)
    changeColor({
      color: randomRGB(),
      button: button.nr
    })

    setPressed({
      pressed: event === "BUTTON_DOWN" ?? false,
      button: button.nr
    })
  })

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

const mapStateToProps = (state: any, _props: any) => ({
  color: state.color,
})
const mapDispatch = { changeColor, setPressed }

export default connect(mapStateToProps, mapDispatch)(Launchpad)
