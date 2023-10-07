import { randomRGB } from './app/src/utils/color';
import { getAllButtons } from './app/src/utils/index';

const buttons = getAllButtons()

const data = getAllButtons()
  .reduce((acc, value) => ({ ...acc, [value]: { color: randomRGB() }}), {})

console.log(data)
