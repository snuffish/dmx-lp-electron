import React from "react"
import { useSelector } from "react-redux"

const Debug = () => {
  const buttons = useSelector((state: any) => state.pad.buttons)

  return (
    <>
      {/* <br />
      <span>Color: {color}</span> */}
      <br />
      <span>
        <b>Buttons</b>
        <br />
        {JSON.stringify(buttons)}
      </span>
    </>
  )
}

export default Debug
