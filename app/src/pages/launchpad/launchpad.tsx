import Debug from 'Components/Debug'
import Pad from 'Components/Pad'
import SliderComponent from 'Components/SliderComponent'
import { CHANNELS } from 'Constants/ipc'
import { COLORS } from 'Utils/color'
import { clearDMX, updateAllDMX, updateDMX } from 'Utils/dmx'
import { GridRowOrientation, clearGrid, getGridRow, setButtonColor } from 'Utils/launchpad'
import { randomNumber } from 'Utils/math'
import React, { useState } from 'react'

const Launchpad = (props: any) => {
  clearGrid()

  return (
    <>
      <SliderComponent row={1} sector={1} color={COLORS.RED}/>
      <SliderComponent row={2} sector={2} color={COLORS.GREEN}/>
      <SliderComponent row={3} sector={3} color={COLORS.BLUE}/>
      <SliderComponent row={4} sector={4} color={COLORS.RED}/>
      <SliderComponent row={5} sector={5} color={COLORS.GREEN}/>
      <SliderComponent row={6} sector={6} color={COLORS.BLUE}/>
      <SliderComponent row={7} sector={7} color={COLORS.RED}/>
      <SliderComponent row={8} sector={8} color={COLORS.GREEN}/>
      <Pad padButton={29} onClick={async () => console.log("CHANNEL VALUE =>>> ", await window.api.send('dmxGetChannel', 1))} color={[90,0,90]}/>
      <Pad padButton={19} onClick={() => clearGrid() && clearDMX()} color={[50,50,50]}/>
      <Debug />
    </>
  )
}

export default Launchpad
