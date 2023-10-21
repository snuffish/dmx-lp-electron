// @ts-nocheck
import Pad from 'Components/Pad'
import SliderComponent from 'Components/SliderComponent'
import TempoComponent from 'Components/TempoComponent'
import { AnimationProps } from 'Types/index'
import { COLORS, randomRGB } from 'Utils/color'
import { clearDMX, dmxAnimation, updateDMX } from 'Utils/dmx'
import { Grid, setButtonColor } from 'Utils/launchpad'
import React from 'react'
import { Config } from '.'
import { useDispatch } from 'react-redux'
import { changeTempo } from 'Redux/components/pad/padActions'
import { useSelector } from 'react-redux'
import { randomNumber } from 'Utils/math'

// const laser = {
//   components: [
//     <Pad button={22} color={[25, 0, 25]} />
//   ]
// }

// const ledbar_14ch = {
//   components: [
//     <SliderComponent row={8} sector={2} color={COLORS.RED} />,
//     <Pad button={29} color={COLORS.RED} onPressed={() => {
//       updateDMX({
//         2: 255
//       })
//     }} />
//   ]
// }

// const movingPoint = {
//   components: [
//     <Pad button={18} color={COLORS.RED} />
//   ]
// }

// const ledbar_24ch = {
//   // components: [
//   //   <SliderComponent key='slider1' row={1} sector={1} color={COLORS.RED} />,
//   //   <SliderComponent key='slider2' row={2} sector={2} color={COLORS.GREEN} />,
//   //   <SliderComponent key='slider3' row={3} sector={3} color={COLORS.BLUE} />,
//   //   <SliderComponent key='slider4' row={4} sector={4} color={COLORS.RED} />,
//   //   <SliderComponent key='slider5' row={5} sector={5} color={COLORS.GREEN} />,
//   //   <SliderComponent key='slider6' row={6} sector={6} color={COLORS.BLUE} />,
//   //   <SliderComponent key='slider7' row={7} sector={7} color={COLORS.RED} />,
//   //   <SliderComponent key='slider8' row={8} sector={8} color={COLORS.GREEN} />,
//   // ]
// }

// let rotateSpeed = 1
// let rotateRatioChange = 0.05

// const djLedDiamond_28CH = {
//   components: [
//     // Clear
//     <Pad button={19} color={COLORS.WHITE} onPressed={() => clearDMX()}/>,
//     <Pad button={55} color={COLORS.WHITE} onPressed={() => {
//       setFlashButton(55, 50, 70)
//     }}/>,

//     <SliderComponent row={6} orientation='horizontal' sector={1} color={COLORS.BLUE}/>,

//     <Pad button={27} color={COLORS.WHITE} onPressed={() => {
//       const anim: AnimationProps = [
//         {
//           2: 100,
//           5: 100
//         },
//         {
//           delay: 1000
//         },
//         {
//           2: 0,
//           5: 0
//         },
//         {
//           delay: 1000
//         }
//       ]

//       dmxAnimation(anim, { loop: true })
//     }}/>,

//     <Pad button={28} color={COLORS.BLUE} onPressed={() => {
//       const anim: AnimationProps =  [
//         {
//           24: 255
//         },
//         {
//           delay: 1000
//         },
//         {
//           24: 127
//         },
//         {
//           delay: 1000
//         },
//         {
//           24: 128
//         }
//       ]

//       dmxAnimation(anim, { loop: true })
//     }}/>,

//     <Pad button={Grid.TopPanel.UpArrow} color={COLORS.WHITE} onPressed={() => {
//       rotateSpeed += rotateRatioChange
//       console.log("SPEED => ", rotateSpeed, "DMX => ", 127 * rotateSpeed)
//       updateDMX({24: 127 * rotateSpeed})

//       updateDMX({
//         18: 215,
//         19: 250 * rotateSpeed
//       })
//     }}/>,

//     <Pad button={Grid.TopPanel.DownArrow} color={COLORS.WHITE} onPressed={() => {
//       rotateSpeed -= rotateRatioChange
//       console.log("SPEED => ", rotateSpeed, "DMX => ", 127 * rotateSpeed)
//       updateDMX({24: 127 * rotateSpeed})

//       updateDMX({
//         18: 243,
//         19: 250 * rotateSpeed
//       })
//     }}/>,


//     <Pad button={11} color={COLORS.BLUE} onPressed={() => {
//       updateDMX({
//         18: 215,
//         19: 250 * rotateSpeed
//       })
//     }}/>,

//     // Rotate  left
//     <Pad button={Grid.TopPanel.LeftArrow} color={COLORS.GREEN} onPressed={() => {
//       updateDMX({24: 127 * rotateSpeed})
//       setFlashButton(93, 7)
//     }}/>,
//     // Rotate right
//     <Pad button={Grid.TopPanel.RightArrow} color={COLORS.GREEN}  onPressed={() => {
//       updateDMX({24: 255})
//       setFlashButton(94, 10)
//       setFlashButton(93, 0)
//     }}/>,
//     // Stop rotate
//     <Pad button={85} color={COLORS.WHITE} onPressed={() => updateDMX({24: 128})}/>,

//     // // Velocity rotate
//     // <Pad button={84} color={COLORS.BLUE} onPressed={() => velocityRotate()}/>,


//     // Change color to green
//     <Pad button={83} color={COLORS.GREEN} onPressed={() => updateDMX({22: 60}) && setButtonColor(94, COLORS.GREEN) && setButtonColor(93, COLORS.GREEN)}/>,
//     // Change color to red
//     <Pad button={84} color={COLORS.RED} onPressed={() => updateDMX({22: 30}) && setButtonColor(94, COLORS.RED) && setButtonColor(93, COLORS.RED)}/>,

//     // Strobe
//     <Pad button={31} color={COLORS.WHITE} onPressed={() => updateDMX({25: 250})} onRelease={() => updateDMX({25: 0})}/>,

//     // Wash 1
//     <Pad button={18} color={COLORS.GREEN} onPressed={() => updateDMX({2: 100, 5: 100})} onRelease={() => updateDMX({2: 0, 5: 0})}/>,
//     // Wash 2
//     <Pad button={17} color={COLORS.RED} onPressed={() => updateDMX({6: 100, 10: 50})} onRelease={() => updateDMX({6: 0, 10: 0})}/>,

//     // Change color
//     // <Pad button={73} color={COLORS.RED} onPressed={() => {
//     //   setButtonColor(93, COLORS.RED)
//     //   setButtonColor(94, COLORS.RED)
//     //   window.dmxUpdate({22: 30 })
//     // }}/>,gst
//     // Change color
//     // <Pad button={74} color={COLORS.GREEN} onPressed={() => {
//     //   setButtonColor(93, COLORS.GREEN)
//     //   setButtonColor(94, COLORS.GREEN)
//     //   window.dmxUpdate({22: 60 })
//     // }}/>,
//     // <Pad button={73} color={COLORS.GREEN} onPressed={() => {
//     //   window.dmxUpdate({22: 60 })
//     //   setButtonColor(93, COLORS.GREEN)
//     //   setButtonColor(94, COLORS.GREEN)
//     // }}/>,
//   ]
// }

const rng = () => Math.floor(Math.random() * 255)

window.tempo = 435

let flashIntervalCache = []

const flashRandom = (button: number, startPos: number) => {
  const dmxRed = startPos++
  const dmxGreen = startPos++
  const dmxBlue = startPos++
  const [r, g, b] = randomRGB()

  const delay = window.tempo

  const anim: AnimationProps = [
    {
      1: 255,
      [dmxRed]: r,
      [dmxGreen]: g,
      [dmxBlue]: b
    },
    {
      delay
    },
    {
      [dmxRed]: 0,
      [dmxGreen]: 0,
      [dmxBlue]: 0
    },
    {
      delay
    }
  ]

  setButtonColor(button, [r, g, b])

  let toggle = false
  const flashInterval = setInterval(() => {
    toggle = !toggle
    setButtonColor(button, toggle ? COLORS.OFF : [r, g, b])
  }, window.tempo)
  flashIntervalCache.push(flashInterval)

  dmxAnimation(anim, { loop: true })
}

const flashRandomColor = (button: number, color: 'red' | 'green' | 'blue', dmxChannel: number) => {
  const [r, g, b] = [color === 'red' ? 255 : 0, color === 'green' ? 255 : 0, color === 'blue' ? 255 : 0]
  const delay = window.tempo
  console.log([r,g,b])

  const anim: AnimationProps = [
    {
      1: 255,
      [dmxChannel]: 255,  
    },
    {
      delay
    },
    {
      [dmxChannel]: 0
    },
    {
      delay
    }
  ]

  setButtonColor(button, [r, g, b])

  let toggle = false
  const flashInterval = setInterval(() => {
    toggle = !toggle
    setButtonColor(button, toggle ? COLORS.OFF : [r, g, b])
  }, window.tempo)
  flashIntervalCache.push(flashInterval)

  dmxAnimation(anim, { loop: true })
}

window.strobePos = []

const row = [
  <Pad button={11} color={COLORS.OFF} onPressed={() => flashRandom(11, 3)} />,
  <Pad button={12} color={COLORS.OFF} onPressed={() => flashRandom(12, 6)} />,
  <Pad button={13} color={COLORS.OFF} onPressed={() => flashRandom(13, 9)} />,
  <Pad button={14} color={COLORS.OFF} onPressed={() => flashRandom(14, 12)} />,
  <Pad button={15} color={COLORS.OFF} onPressed={() => flashRandom(15, 15)} />,
  <Pad button={16} color={COLORS.OFF} onPressed={() => flashRandom(16, 18)} />,
  <Pad button={17} color={COLORS.OFF} onPressed={() => flashRandom(17, 21)} />,
  <Pad button={18} color={COLORS.OFF} onPressed={() => flashRandom(18, 24)} />,
  
  // Row 1 - RED
  <Pad button={21} color={COLORS.OFF} onPressed={() => flashRandomColor(21, 'red', 3 )} />,
  <Pad button={22} color={COLORS.OFF} onPressed={() => flashRandomColor(22, 'red', 6 )} />,
  <Pad button={23} color={COLORS.OFF} onPressed={() => flashRandomColor(23, 'red', 9 )} />,
  <Pad button={24} color={COLORS.OFF} onPressed={() => flashRandomColor(24, 'red', 12 )} />,
  <Pad button={25} color={COLORS.OFF} onPressed={() => flashRandomColor(25, 'red', 15 )} />,
  <Pad button={26} color={COLORS.OFF} onPressed={() => flashRandomColor(26, 'red', 18 )} />,
  <Pad button={27} color={COLORS.OFF} onPressed={() => flashRandomColor(27, 'red', 21 )} />,
  <Pad button={28} color={COLORS.OFF} onPressed={() => flashRandomColor(28, 'red', 24 )} />,
  <Pad button={29} color={COLORS.RED}/>,

  // ROW 2 - GREEN
  <Pad button={31} color={COLORS.OFF} onPressed={() => flashRandomColor(31, 'green', 4 )} />,
  <Pad button={32} color={COLORS.OFF} onPressed={() => flashRandomColor(32, 'green', 7 )} />,
  <Pad button={33} color={COLORS.OFF} onPressed={() => flashRandomColor(33, 'green', 10 )} />,
  <Pad button={34} color={COLORS.OFF} onPressed={() => flashRandomColor(34, 'green', 13 )} />,
  <Pad button={35} color={COLORS.OFF} onPressed={() => flashRandomColor(35, 'green', 16 )} />,
  <Pad button={36} color={COLORS.OFF} onPressed={() => flashRandomColor(36, 'green', 19 )} />,
  <Pad button={37} color={COLORS.OFF} onPressed={() => flashRandomColor(37, 'green', 22 )} />,
  <Pad button={38} color={COLORS.OFF} onPressed={() => flashRandomColor(38, 'green', 25 )} />,
  <Pad button={39} color={COLORS.GREEN}/>,

  // ROW 3 - BLUE
  <Pad button={41} color={COLORS.OFF} onPressed={() => flashRandomColor(41, 'blue', 5 )} />,
  <Pad button={42} color={COLORS.OFF} onPressed={() => flashRandomColor(42, 'blue', 8 )} />,
  <Pad button={43} color={COLORS.OFF} onPressed={() => flashRandomColor(43, 'blue', 11 )} />,
  <Pad button={44} color={COLORS.OFF} onPressed={() => flashRandomColor(44, 'blue', 14 )} />,
  <Pad button={45} color={COLORS.OFF} onPressed={() => flashRandomColor(45, 'blue', 17 )} />,
  <Pad button={46} color={COLORS.OFF} onPressed={() => flashRandomColor(46, 'blue', 20 )} />,
  <Pad button={47} color={COLORS.OFF} onPressed={() => flashRandomColor(47, 'blue', 23 )} />,
  <Pad button={48} color={COLORS.OFF} onPressed={() => flashRandomColor(48, 'blue', 26 )} />,
  <Pad button={49} color={COLORS.BLUE}/>,

  // ROW 4 - Strobe
  <Pad button={51} onPressed={() => {
    window.strobePos.push(1)
    setButtonColor(51, COLORS.WHITE)
  }}/>,
  <Pad button={52} onPressed={() => {
    window.strobePos.push(2)
    setButtonColor(52, COLORS.WHITE)
  }}/>,
  <Pad button={53} onPressed={() => {
    window.strobePos.push(3)
    setButtonColor(53, COLORS.WHITE)
  }}/>,
  <Pad button={54} onPressed={() => {
    window.strobePos.push(3)
    setButtonColor(54, COLORS.WHITE)
  }}/>,
  <Pad button={55} onPressed={() => {
    window.strobePos.push(5)
    setButtonColor(55, COLORS.WHITE)
  }}/>,
  <Pad button={56} onPressed={() => {
    window.strobePos.push(6)
    setButtonColor(56, COLORS.WHITE)
  }}/>,
  <Pad button={57} onPressed={() => {
    window.strobePos.push(7)
    setButtonColor(57, COLORS.WHITE)
  }}/>,
  <Pad button={58} onPressed={() => {
    window.strobePos.push(8)
    setButtonColor(58, COLORS.WHITE)
  }}/>,
  <Pad button={59} color={COLORS.WHITE}/>,
]

const ChangeTempoComponent = ({ direction, steps }) => {
  const dispatch = useDispatch()
  const tempo = useSelector((state: any) => state.pad.tempo)
  const newTempo = tempo + steps

  dispatch(changeTempo(newTempo))

  return <>Tempo: {tempo}</>
}

const ledbar_26CH = {
  components: [
    <TempoComponent/>,
    // <Pad button={Grid.TopPanel.UpArrow} color={COLORS.WHITE} onPressed={() => {
    // }}/>,
    <Pad button={19} color={COLORS.WHITE} onPressed={() => {
      clearDMX()
      window.strobePos = []
      flashIntervalCache.map(item => clearInterval(item))
      row.filter(item => String(item.props.button).charAt(1) != 9).map(item => setButtonColor(item.props.button, COLORS.OFF))
    }} />,
    row
  ]
}

const snuffishConfig: Config = {
  scenes: {
    ledbar_26CH
  }
}

export default snuffishConfig
