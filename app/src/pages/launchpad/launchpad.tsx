import { Grid, Paper, styled } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { CHANNELS } from '../../constants/ipc';
import Pad from '../../components/Pad';

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
    </>
  )
}
