import { BUTTON_DOWN, BUTTON_UP } from './../constants/events';
import { Button, ButtonIn } from "launchpad.js"

export { }

declare global {
  interface Window {
    api: {
      send: (channel: string, data?: any) => boolean
      [key: string]: any
    },
    lpClear: Function
    lpSetButtonColor: Function
    dmxClear: Function
    dmxUpdate: Function
    dmxUpdateAll: Function
  }
}

export type ButtonEvent = typeof BUTTON_DOWN | typeof BUTTON_UP

export type ReceiveProps = { event: ButtonEvent, button: number }

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>
