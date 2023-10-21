// @ts-nocheck
import Pad from 'Components/Pad'
import SliderComponent from 'Components/SliderComponent'
import { COLORS, randomRGB } from 'Utils/color'
import React from 'react'
import { Config } from '.'
import { clearDMX, dmxAnimation, updateDMX } from 'Utils/dmx'
import { Grid, setButtonColor, setFlashButton } from 'Utils/launchpad'
import { AnimationProps } from 'Types/index'
import { delay } from 'framer-motion'
import { colorFromRGB } from 'launchpad.js/dist/colorHelpers'

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
    <SliderComponent row={8} sector={2} color={COLORS.RED} />,
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

function easeInQuart(currentTime, startValue, changeInValue, duration) {
  currentTime /= duration;
  return changeInValue * currentTime * currentTime * currentTime * currentTime + startValue;
}

export function animateProperty(startValue, toValue, duration) {
  return new Promise((resolve) => {
    const startTime = Date.now();

    function animationStep() {
      const currentTime = Date.now() - startTime;

      if (currentTime < duration) {
        const newValue = easeInQuart(currentTime, startValue, toValue - startValue, duration);
        console.log("VALUE => ", newValue)
        updateDMX({
          24: newValue
        })

        // Continue the animation loop
        setTimeout(animationStep, 1000 / 60); // 60 frames per second (change as needed)
      } else {
        resolve();
      }
    }

    animationStep(); // Start the animation loop
  });
}

const velocityRotate = () => {
  animateProperty(0, 127, 5000).then(() => {
    console.log("MAX!")
    updateDMX({22: 30})
    setTimeout(() => {
      updateDMX({22: 60})
    }, 250)
  })
}

let rotateSpeed = 1
let rotateRatioChange = 0.05

const motor_rotate = {
  components: [
    // Clear
    <Pad button={19} color={COLORS.WHITE} onPressed={() => clearDMX()}/>,
    <Pad button={55} color={COLORS.WHITE} onPressed={() => {
      setFlashButton(55, 50, 70)
    }}/>,

    <SliderComponent row={6} orientation='horizontal' sector={1} color={COLORS.BLUE}/>,

    <Pad button={27} color={COLORS.WHITE} onPressed={() => {
      const anim: AnimationProps = [
        {
          2: 100,
          5: 100
        },
        {
          delay: 1000
        },
        {
          2: 0,
          5: 0
        },
        {
          delay: 1000
        }
      ]

      dmxAnimation(anim, { loop: true })
    }}/>,

    <Pad button={28} color={COLORS.BLUE} onPressed={() => {
      const anim: AnimationProps =  [
        {
          24: 255
        },
        {
          delay: 1000
        },
        {
          24: 127
        },
        {
          delay: 1000
        },
        {
          24: 128
        }
      ]

      dmxAnimation(anim, { loop: true })
    }}/>,

    <Pad button={Grid.TopPanel.UpArrow} color={COLORS.WHITE} onPressed={() => {
      rotateSpeed += rotateRatioChange
      console.log("SPEED => ", rotateSpeed, "DMX => ", 127 * rotateSpeed)
      updateDMX({24: 127 * rotateSpeed})

      updateDMX({
        18: 215,
        19: 250 * rotateSpeed
      })
    }}/>,

    <Pad button={Grid.TopPanel.DownArrow} color={COLORS.WHITE} onPressed={() => {
      rotateSpeed -= rotateRatioChange
      console.log("SPEED => ", rotateSpeed, "DMX => ", 127 * rotateSpeed)
      updateDMX({24: 127 * rotateSpeed})

      updateDMX({
        18: 243,
        19: 250 * rotateSpeed
      })
    }}/>,


    <Pad button={11} color={COLORS.BLUE} onPressed={() => {
      updateDMX({
        18: 215,
        19: 250 * rotateSpeed
      })
    }}/>,

    // Rotate  left
    <Pad button={Grid.TopPanel.LeftArrow} color={COLORS.GREEN} onPressed={() => {
      updateDMX({24: 127 * rotateSpeed})
      setFlashButton(93, 7)
    }}/>,
    // Rotate right
    <Pad button={Grid.TopPanel.RightArrow} color={COLORS.GREEN}  onPressed={() => {
      updateDMX({24: 255})
      setFlashButton(94, 10)
      setFlashButton(93, 0)
    }}/>,
    // Stop rotate
    <Pad button={85} color={COLORS.WHITE} onPressed={() => updateDMX({24: 128})}/>,
    
    // // Velocity rotate
    // <Pad button={84} color={COLORS.BLUE} onPressed={() => velocityRotate()}/>,

    
    // Change color to green
    <Pad button={83} color={COLORS.GREEN} onPressed={() => updateDMX({22: 60}) && setButtonColor(94, COLORS.GREEN) && setButtonColor(93, COLORS.GREEN)}/>,
    // Change color to red
    <Pad button={84} color={COLORS.RED} onPressed={() => updateDMX({22: 30}) && setButtonColor(94, COLORS.RED) && setButtonColor(93, COLORS.RED)}/>,

    // Strobe
    <Pad button={31} color={COLORS.WHITE} onPressed={() => updateDMX({25: 250})} onRelease={() => updateDMX({25: 0})}/>,

    // Wash 1
    <Pad button={18} color={COLORS.GREEN} onPressed={() => updateDMX({2: 100, 5: 100})} onRelease={() => updateDMX({2: 0, 5: 0})}/>,
    // Wash 2
    <Pad button={17} color={COLORS.RED} onPressed={() => updateDMX({6: 100, 10: 50})} onRelease={() => updateDMX({6: 0, 10: 0})}/>,

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
