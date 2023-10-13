import Debug from 'Components/Debug'
import Pad from 'Components/Pad'
import SliderComponent from 'Components/SliderComponent'
import { RightPanel } from 'Utils/Panel'
import { COLORS } from 'Utils/color'
import { clearDMX } from 'Utils/dmx'
import { clearGrid } from 'Utils/launchpad'
import React, { useState } from 'react'
import config from 'Config/snuffish'
import { Box, Container } from '@material-ui/core'

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
        {Object.keys(config.scenes).map(name => {
          const { components } = config.scenes[name]

          return (
            <Scene key={name} name={name}>
              {components}
            </Scene>
          )
        })}
        <Scene name='DSDSATTEEEEST'>
          <Pad button={29} />
          <Pad button={RightPanel.STOP_SOLO_MUTE} color={[50, 50, 50]} />
          <Debug />
        </Scene>
      </Scenes>
    </>
  )
}

export default Launchpad
