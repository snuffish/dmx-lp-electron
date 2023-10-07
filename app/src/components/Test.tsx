// @ts-nocheck
import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { changeColor } from "Redux/components/pad/padSlice";

const TestComponent = ({
  changeColor
}) => {
  const color = useSelector(state => state.pad.color)

  // useEffect(() => {
  //   console.log("CHANGED COLOR TO =>", color)
  // }, [color])

  return (
    <>
      <Button onClick={() => changeColor(JSON.stringify([255, 0, 0]))}>R</Button>
      <Button onClick={() => changeColor(JSON.stringify([0, 255, 0]))}>G</Button>
      <Button onClick={() => changeColor(JSON.stringify([0, 0, 255]))}>B</Button>
      <br/>
      <span>COLOR: {JSON.parse(color)}</span>
    </>
  )
}

const mapStateToProps = (state: any, _props: any) => ({
  color: state.color
})
const mapDispatch = { changeColor }

export default connect(mapStateToProps, mapDispatch)(TestComponent)
