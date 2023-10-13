import { Button, ButtonIn } from "launchpad.js"

export {}

declare global {
  interface Window {
    api: {
      send: (channel: string, data?: any) => boolean
      [key: string]: any
    }
  }
}


export type ReceiveProps = { event: string, button: number }

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>
