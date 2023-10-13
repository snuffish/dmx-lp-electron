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
  const [orientation, setOrientation] = useState<GridRowOrientation>('Horizontal')

  clearGrid()

  return (
    <>
      <SliderComponent sector={1} buttons={getGridRow(1, orientation)} color={COLORS.RED}/>
      <SliderComponent sector={2} buttons={getGridRow(2, orientation)} color={COLORS.GREEN}/>
      <SliderComponent sector={3} buttons={getGridRow(3, orientation)} color={COLORS.BLUE}/>
      <SliderComponent sector={4} buttons={getGridRow(4, orientation)} color={COLORS.RED}/>
      <SliderComponent sector={5} buttons={getGridRow(5, orientation)} color={COLORS.GREEN}/>
      <SliderComponent sector={6} buttons={getGridRow(6, orientation)} color={COLORS.BLUE}/>
      <SliderComponent sector={7} buttons={getGridRow(7, orientation)} color={COLORS.RED}/>
      <SliderComponent sector={8} buttons={getGridRow(8, orientation)} color={COLORS.GREEN}/>
      <Pad padButton={39} onClick={() => setOrientation('Vertical')} color={[70,0,50]}/>
      <Pad padButton={29} onClick={() => setOrientation('Horizontal')} color={[70,0,50]}/>
      <Pad padButton={19} onClick={() => clearGrid() && clearDMX()} color={[50,50,50]}/>
      <Debug />
    </>
  )
}

export default Launchpad
