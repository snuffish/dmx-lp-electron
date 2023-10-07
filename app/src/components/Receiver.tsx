import { useDispatch } from 'react-redux'
import { randomRGB } from '../utils/color'
import { changeColor, setPressed } from '../redux/components/pad/padActions'

const Receiver = () => {
  const dispatch = useDispatch()

  console.log('DSDSDS')
  // @ts-ignore
  window.api.receive(CHANNELS.LP.PAD, ({ event, button }) => {
    dispatch(setPressed(button, event === 'BUTTON_DOWN' ?? false))
    dispatch(changeColor(button, randomRGB()))
  })
}

export default Receiver
