import { changeColor } from 'Redux/components/pad/padActions'
import React from 'react'
import { useDispatch } from 'react-redux'

type Props = { buttonMap: number[] }

const Slider = ({ buttonMap }: Props) => {
  const dispatch = useDispatch()

  buttonMap.map((button) => {
    dispatch(changeColor(button, [0, 200, 0]))
  })

  return <></>
}

export default Slider
