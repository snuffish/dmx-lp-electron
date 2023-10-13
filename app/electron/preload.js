const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs')
const i18nextBackend = require('i18next-electron-fs-backend')
const Store = require('secure-electron-store').default
const ContextMenu = require('secure-electron-context-menu').default
const SecureElectronLicenseKeys = require('secure-electron-license-keys')

const store = new Store()

const API = {
  i18nextElectronBackend: i18nextBackend.preloadBindings(ipcRenderer, process),
  store: store.preloadBindings(ipcRenderer, fs),
  contextMenu: ContextMenu.preloadBindings(ipcRenderer),
  licenseKeys: SecureElectronLicenseKeys.preloadBindings(ipcRenderer),
  send: (channel, data) => {
    ipcRenderer.send(channel, data)
    return true
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args))
    return true
  },
}

contextBridge.exposeInMainWorld('api', API)
