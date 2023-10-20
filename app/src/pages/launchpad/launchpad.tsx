import { Box } from '@material-ui/core'
import Debug from 'Components/Debug'
import MotionTest from 'Components/MotionTest'
import config from 'Config/snuffish'
import { BUTTON_DOWN } from 'Constants/events'
import { CHANNELS } from 'Constants/ipc'
import { setPressed } from 'Redux/components/pad/padActions'
import { clearGrid } from 'Utils/launchpad'
import React from 'react'
import { useDispatch } from 'react-redux'

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
  const dispatch = useDispatch()

  window.api.receive(CHANNELS.LP.PAD, ({ event, button }: any) => {
    dispatch(setPressed(button, event === BUTTON_DOWN ?? false))
  })

  clearGrid()

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
