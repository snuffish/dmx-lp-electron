import { CHANNELS } from "Constants/ipc";
import { IntRange } from "Types/index";
import { UniverseData } from "dmx-ts";

export const clearDMX = () => window.api.send(CHANNELS.DMX.CLEAR)
export const updateDMX = (data: UniverseData) => window.api.send(CHANNELS.DMX.UPDATE, data)
export const updateAllDMX = (value: IntRange<0, 256>) => window.api.send(CHANNELS.DMX.UPDATE_ALL, value)

// Export to window global scope
window.dmxClear = clearDMX
window.dmxUpdate = updateDMX
window.dmxUpdateAll = updateAllDMX
