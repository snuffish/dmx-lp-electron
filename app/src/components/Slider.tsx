import { changeColor } from 'Redux/components/pad/padActions'
import React from 'react'
import { useDispatch } from 'react-redux'

type Props = { buttonMap: number[] }

const Slider = ({ buttonMap }: Props) => {
  const dispatch = useDispatch()

  const ws = new WebSocket('ws://localhost:8080')
  ws.addEventListener('open', (event) => {
    console.log('CONNECTED!')
  })

  ws.addEventListener('message', (data) => {
    console.log("RECEIVED =>", data)
  })

  buttonMap.map((button) => {
    dispatch(changeColor(button, [0, 200, 0]))
  })

  return <></>
}

export default Slider
