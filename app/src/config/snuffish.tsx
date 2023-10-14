import Pad from 'Components/Pad'
import SliderComponent from 'Components/SliderComponent'
import { COLORS } from 'Utils/color'
import React from 'react'
import { Config } from '.'
import { updateDMX } from 'Utils/dmx'

const ledbar_26ch = {
  components: []
}

const laser = {
  components: [
    <Pad button={22} color={[25, 0, 25]} />
  ]
}

const ledbar_14ch = {
  components: [
    <SliderComponent key='slider2' row={8} sector={2} color={COLORS.RED} />,
    <Pad button={29} color={COLORS.RED} onPressed={() => {
      updateDMX({
        2: 255
      })
    }} />
  ]
}

const movingPoint = {
  components: [
    <Pad button={18} color={COLORS.RED} />
  ]
}

const ledbar_24ch = {
  components: [
    // <SliderComponent key='slider1' row={1} sector={1} color={COLORS.RED} />,
    // <SliderComponent key='slider2' row={2} sector={2} color={COLORS.GREEN} />,
    // <SliderComponent key='slider3' row={3} sector={3} color={COLORS.BLUE} />,
    // <SliderComponent key='slider4' row={4} sector={4} color={COLORS.RED} />,
    // <SliderComponent key='slider5' row={5} sector={5} color={COLORS.GREEN} />,
    // <SliderComponent key='slider6' row={6} sector={6} color={COLORS.BLUE} />,
    // <SliderComponent key='slider7' row={7} sector={7} color={COLORS.RED} />,
    <SliderComponent key='slider8' row={8} sector={8} color={COLORS.GREEN} />,
  ]
}

const snuffishConfig: Config = {
  scenes: {
    ledbar_24ch
  }
}

export default snuffishConfig
