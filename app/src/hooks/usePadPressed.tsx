import { useSelector } from 'react-redux'

const usePadPressed = (button: string) => {
  const { isPressed } = useSelector((state: any) => state.pad.buttons[button])
}

export default usePadPressed
