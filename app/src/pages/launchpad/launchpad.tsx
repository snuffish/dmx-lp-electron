import Debug from 'Components/Debug'
import SliderComponent from 'Components/SliderComponent'
import { CHANNELS } from 'Constants/ipc'
import { getGridRow } from 'Utils/grid'
import React from 'react'

type Props = { component: any }
const Launchpad = ({ component }: Props) => {
  // @ts-ignore
  window.api.send(CHANNELS.LP.CLEAR)

  return (
    <>
      <SliderComponent buttons={getGridRow(1)}/>
      <SliderComponent buttons={getGridRow(3)}/>
      <SliderComponent buttons={getGridRow(5)}/>
      <SliderComponent buttons={getGridRow(7)}/>
      <Debug />
    </>
  )
}

export default Launchpad
