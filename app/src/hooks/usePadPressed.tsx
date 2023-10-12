import { useSelector } from 'react-redux'

const usePadPressed = (button: number) => {
  const { isPressed } = useSelector((state: any) => state.pad.buttons[button])

  return { isPressed }
}

export default usePadPressed
