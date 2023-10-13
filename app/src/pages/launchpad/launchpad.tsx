import Debug from 'Components/Debug'
import Pad from 'Components/Pad'
import SliderComponent from 'Components/SliderComponent'
import { RightPanel } from 'Utils/Panel'
import { COLORS } from 'Utils/color'
import { clearDMX } from 'Utils/dmx'
import { clearGrid } from 'Utils/launchpad'
import React from 'react'

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
      <Pad button={RightPanel.STOP_SOLO_MUTE} onClick={() => clearGrid() && clearDMX()} color={[50,50,50]}/>
      <Debug />
    </>
  )
}

export default Launchpad
