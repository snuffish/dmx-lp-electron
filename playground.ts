// import { cubicBezier, easeIn } from 'framer-motion'
// const easing = cubicBezier(.35,.17,.3,.86)
// const easedProgress = easing(0.5)
// console.log(easedProgress)

import { Animation } from "dmx-ts/dist/src/Animation";



const anim = new Animation()
  .add({
    1: 100
  })

console.log(anim)