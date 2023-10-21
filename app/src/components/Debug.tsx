// @ts-nocheck
import React from "react"
import { useSelector } from "react-redux"

const Debug = () => {
  const tempo = useSelector((state: any) => state.pad.tempo)
  const buttons = useSelector((state: any) => state.pad.buttons)

  return (
    <>
      {/* <br />
      <span>Color: {color}</span> */}
      <br />
      <span><b>Tempo:</b> {window.tempo}</span><br/>
      <span>
        <b>Buttons</b>
        <br />
        {JSON.stringify(buttons)}
      </span>
    </>
  )
}

export default Debug
