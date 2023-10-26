// @ts-nocheck
import { changeColor, changeTempo } from "Redux/components/pad/padActions"
import { COLORS } from "Utils/color"
import { updateDMX } from "Utils/dmx"
import { Grid, setButtonColor } from "Utils/launchpad"
import React from "react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

const tempoStep = 0.0025
let barPosition = 0

const TempoComponent = () => {
  const dispatch = useDispatch()
  const tempo = window.tempo
  const [toggle, setToggle] = useState(false)
  const rightArrowIsPressed = useSelector((state: any) => state.pad.buttons[Grid.TopPanel.RightArrow].isPressed)
  const leftArrowIsPressed = useSelector((state: any) => state.pad.buttons[Grid.TopPanel.LeftArrow].isPressed)
  const tempoArrowIsPressed = useSelector((state: any) => state.pad.buttons[Grid.RightPanel.Arrow7].isPressed)

  useEffect(() => {
    setTimeout(() => {
      setToggle(!toggle)

      if (barPosition === 0) {
        setButtonColor(parseInt(`78`), COLORS.OFF)
        setButtonColor(Grid.Logo, COLORS.WHITE)
      } else {
        setButtonColor(Grid.Logo, toggle ? COLORS.WHITE : [10, 10, 10])
      }
      setButtonColor(82, toggle ? COLORS.WHITE : COLORS.OFF)
      setButtonColor(84, toggle ? COLORS.WHITE : COLORS.OFF)
      setButtonColor(86, toggle ? COLORS.WHITE : COLORS.OFF)
      setButtonColor(88, toggle ? COLORS.WHITE : COLORS.OFF)

      setButtonColor(81, toggle ? COLORS.OFF : COLORS.WHITE_DARK)
      setButtonColor(83, toggle ? COLORS.OFF : COLORS.WHITE_DARK)
      setButtonColor(85, toggle ? COLORS.OFF : COLORS.WHITE_DARK)
      setButtonColor(87, toggle ? COLORS.OFF : COLORS.WHITE_DARK)

      setButtonColor(parseInt(`7${barPosition}`), COLORS.OFF)
      barPosition++
      setButtonColor(parseInt(`7${barPosition}`), COLORS.WHITE_DARKER)
      if (barPosition === 8) {
        barPosition = 0
      }

      if (window.strobePos.includes(barPosition)) {
        updateDMX({
          2: 255
        })
      } else {
        updateDMX({
          2: 0
        })
      }
    }, window.tempo)
  }, [toggle])

  useEffect(() => {
    if (tempoArrowIsPressed) {
      barPosition = 0
      setButtonColor(71, COLORS.OFF)
      setButtonColor(72, COLORS.OFF)
      setButtonColor(73, COLORS.OFF)
      setButtonColor(74, COLORS.OFF)
      setButtonColor(75, COLORS.OFF)
      setButtonColor(76, COLORS.OFF)
      setButtonColor(77, COLORS.OFF)
      setButtonColor(78, COLORS.OFF)
    }
  }, [tempoArrowIsPressed])

  useEffect(() => {
    setButtonColor(Grid.TopPanel.RightArrow, COLORS.WHITE_DARK)
    setButtonColor(Grid.TopPanel.LeftArrow, COLORS.WHITE_DARK)
    setButtonColor(Grid.RightPanel.Arrow7, COLORS.WHITE)
  }, [])

  useEffect(() => {
    if (rightArrowIsPressed) {
      setButtonColor(Grid.TopPanel.RightArrow, COLORS.WHITE)
      window.interval = setInterval(() => {
        window.tempo = window.tempo - 1
        console.log(window.tempo)
      }, 50)
    }
  }, [rightArrowIsPressed])

  useEffect(() => {
    if (!rightArrowIsPressed) {
      setButtonColor(Grid.TopPanel.RightArrow, COLORS.WHITE_DARK)
      clearInterval(window.interval)
    }
  }, [rightArrowIsPressed])

  useEffect(() => {
    if (leftArrowIsPressed) {
      setButtonColor(Grid.TopPanel.LeftArrow, COLORS.WHITE  )
      window.interval = setInterval(() => {
        window.tempo = window.tempo + 1
        console.log(window.tempo)
      }, 50)
    }
  }, [leftArrowIsPressed])

  useEffect(() => {
    if (!leftArrowIsPressed) {
      setButtonColor(Grid.TopPanel.RightArrow, COLORS.WHITE_DARK)
      clearInterval(window.interval)
    }
  }, [leftArrowIsPressed])

  return null
}

export default TempoComponent
