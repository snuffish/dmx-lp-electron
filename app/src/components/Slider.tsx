import { changeColor } from 'Redux/components/pad/padActions'
import React from 'react'
import { useDispatch } from 'react-redux'

type Props = { buttonMap: number[] }

const Slider = ({ buttonMap }: Props) => {
  const dispatch = useDispatch()

  buttonMap.map((button) => {
    dispatch(changeColor(button, [255, 0, 0]))
  })

  return <></>
}

export default Slider
