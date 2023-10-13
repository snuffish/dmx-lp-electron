import Pad from 'Components/Pad'
import SliderComponent from 'Components/SliderComponent'
import { COLORS } from 'Utils/color'
import React from 'react'

interface Config {
  scenes: Scene
}

type Scene = {
  [key: string]: {
    components: JSX.Element[]
  }
}

const snuffishConfig: Config = {
  scenes: {
    ledbar: {
      components: [
        <SliderComponent key='slider1' orientation='horizontal' row={1} sector={1} color={COLORS.RED} />,
        <SliderComponent key='slider2' row={2} sector={2} color={COLORS.GREEN} />,
        <SliderComponent key='slider3' row={3} sector={3} color={COLORS.BLUE} />,
        <SliderComponent key='slider4' row={4} sector={4} color={COLORS.RED} />,
        <SliderComponent key='slider5' row={5} sector={5} color={COLORS.GREEN} />,
        <SliderComponent key='slider6' row={6} sector={6} color={COLORS.BLUE} />,
        <SliderComponent key='slider7' row={7} sector={7} color={COLORS.RED} />,
        <SliderComponent key='slider8' row={8} sector={8} color={COLORS.GREEN} />,
        <SliderComponent key='slider9' orientation='horizontal' row={5} sector={8} color={COLORS.GREEN} />
      ]
    },
    // laser: {
    //   components: [
    //     <Pad button={22} color={[25,0,25]}/>
    //   ]
    // }
  }
}

export default snuffishConfig
