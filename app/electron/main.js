const {
  app,
  protocol,
  BrowserWindow,
  session,
  ipcMain,
  Menu,
} = require('electron')
const {
  default: installExtension,
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS,
} = require('electron-devtools-installer')
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
const port = 40992 // Hardcoded; needs to match webpack.development.js and package.json
const selfHost = `http://localhost:${port}`

// LP
const {
  autoDetect,
  ILaunchpad,
  RgbColor,
  colors: { colorFromRGB },
} = require('launchpad.js')
const { DMX, EnttecUSBDMXProDriver, UniverseData, Animation } = require('dmx-ts')

let win
let menuBuilder

let lp

let dmx
let universe

async function createWindow() {
  if (!isDev) {
    protocol.registerBufferProtocol(
      Protocol.scheme,
      Protocol.requestHandler
    ) /* eng-disable PROTOCOL_HANDLER_JS_CHECK */
  }

  const store = new Store({
    path: app.getPath('userData'),
  })

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
      /* eng-disable PRELOAD_JS_CHECK */
      disableBlinkFeatures: 'Auxclick',
    },
  })

  // Sets up main.js bindings for our i18next backend
  i18nextBackend.mainBindings(ipcMain, win, fs)

  // Sets up main.js bindings for our electron store;
  // callback is optional and allows you to use store in main process
  const callback = function (success, initialStore) {
    console.log(
      `${!success ? 'Un-s' : 'S'}uccessfully retrieved store in main process.`
    )
    console.log(initialStore) // {"key1": "value1", ... }
  }

  store.mainBindings(ipcMain, win, fs, callback)

  // Sets up bindings for our custom context menu
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

  // Setup bindings for offline license verification
  SecureElectronLicenseKeys.mainBindings(ipcMain, win, fs, crypto, {
    root: process.cwd(),
    version: app.getVersion(),
  })

  // Load app
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

  // Only do these things when in development
  if (isDev) {
    // Errors are thrown if the dev tools are opened
    // before the DOM is ready
    win.webContents.once('dom-ready', async () => {
      await installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
        .then((name) => console.log(`Added Extension: ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
        .finally(() => {
          require('electron-debug')() // https://github.com/sindresorhus/electron-debug
          win.webContents.openDevTools()
        })
    })
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  // https://electronjs.org/docs/tutorial/security#4-handle-session-permission-requests-from-remote-content
  const ses = session
  const partition = 'default'
  ses
    .fromPartition(
      partition
    ) /* eng-disable PERMISSION_REQUEST_HANDLER_JS_CHECK */
    .setPermissionRequestHandler((webContents, permission, permCallback) => {
      const allowedPermissions = [] // Full list here: https://developer.chrome.com/extensions/declare_permissions#manifest

      if (allowedPermissions.includes(permission)) {
        permCallback(true) // Approve permission request
      } else {
        console.error(
          `The application tried to request permission for '${permission}'. This permission was not whitelisted and has been blocked.`
        )

        permCallback(false) // Deny
      }
    })

  // https://electronjs.org/docs/tutorial/security#1-only-load-secure-content;
  // The below code can only run when a scheme and host are defined, I thought
  // we could use this over _all_ urls
  // ses.fromPartition(partition).webRequest.onBeforeRequest({urls:["http://localhost./*"]}, (listener) => {
  //   if (listener.url.indexOf("http://") >= 0) {
  //     listener.callback({
  //       cancel: true
  //     });
  //   }
  // });

  menuBuilder = MenuBuilder(win, app.name)

  // Set up necessary bindings to update the menu items
  // based on the current language selected
  i18nextMainBackend.on('initialized', (loaded) => {
    i18nextMainBackend.changeLanguage('en')
    i18nextMainBackend.off('initialized') // Remove listener to this event as it's not needed anymore
  })

  // When the i18n framework starts up, this event is called
  // (presumably when the default language is initialized)
  // BEFORE the "initialized" event is fired - this causes an
  // error in the logs. To prevent said error, we only call the
  // below code until AFTER the i18n framework has finished its
  // "initialized" event.
  i18nextMainBackend.on('languageChanged', (lng) => {
    if (i18nextMainBackend.isInitialized) {
      menuBuilder.buildMenu(i18nextMainBackend)
    }
  })
}

// Needs to be called before app is ready;
// gives our scheme access to load relative files,
// as well as local storage, cookies, etc.
// https://electronjs.org/docs/api/protocol#protocolregisterschemesasprivilegedcustomschemes
protocol.registerSchemesAsPrivileged([
  {
    scheme: Protocol.scheme,
    privileges: {
      standard: true,
      secure: true,
    },
  },
])

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  } else {
    i18nextBackend.clearMainBindings(ipcMain)
    ContextMenu.clearMainBindings(ipcMain)
    SecureElectronLicenseKeys.clearMainBindings(ipcMain)
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// https://electronjs.org/docs/tutorial/security#12-disable-or-limit-navigation
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (contentsEvent, navigationUrl) => {
    /* eng-disable LIMIT_NAVIGATION_JS_CHECK  */
    const parsedUrl = new URL(navigationUrl)
    const validOrigins = [selfHost]

    // Log and prevent the app from navigating to a new page if that page's origin is not whitelisted
    if (!validOrigins.includes(parsedUrl.origin)) {
      console.error(
        `The application tried to navigate to the following address: '${parsedUrl}'. This origin is not whitelisted and the attempt to navigate was blocked.`
      )

      contentsEvent.preventDefault()
    }
  })

  contents.on('will-redirect', (contentsEvent, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)
    const validOrigins = []

    // Log and prevent the app from redirecting to a new page
    if (!validOrigins.includes(parsedUrl.origin)) {
      console.error(
        `The application tried to redirect to the following address: '${navigationUrl}'. This attempt was blocked.`
      )

      contentsEvent.preventDefault()
    }
  })

  // https://electronjs.org/docs/tutorial/security#11-verify-webview-options-before-creation
  contents.on(
    'will-attach-webview',
    (contentsEvent, webPreferences, params) => {
      // Strip away preload scripts if unused or verify their location is legitimate
      delete webPreferences.preload
      delete webPreferences.preloadURL

      // Disable Node.js integration
      webPreferences.nodeIntegration = false
    }
  )

  // https://electronjs.org/docs/tutorial/security#13-disable-or-limit-creation-of-new-windows
  // This code replaces the old "new-window" event handling;
  // https://github.com/electron/electron/pull/24517#issue-447670981
  contents.setWindowOpenHandler(({ url }) => {
    const parsedUrl = new URL(url)
    const validOrigins = []

    // Log and prevent opening up a new window
    if (!validOrigins.includes(parsedUrl.origin)) {
      console.error(
        `The application tried to open a new window at the following address: '${url}'. This attempt was blocked.`
      )
      return {
        action: 'deny',
      }
    }

    return {
      action: 'allow',
    }
  })
})

const initDMX = async () => {
  const serialPort = '/dev/cu.usbserial-A5065QFW'
  const dmxSpeed = 40

  dmx = new DMX()
  const driver = new EnttecUSBDMXProDriver(serialPort, { dmxSpeed })

  universe = await dmx.addUniverse('universe1', driver)

  universe.updateAll(0)

  // const animation = new Animation()
  //   .add({
  //     2: 255
  //   }, 5000, { easing: 'outBounce' })
  //   .add({
  //     2: 0
  //   },1000, { easing: 'inCirc' })
  //   .runLoop(universe)
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
  .on('dmxUpdate', (event, universeData ) => {
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
