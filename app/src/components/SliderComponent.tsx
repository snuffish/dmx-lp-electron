import { Slider } from '@material-ui/core'
import { setButtonColor } from 'Utils/grid'
import React, { useEffect, useState } from 'react'
import usePadPressed from '../hooks/usePadPressed'
import { CHANNELS } from 'Constants/ipc'
import { COLORS } from 'Utils/color'
import { RgbColor } from 'launchpad.js'

type Colors = 'RED' |  'GREEN' | 'BLUE'
type ReceiveProps = { event: string, button: number }
type Props = { buttons: number[], sector: number, color: Colors }

const Sectors = {
  1: [1, 2, 3],
  2: [4, 5, 6],
  3: [7, 8, 9],
  4: [10, 11, 12],
  5: [13, 14, 15],
  6: [16, 17, 18],
  7: [19, 20, 21],
  8: [22, 23, 24]
}

const SliderComponent = ({ buttons, sector, color }: Props) => {
  const sliderMax = 2305
  const max = 255
  // @ts-ignore
  const dmxChannels = Sectors[sector]

  const [sliderValue, setSliderValue] = useState(0)

  window.api.receive(CHANNELS.LP.PAD, ({ event, button }: ReceiveProps) => {
    // @ts-ignore
    if (buttons.includes(button.nr)) {
      // @ts-ignore
      const index = buttons.indexOf(button.nr) + 1
      if (index !== 0) {
        setSliderValue(max * index)
      }
    }

    console.log("BTN => ", button)
  })

  let value = sliderValue
  for (const button of buttons) {
    let newValue
    if (value >= max) {
      newValue = max
    } else {
      newValue = value < 0 ? 0 : value
    }

    let rgbColor: RgbColor
    let colorAtIndex: number

    switch (color) {
      case 'RED':
        rgbColor = [newValue, 0, 0]
        colorAtIndex = 0
        break
      case 'GREEN':
        rgbColor = [0, newValue, 0]
        colorAtIndex = 1
        break
      case 'BLUE':
        rgbColor = [0, 0, newValue]
        colorAtIndex = 2
        break
    }

    setButtonColor(button, rgbColor)

    let data = {}
    for (let i = 0; i < dmxChannels.length; i++) {
      let color = 0
      if (colorAtIndex === i) {
        color = (sliderValue / sliderMax) * max
      }
      // @ts-ignore
      data[dmxChannels[i]] = color
    }
    console.log("DSDSDS",data)
    window.api.send('dmxUpdate', data)

    value -= 255
  }

  return <>
    <Slider
      orientation='vertical'
      min={0}
      max={sliderMax}
      defaultValue={0}
      value={sliderValue}
      // step={255}
      onChange={(e: any, value: any) => setSliderValue(value)}
    />
  </>
}

export default SliderComponent
