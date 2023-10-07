// @ts-nocheck
import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { changeColor } from "Redux/components/pad/padSlice";
import { randomRGB } from "../utils/color";

const TestComponent = ({
  changeColor
}) => {
  const color = useSelector(state => state.pad.color)
  const buttons = useSelector(state => state.pad.buttons)
  const button11 = useSelector(state => state.pad.buttons[11]) 

  // useEffect(() => {
  //   console.log("CHANGED COLOR TO =>", color)
  // }, [color])

  useEffect(() => {

  }, [])

  return (
    <>
      <Button onClick={() => changeColor(JSON.stringify([255, 0, 0]))}>R</Button>
      <Button onClick={() => changeColor(JSON.stringify([0, 255, 0]))}>G</Button>
      <Button onClick={() => changeColor(JSON.stringify([0, 0, 255]))}>B</Button>
      <br/>
      <span>COLOR: {color}</span>
      {/* <br/>
      <span>Buttons: {JSON.stringify(buttons)}</span>
      <br/>
      <span>Button11: {JSON.stringify(button11)}</span> */}
    </>
  )
}

const mapStateToProps = (state: any, _props: any) => ({
  color: state.color
})
const mapDispatch = { changeColor }

export default connect(mapStateToProps, mapDispatch)(TestComponent)
