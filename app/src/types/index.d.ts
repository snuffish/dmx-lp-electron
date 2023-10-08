export {}

declare global {
  interface Window {
    api: {
      send: (channel: string, data?: any) => void
      [key: string]: any
    }
  }
}
