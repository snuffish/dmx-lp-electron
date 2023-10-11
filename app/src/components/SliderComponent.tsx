import { Box, Container, Slider } from '@material-ui/core'
import { setButtonColor } from 'Utils/grid'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

type Props = { buttons: number[] }

const SliderComponent = ({ buttons }: Props) => {
  const dispatch = useDispatch()

  const [sliderValue, setSliderValue] = useState(0)

  useEffect(() => {
    let value = sliderValue
    for (const button of buttons) {
      // setButtonColor(button, [0, 0, 0])
      if (value >= 255) {
        setButtonColor(button, [0, 255, 0])
      } else {
        value = value < 0 ? 0 : value
        setButtonColor(button, [0, Math.ceil(value), 0])
      }
      value -= 255
    }
    // for (let i = 0; i < buttons.length; i++) {
    // setButtonColor(buttons[i], [0, 0, 0])

    // const green = Math.floor((sliderValue / 2040) * 255)

    // setButtonColor(buttons[i], [0, green, 0])
    // }
  }, [sliderValue])

  return <>
    <Slider
      orientation='vertical'
      min={0}
      max={2305}
      // step={255}
      onChange={(e: any, value: any) => setSliderValue(value)}
    />
  </>
}

export default SliderComponent
