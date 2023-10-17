import Pad from 'Components/Pad'
import SliderComponent from 'Components/SliderComponent'
import { COLORS } from 'Utils/color'
import React from 'react'
import { Config } from '.'
import { updateDMX } from 'Utils/dmx'
import { setButtonColor } from 'Utils/launchpad'

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
    // <SliderComponent key='slider8' row={8} sector={8} color={COLORS.GREEN} />,
  ]
}

const motor_rotate = {
  components: [
    // Clear
    <Pad button={19} color={COLORS.WHITE} onPressed={() => window.dmxClear()}/>,

    <SliderComponent row={8} orientation='horizontal' sector={1} color={COLORS.BLUE}/>,

    // Rotate  left
    <Pad button={11} color={COLORS.GREEN} onPressed={() => window.dmxUpdate({24: 127})}/>,
    // Rotate right
    <Pad button={12} color={COLORS.GREEN}  onPressed={() => window.dmxUpdate({24: 255})}/>,
    // Stop rotate
    <Pad button={13} color={COLORS.WHITE} onPressed={() => window.dmxUpdate({24: 128})}/>,
    // Change color to green
    <Pad button={21} color={COLORS.GREEN} onPressed={() => window.dmxUpdate({22: 60})}/>,
    // Change color to red
    <Pad button={22} color={COLORS.RED} onPressed={() => window.dmxUpdate({22: 30})}/>,
    // Strobe
    <Pad button={31} color={COLORS.WHITE} onPressed={() => window.dmxUpdate({23: 250})} onRelease={() => window.dmxUpdate({23: 0})}/>,

    // Wash 1
    <Pad button={18} color={COLORS.GREEN} onPressed={() => window.dmxUpdate({2: 100, 5: 100})}/>,
    // Wash 2
    <Pad button={17} color={COLORS.RED} onPressed={() => window.dmxUpdate({6: 100, 10: 50})}/>,

    // Change color
    // <Pad button={73} color={COLORS.RED} onPressed={() => {
    //   setButtonColor(93, COLORS.RED)
    //   setButtonColor(94, COLORS.RED)
    //   window.dmxUpdate({22: 30 })
    // }}/>,
    // Change color
    // <Pad button={74} color={COLORS.GREEN} onPressed={() => {
    //   setButtonColor(93, COLORS.GREEN)
    //   setButtonColor(94, COLORS.GREEN)
    //   window.dmxUpdate({22: 60 })
    // }}/>,
    // <Pad button={73} color={COLORS.GREEN} onPressed={() => {
    //   window.dmxUpdate({22: 60 })
    //   setButtonColor(93, COLORS.GREEN)
    //   setButtonColor(94, COLORS.GREEN)
    // }}/>,
  ]
}

const snuffishConfig: Config = {
  scenes: {
    motor_rotate
  }
}

export default snuffishConfig
