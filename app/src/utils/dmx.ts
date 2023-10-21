import { CHANNELS } from "Constants/ipc";
import { AnimationProps, IntRange } from "Types/index";
import { UniverseData } from "dmx-ts";

export const clearDMX = () => window.api.send(CHANNELS.DMX.CLEAR)
export const updateDMX = (data: UniverseData) => window.api.send(CHANNELS.DMX.UPDATE, data)
export const updateAllDMX = (value: IntRange<0, 256>) => window.api.send(CHANNELS.DMX.UPDATE_ALL, value)
export const dmxAnimation = (data: AnimationProps, props: { loop?: boolean }) => window.api.send(CHANNELS.DMX.ANIMATION, { data, props })
export const dmxStopAnimation = () => window.api.send(CHANNELS.DMX.STOP_ANIMATION)

// Export to window global scope
window.dmxClear = clearDMX
window.dmxUpdate = updateDMX
window.dmxUpdateAll = updateAllDMX
window.dmxAnimation = dmxAnimation
window.dmxStopAnimation = dmxStopAnimation
