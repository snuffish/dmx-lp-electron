import { BUTTON_DOWN } from 'Constants/events'
import { CHANNELS } from 'Constants/ipc'
import { setPressed } from 'Redux/components/pad/padActions'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

type Props = { event: string, button: number }

const Receiver = () => {
  const dispatch = useDispatch()

  useEffect(() => console.log('Receiver listening!'), [])

  window.api.receive(CHANNELS.LP.PAD, ({ event, button }: Props) => {
    // @ts-ignore
    dispatch(setPressed(button.nr, event === BUTTON_DOWN ?? false))
  })

  return <></>
}

export default Receiver
 