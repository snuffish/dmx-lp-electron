import Pad from "Components/launchpad/Pad"

export const getAllButtons = () => {
  let buttons: number[] = []
  for (let y = 1; y <= 8; y++) {
    for (let x = 1; x <= 8; x++) {
      buttons.push(parseInt(`${x}${y}`))
    }
  }
  return buttons
}

export const arrayEqual = (arr1: [], arr2: []) =>
  JSON.stringify(arr1) === JSON.stringify(arr2)
