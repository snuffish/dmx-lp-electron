export const getAllButtons = () => {
  let buttons: number[] = []
  for (let y = 1; y <= 9; y++) {
    for (let x = 1; x <= 9; x++) {
      buttons.push(parseInt(`${x}${y}`))
    }
  }
  return buttons
}

export const arrayEqual = (arr1: [], arr2: []) =>
  JSON.stringify(arr1) === JSON.stringify(arr2)
