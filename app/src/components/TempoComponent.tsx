// @ts-nocheck
import { changeColor, changeTempo } from "Redux/components/pad/padActions"
import { COLORS } from "Utils/color"
import { Grid, setButtonColor } from "Utils/launchpad"
import React from "react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

const tempoStep = 2.5

const TempoComponent = () => {
  const dispatch = useDispatch()
  const tempo = window.tempo
  const [toggle, setToggle] = useState(false)
  const upArrowIsPressed = useSelector((state: any) => state.pad.buttons[Grid.TopPanel.UpArrow].isPressed)
  const downArrowIsPressed = useSelector((state: any) => state.pad.buttons[Grid.TopPanel.DownArrow].isPressed)

  useEffect(() => {
    setButtonColor(Grid.TopPanel.UpArrow, COLORS.WHITE_DARK)
    setButtonColor(Grid.TopPanel.DownArrow, COLORS.WHITE_DARK)
  }, [])


  useEffect(() => {
    if (upArrowIsPressed) {
      setButtonColor(Grid.TopPanel.UpArrow, COLORS.WHITE)
      window.interval = setInterval(() => {
        window.tempo = window.tempo + tempoStep
        console.log(window.tempo)
      }, 50)
    }
  }, [upArrowIsPressed])

  useEffect(() => {
    if (!upArrowIsPressed) {
      setButtonColor(Grid.TopPanel.UpArrow, COLORS.WHITE_DARK)
      clearInterval(window.interval)
    }
  }, [upArrowIsPressed])

  useEffect(() => {
    if (downArrowIsPressed) {
      setButtonColor(Grid.TopPanel.DownArrow, COLORS.WHITE)
      window.interval = setInterval(() => {
        window.tempo = window.tempo - tempoStep
        console.log(window.tempo)
      }, 50)
    }
  }, [downArrowIsPressed])

  useEffect(() => {
    if (!downArrowIsPressed) {
      setButtonColor(Grid.TopPanel.DownArrow, COLORS.WHITE_DARK)
      clearInterval(window.interval)
    }
  }, [downArrowIsPressed])

  

  // useEffect(() => {
  //   dispatch(changeTempo(tempo))
  // }, [tempo])

  // useEffect(() => {
  //   const newTempo = tempo + 2.5
  //   dispatch(changeTempo(newTempo))
  // }, [upArrowIsPressed])

  // useEffect(() => {
  //   const newTempo = tempo - 2.5
  //   dispatch(changeTempo(newTempo))
  // }, [downArrowIsPressed])

  useEffect(() => {
    setTimeout(() => {
      console.log("JAA => ",window.tempo)
      setToggle(!toggle)
      setButtonColor(Grid.Logo, toggle ? COLORS.WHITE : COLORS.OFF)
    }, window.tempo)
  }, [toggle])

  return null
}

export default TempoComponent
