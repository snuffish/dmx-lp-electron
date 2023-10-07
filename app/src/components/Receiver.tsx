import { useDispatch } from 'react-redux'
import { randomRGB } from '../utils/color'
import { changeColor, setPressed } from '../redux/components/pad/padActions'
import React, { useEffect } from 'react'
import { CHANNELS } from '../constants/ipc'
import { BUTTON_DOWN } from '../constants/events'

const Receiver = () => {
  const dispatch = useDispatch()

  useEffect(() => console.log('Receiver listening!'), [])

  // @ts-ignore
  window.api.receive(CHANNELS.LP.PAD, ({ event, button }) => {
    dispatch(setPressed(button.nr, event === BUTTON_DOWN ?? false))
  })

  return (
    <></>
  )
}

export default Receiver
