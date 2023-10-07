// @ts-nocheck
import { Grid } from '@material-ui/core'
import { changeColor, setPressed } from 'Redux/components/pad/padSlice'
import React from 'react'
import { useDispatch } from 'react-redux'
import Pad from '../../components/Pad'
import Test from '../../components/Test'
import { CHANNELS } from '../../constants/ipc'
import { randomRGB } from '../../utils/color'

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

const Launchpad = (props) => {
  const dispatch = useDispatch()

  // @ts-ignore
  window.api.receive('pad', ({ event, button }) => {
    dispatch(
      setPressed({
        pressed: event === 'BUTTON_DOWN' ?? false,
        button: button.nr,
      })
    )

    dispatch(
      changeColor({
        color: randomRGB(),
        button: button.nr,
      })
    )
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

export default Launchpad
