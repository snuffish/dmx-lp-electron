// @ts-nocheck
import { motion, transform, useMotionValue } from "framer-motion"
import React, { useEffect } from "react"

const MotionTest = (props: any) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const opacity = useMotionValue(1)

  useEffect(() => {
    function updateOpacity() {
      const maxXY = Math.max(x.get(), y.get())
      const newOpacity = transform(maxXY, [0, 100], [1, 0])
      opacity.set(newOpacity)
    }

    const unsubscribeX = x.on("change", updateOpacity)
    const unsubscribeY = y.on("change", updateOpacity)
  }, [x,y])

  return (
    <motion.div style={{x}}>
      {x}
    </motion.div>
  )
}

export default MotionTest