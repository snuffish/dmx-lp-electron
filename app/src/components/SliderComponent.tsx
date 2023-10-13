import { Slider } from '@material-ui/core'
import { CHANNELS } from 'Constants/ipc'
import { IntRange, ReceiveProps } from 'Types/index'
import { COLORS } from 'Utils/color'
import { updateDMX } from 'Utils/dmx'
import { GridRowOrientation, getGridRow, setButtonColor } from 'Utils/launchpad'
import { RgbColor } from 'launchpad.js'
import React, { useState } from 'react'

type Props = {
  row: IntRange<1, 9>,
  orientation?: GridRowOrientation,
  sector: number,
  color: RgbColor
}

const Sectors: Record<number, [number, number, number]> = {
  1: [1, 2, 3],
  2: [4, 5, 6],
  3: [7, 8, 9],
  4: [10, 11, 12],
  5: [13, 14, 15],
  6: [16, 17, 18],
  7: [19, 20, 21],
  8: [22, 23, 24]
}

const SliderComponent = ({ row, orientation = 'vertical', sector, color }: Props) => {
  const buttons = getGridRow(row, orientation)
  const sliderMax = 2305
  const max = 255
  const dmxChannels = Sectors[sector]

  const [sliderValue, setSliderValue] = useState(0)

  window.api.receive(CHANNELS.LP.PAD, ({ button }: ReceiveProps) => {
    if (button === 19) {
      setSliderValue(0)
      return
    }

    if (buttons.includes(button)) {
      const index = buttons.indexOf(button) + 1
      if (index !== 0) {
        setSliderValue(max * index)
      }
    }
  })

  console.log("API => ",window.api)

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
    for (let i = 0; i < dmxChannels.length; i++) {
      let color = 0
      if (colorAtIndex === i) {
        color = (sliderValue / sliderMax) * max
      }

      data[dmxChannels[i]] = color
    }
    updateDMX(data)

    value -= 255
  }

  return <>
    <Slider
      orientation={orientation}
      min={0}
      max={sliderMax}
      defaultValue={0}
      value={sliderValue}
      onChange={(e: any, value: any) => setSliderValue(value)}
    />
  </>
}

export default SliderComponent
