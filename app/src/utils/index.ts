export const getAllButtons = () => {
  let buttons: number[] = []
  for (let y = 1; y <= 8; y++) {
    for (let x = 1; x <= 8; x++) {
      buttons.push(parseInt(`${x}${y}`))
    }
  }
  return buttons
}
