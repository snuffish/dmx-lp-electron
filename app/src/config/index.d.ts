export interface Config {
  scenes: Scene
}

export type Scene = {
  [key: string]: {
    components: JSX.Element[]
  }
}
