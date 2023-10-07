// @ts-nocheck
import { Button, Grid, Paper, Slider, styled } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { CHANNELS } from '../../constants/ipc';
import Pad from '../../components/Pad';
import { changeColor } from 'Redux/components/pad/padSlice';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import Test from '../../components/Test';

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

const Launchpad = (props: any) => {
  // @ts-ignore
  window.api.receive('pad', ({ event, button }) => {
    console.log("PAD EVENT => ", event, " BUTTON => ", button)
  })

  // @ts-ignore
  window.api.send(CHANNELS.LP.CLEAR)

  return (
    <>
      {createGrid().map(row => (
        <Grid container>
          {row.map(pad => (
            <Grid item>
              {pad}
            </Grid>
          ))}
        </Grid>
      ))}
      <Test/>
      {/* <Button onClick={() => changeColor(JSON.stringify([255, 0, 0]))}>R</Button>
      <Button onClick={() => changeColor(JSON.stringify([0, 255, 0]))}>G</Button>
      <Button onClick={() => changeColor(JSON.stringify([0, 0, 255]))}>B</Button> */}
    </>
  )
}

const mapStateToProps = (state: any, _props: any) => ({
  color: state.color
})
const mapDispatch = { changeColor }

export default connect(mapStateToProps, mapDispatch)(Launchpad)
