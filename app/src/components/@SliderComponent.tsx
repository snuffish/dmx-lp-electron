import { Slider } from '@material-ui/core'
import { BUTTON_UP } from 'Constants/events'
import { CHANNELS } from 'Constants/ipc'
import { IntRange, ReceiveProps } from 'Types/index'
import { LogoRightTopCorner, RightPanel } from 'Utils/Panel'
import { COLORS } from 'Utils/color'
import { updateDMX } from 'Utils/dmx'
import { GridRowOrientation, getGridRow, setButtonColor } from 'Utils/launchpad'
import { useMotionValue, useTransform, motion } from 'framer-motion'
import { RgbColor } from 'launchpad.js'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

type Props = {
  row: IntRange<1, 9>,
  onPressed?: Function
  orientation?: GridRowOrientation,
  color?: RgbColor
}

const SliderComponent = ({ row, orientation = 'vertical', color, onPressed }: Props) => {
  const [sliderValue, setSliderValue] = useState(0)
  const isButtonPressed = useSelector((state: any) => state.pad.buttons(11).isPressed)

  const buttons = getGridRow(row, orientation)
  const sliderMax = 2305
  const max = 255

  useEffect(() => {
    console.log("DSDS")
  }, [isButtonPressed])

  // window.api.receive(CHANNELS.LP.PAD, ({ event, button }: ReceiveProps) => {
  //   if (event === BUTTON_UP) {
  //     setButtonColor(LogoRightTopCorner, COLORS.OFF)
  //     return
  //   }

  //   if (button === RightPanel.STOP_SOLO_MUTE) {
  //     setSliderValue(0)
  //     return
  //   }

  //   if (buttons.includes(button)) {
  //     const index = buttons.indexOf(button) + 1
  //     if (index !== 0) {
  //       setSliderValue(max * index)
  //     }
  //   }
  // })

  let value = sliderValue
  for (const button of buttons) {
    let newValue
    if (value >= max) {
      newValue = max
    } else {
      newValue = value < 0 ? 0 : value
    }

    let rgbColor: RgbColor = COLORS.OFF
    let colorAtIndex: number = -1

    switch (color) {
      case COLORS.RED:
        rgbColor = [newValue, 0, 0]
        colorAtIndex = 0
        break
      case COLORS.GREEN:
        rgbColor = [0, newValue, 0]
        colorAtIndex = 1
        break
      case COLORS.BLUE:
        rgbColor = [0, 0, newValue]
        colorAtIndex = 2
        break
    }

    setButtonColor(button, rgbColor)

    const data: Record<number, number> = {}
    // for (let i = 0; i < dmxChannels.length; i++) {
    //   let color = 0
    //   if (colorAtIndex === i)
    //     color = (sliderValue / sliderMax) * max

    //   data[dmxChannels[i]] = color
    // }
    // updateDMX(data)

    value -= max
  }

  const onChangeHandler = (e: any, value: any) => setSliderValue(value)

  return <>
    <Slider
      orientation={orientation}
      min={0}
      step={1}
      max={sliderMax}
      defaultValue={0}
      value={sliderValue}
      onChange={onChangeHandler}
    />
  </>
}

export default SliderComponent
