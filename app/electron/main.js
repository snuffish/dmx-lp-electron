const { app, protocol, BrowserWindow, session, ipcMain, Menu } = require('electron')
const { default: installExtension, REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')
const SecureElectronLicenseKeys = require('secure-electron-license-keys')
const Protocol = require('./protocol')
const MenuBuilder = require('./menu')
const i18nextBackend = require('i18next-electron-fs-backend')
const i18nextMainBackend = require('../localization/i18n.mainconfig')
const Store = require('secure-electron-store').default
const ContextMenu = require('secure-electron-context-menu').default
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const isDev = process.env.NODE_ENV === 'development'
const port = 40992
const selfHost = `http://localhost:${port}`

// LP
const { autoDetect, ILaunchpad, RgbColor, colors: { colorFromRGB } } = require('launchpad.js')
const { DMX, EnttecUSBDMXProDriver, UniverseData, Animation } = require('dmx-ts')

let win
let menuBuilder

let lp

let dmx
let universe

async function createWindow() {
  if (!isDev)
    protocol.registerBufferProtocol(Protocol.scheme, Protocol.requestHandler)

  const store = new Store({ path: app.getPath('userData') })

  win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Application is currently initializing...',
    webPreferences: {
      devTools: isDev,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      contextIsolation: true,
      enableRemoteModule: false,
      additionalArguments: [
        `--storePath=${store.sanitizePath(app.getPath('userData'))}`,
      ],
      preload: path.join(__dirname, 'preload.js'),
      disableBlinkFeatures: 'Auxclick'
    },
  })

  i18nextBackend.mainBindings(ipcMain, win, fs)

  const callback = function (success, initialStore) {
    console.log(
      `${!success ? 'Un-s' : 'S'}uccessfully retrieved store in main process.`
    )
    console.log(initialStore)
  }

  store.mainBindings(ipcMain, win, fs, callback)

  ContextMenu.mainBindings(ipcMain, win, Menu, isDev, {
    loudAlertTemplate: [
      {
        id: 'loudAlert',
        label: 'AN ALERT!',
      },
    ],
    softAlertTemplate: [
      {
        id: 'softAlert',
        label: 'Soft alert',
      },
    ],
  })

  SecureElectronLicenseKeys.mainBindings(ipcMain, win, fs, crypto, {
    root: process.cwd(),
    version: app.getVersion(),
  })

  if (isDev) {
    win.loadURL(selfHost)
  } else {
    win.loadURL(`${Protocol.scheme}://rse/index.html`)
  }

  win.webContents.on('did-finish-load', () => {
    win.setTitle(
      `Getting started with secure-electron-template (v${app.getVersion()})`
    )
  })

  if (isDev) {
    win.webContents.once('dom-ready', async () => {
      await installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
        .then((name) => console.log(`Added Extension: ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
        .finally(() => {
          require('electron-debug')()
          win.webContents.openDevTools()
        })
    })
  }

  win.on('closed', () => win = null)

  const ses = session
  const partition = 'default'
  ses
    .fromPartition(
      partition
    )
    .setPermissionRequestHandler((webContents, permission, permCallback) => {
      const allowedPermissions = []

      if (allowedPermissions.includes(permission)) {
        permCallback(true)
      } else {
        console.error(`The application tried to request permission for '${permission}'. This permission was not whitelisted and has been blocked.`)

        permCallback(false)
      }
    })

  menuBuilder = MenuBuilder(win, app.name)
  i18nextMainBackend.on('initialized', (loaded) => {
    i18nextMainBackend.changeLanguage('en')
    i18nextMainBackend.off('initialized')
  })

  i18nextMainBackend.on('languageChanged', (lng) => {
    if (i18nextMainBackend.isInitialized) {
      menuBuilder.buildMenu(i18nextMainBackend)
    }
  })
}

protocol.registerSchemesAsPrivileged([
  {
    scheme: Protocol.scheme,
    privileges: {
      standard: true,
      secure: true,
    },
  },
])

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()

  i18nextBackend.clearMainBindings(ipcMain)
  ContextMenu.clearMainBindings(ipcMain)
  SecureElectronLicenseKeys.clearMainBindings(ipcMain)
})

app.on('activate', () => win === null && createWindow())

app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (contentsEvent, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)
    const validOrigins = [selfHost]

    if (!validOrigins.includes(parsedUrl.origin)) {
      console.error(`The application tried to navigate to the following address: '${parsedUrl}'. This origin is not whitelisted and the attempt to navigate was blocked.`)

      contentsEvent.preventDefault()
    }
  })

  contents.on('will-redirect', (contentsEvent, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)
    const validOrigins = []

    if (!validOrigins.includes(parsedUrl.origin)) {
      console.error(`The application tried to redirect to the following address: '${navigationUrl}'. This attempt was blocked.`)

      contentsEvent.preventDefault()
    }
  })

  contents.on(
    'will-attach-webview',
    (contentsEvent, webPreferences, params) => {
      delete webPreferences.preload
      delete webPreferences.preloadURL
      webPreferences.nodeIntegration = false
    }
  )

  contents.setWindowOpenHandler(({ url }) => {
    const parsedUrl = new URL(url)
    const validOrigins = []

    if (!validOrigins.includes(parsedUrl.origin)) {
      console.error(`The application tried to open a new window at the following address: '${url}'. This attempt was blocked.`)
      return { action: 'deny' }
    }

    return { action: 'allow' }
  })
})

const initDMX = async () => {
  const serialPort = '/dev/cu.usbserial-A5065QFW'
  const dmxSpeed = 40

  dmx = new DMX()
  const driver = new EnttecUSBDMXProDriver(serialPort, { dmxSpeed })

  universe = await dmx.addUniverse('universe', driver)

  universe.updateAll(0)
}

const initLP = async () => {
  lp = autoDetect({ debug: false })
}

initDMX()
initLP()


// Launchpad
lp.once('ready', (device) => console.log(`Connected to ${device}`))
  .on('buttonDown', ({ nr }) => {
    const button = nr
    console.log(`Pressed => `, button)

    win.webContents.send('pad', { event: 'BUTTON_DOWN', button })
  })
  .on('buttonUp', ({ nr }) => {
    const button = nr
    console.log('Released => ', button)

    win.webContents.send('pad', { event: 'BUTTON_UP', button })
  })

ipcMain
  .on('lpClear', () => {
    console.log('CLEAR')
    lp.allOff()
  })
  .on('lpPadColor', (event, { button, color }) => {
    try {
      lp.setButtonColor(parseInt(button), colorFromRGB(color))
    } catch (ex) {
      console.log("EX => ", ex)
    }
  })

// DMX
ipcMain
  .on('dmxClear', () => universe.updateAll(0))
  .on('dmxUpdate', (event, universeData) => {
    universe.update(universeData)
  })
  .on('dmxUpdateAll', (event, value) => {
    universe.updateAll(value)
  })
  .on('dmxGetChannel', (event, channel) => {
    // @TODO: Implement this
    // const value = universe.get(channel)
    // return value
  })
