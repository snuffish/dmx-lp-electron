import { Slider } from '@material-ui/core'
import { setButtonColor } from 'Utils/grid'
import React, { useEffect, useState } from 'react'

type Props = { buttons: number[] }

const SliderComponent = ({ buttons }: Props) => {
  const [sliderValue, setSliderValue] = useState(0)

  let value = sliderValue
  for (const button of buttons) {
    if (value >= 255) {
      setButtonColor(button, [0, 255, 0])
    } else {
      value = value < 0 ? 0 : value
      setButtonColor(button, [0, value, 0])
    }
    value -= 255
  }

  return <>
    <Slider
      orientation='vertical'
      min={0}
      max={2305}
      defaultValue={0}
      // step={255}
      onChange={(e: any, value: any) => setSliderValue(value)}
    />
  </>
}

export default SliderComponent
