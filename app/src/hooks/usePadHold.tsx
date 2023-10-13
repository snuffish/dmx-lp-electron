// @ts-nocheck
import { BUTTON_DOWN } from "Constants/events"
import { CHANNELS } from "Constants/ipc"
import { ReceiveProps } from "Types/index"
import { useEffect, useState } from "react"

const usePadHold = (button: number) => {
  const [seconds, setSeconds] = useState(0)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    const seconds = (endDate.getTime() - endDate.getTime()) / 1000;
    console.log("SEKS =>>>", seconds)
    setSeconds(seconds)
  }, [endDate])

  window.api.receive(CHANNELS.LP.PAD, ({ event, button: _button }: ReceiveProps) => {
    // if (_button !== button)
    //   return

    if (event === BUTTON_DOWN) {
      setStartDate(new Date())
    } else {
      setEndDate(new Date()) // editorconfig: special
    }
  })

  return {
    seconds
  }
}

export default usePadHold
