import { BUTTON_DOWN } from 'Constants/events'
import { CHANNELS } from 'Constants/ipc'
import { setPressed } from 'Redux/components/pad/padActions'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Receiver = () => {
  const dispatch = useDispatch()

  useEffect(() => console.log('Receiver listening!'), [])

  // @ts-ignore
  window.api.receive(CHANNELS.LP.PAD, ({ event, button }) => {
    dispatch(setPressed(button.nr, event === BUTTON_DOWN ?? false))
  })

  return <></>
}

export default Receiver
