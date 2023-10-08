import { CHANNELS } from "Constants/ipc"
import React from "react"
import { createContext } from "react"

const SliderComponent = () => {
  const buttons = [11, 21, 31, 41, 51, 61, 71, 81]

  return (
    <></>
  )
}

const Context = createContext({
  components: [SliderComponent]
})

const Launchpad = () => {

  // @ts-ignore
  window.api.send(CHANNELS.LP.CLEAR)

  return (
    <></>
  )
}