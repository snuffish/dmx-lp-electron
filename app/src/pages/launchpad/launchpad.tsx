import { Box } from '@material-ui/core'
import Debug from 'Components/Debug'
import MotionTest from 'Components/MotionTest'
import config from 'Config/snuffish'
import { clearDMX } from 'Utils/dmx'
import { clearGrid } from 'Utils/launchpad'
import React, { useEffect, useState } from 'react'

const Scenes = ({ children }: any) => {
  return <>
    {children}
  </>
}

const Scene = ({ name, children }: any) => {
  return (
    <>
      <Box key={name}
        marginTop={20}
        minHeight={200}
        height={400}
      >
        {children}
      </Box>
    </>
  )
}

const Launchpad = (props: any) => {
  const [timer, setTimer] = useState(0)

  clearGrid()

  const onReleaseEvent = () => clearGrid() && clearDMX()

  // let components
  // for (const name in config.scenes) {
  //   components = config.scenes[name]
  //   console.log("NAME => ", name)
  //   console.log("COMPONENTS => ", components)
  // }

  // const data = Object.entries(config.scenes).reduce((acc: any, value: any) => {
  //   const [ name, components ] = value
  //   let newObj = acc
  //   newObj.push(components)
  //   return newObj
  // }, [])
  // console.log("DDDD",data)

  {
    Object.keys(config.scenes).map(sceneName => {
      const { components } = config.scenes[sceneName]
      return (components)
    })
  }

  return (
    <>
      <Scenes>
        <MotionTest/>
        {Object.keys(config.scenes).map(name => {
          const { components } = config.scenes[name]

          return (
            <Scene key={name} name={name}>
              {components}
            </Scene>
          )
        })}
        <Debug />
      </Scenes>
    </>
  )
}

export default Launchpad
