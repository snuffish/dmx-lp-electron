// @ts-nocheck
import { changeColor, changeTempo } from "Redux/components/pad/padActions"
import { COLORS } from "Utils/color"
import { Grid, setButtonColor } from "Utils/launchpad"
import React from "react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

const tempoStep = 2.5
let barPosition = 0

const TempoComponent = () => {
  const dispatch = useDispatch()
  const tempo = window.tempo
  const [toggle, setToggle] = useState(false)
  const upArrowIsPressed = useSelector((state: any) => state.pad.buttons[Grid.TopPanel.UpArrow].isPressed)
  const downArrowIsPressed = useSelector((state: any) => state.pad.buttons[Grid.TopPanel.DownArrow].isPressed)

  useEffect(() => {
    setTimeout(() => {
      setToggle(!toggle)
      setButtonColor(Grid.Logo, toggle ? COLORS.WHITE : COLORS.OFF)

      setButtonColor(82, toggle ? COLORS.WHITE : COLORS.OFF)
      setButtonColor(84, toggle ? COLORS.WHITE : COLORS.OFF)
      setButtonColor(86, toggle ? COLORS.WHITE : COLORS.OFF)
      setButtonColor(88, toggle ? COLORS.WHITE : COLORS.OFF)

      setButtonColor(81, toggle ? COLORS.OFF : COLORS.WHITE_DARK)
      setButtonColor(83, toggle ? COLORS.OFF : COLORS.WHITE_DARK)
      setButtonColor(85, toggle ? COLORS.OFF : COLORS.WHITE_DARK)
      setButtonColor(87, toggle ? COLORS.OFF : COLORS.WHITE_DARK)

      if (barPosition === 0) {
        setButtonColor(parseInt(`78`), COLORS.OFF)
      }

      setButtonColor(parseInt(`7${barPosition}`), COLORS.OFF)
      barPosition++
      setButtonColor(parseInt(`7${barPosition}`), COLORS.WHITE_DARKER)
      if (barPosition === 8) {
        barPosition = 0
      }
    }, window.tempo)
  }, [toggle])

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
      setButtonColor(Grid.TopPanel.DownArrow, COLORS.WHITE  )
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

  return null
}

export default TempoComponent
