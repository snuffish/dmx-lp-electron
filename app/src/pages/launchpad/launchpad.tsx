import Debug from 'Components/Debug'
import SliderComponent from 'Components/SliderComponent'
import { CHANNELS } from 'Constants/ipc'
import { getGridRow } from 'Utils/grid'
import React from 'react'

const Launchpad = (props: any) => {
  // @ts-ignore
  window.api.send(CHANNELS.LP.CLEAR)

  return (
    <>
      <SliderComponent sector={1} buttons={getGridRow(1)} color='RED'/>
      <SliderComponent sector={2} buttons={getGridRow(2)} color='GREEN'/>
      <SliderComponent sector={3} buttons={getGridRow(3)} color='BLUE'/>
      <SliderComponent sector={4} buttons={getGridRow(4)} color='RED'/>
      <SliderComponent sector={5} buttons={getGridRow(5)} color='GREEN'/>
      <SliderComponent sector={6} buttons={getGridRow(6)} color='BLUE'/>
      <SliderComponent sector={7} buttons={getGridRow(7)} color='RED'/>
      <SliderComponent sector={8} buttons={getGridRow(8)} color='GREEN'/>
      <Debug />
    </>
  )
}

export default Launchpad
