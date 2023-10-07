"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var electron_1 = require("electron");
var electron_devtools_installer_1 = require("electron-devtools-installer");
var secure_electron_license_keys_1 = require("secure-electron-license-keys");
var protocol_1 = require("./protocol");
var menu_1 = require("./menu");
var i18next_electron_fs_backend_1 = require("i18next-electron-fs-backend");
var i18n_mainconfig_1 = require("../localization/i18n.mainconfig");
var secure_electron_store_1 = require("secure-electron-store");
var secure_electron_context_menu_1 = require("secure-electron-context-menu");
var path_1 = require("path");
var fs_1 = require("fs");
var crypto_1 = require("crypto");
var isDev = process.env.NODE_ENV === 'development';
var port = 40992; // Hardcoded; needs to match webpack.development.js and package.json
var selfHost = "http://localhost:".concat(port);
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.main = function (app, browserWindow) {
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
        Main.application.on('activate', Main.onActivate);
        Main.application.on('web-contents-created', Main.onWebContentsCreated);
    };
    Main.onWebContentsCreated = function (event, contents) {
        contents.on('will-navigate', Main.onWillNavigate);
        contents.on('will-redirect', Main.onWillRedirect);
        contents.on('will-attach-webview', Main.onWillAttachWebView);
        contents.setWindowOpenHandler(function (_a) {
            var url = _a.url;
            var parsedUrl = new URL(url);
            var validOrigins = [];
            // Log and prevent opening up a new window
            if (!validOrigins.includes(parsedUrl.origin)) {
                console.error("The application tried to open a new window at the following address: '".concat(url, "'. This attempt was blocked."));
                return {
                    action: 'deny',
                };
            }
            return {
                action: 'allow',
            };
        });
    };
    Main.onWillAttachWebView = function (contentsEvent, webPreferences, params) {
        // Strip away preload scripts if unused or verify their location is legitimate
        delete webPreferences.preload;
        delete webPreferences.preloadURL;
        // Disable Node.js integration
        webPreferences.nodeIntegration = false;
    };
    Main.onWillNavigate = function (contentsEvent, navigationUrl) {
        /* eng-disable LIMIT_NAVIGATION_JS_CHECK  */
        var parsedUrl = new URL(navigationUrl);
        var validOrigins = [selfHost];
        // Log and prevent the app from navigating to a new page if that page's origin is not whitelisted
        if (!validOrigins.includes(parsedUrl.origin)) {
            console.error("The application tried to navigate to the following address: '".concat(parsedUrl, "'. This origin is not whitelisted and the attempt to navigate was blocked."));
            contentsEvent.preventDefault();
        }
    };
    Main.onWillRedirect = function (contentsEvent, navigationUrl) {
        var parsedUrl = new URL(navigationUrl);
        var validOrigins = [];
        // Log and prevent the app from redirecting to a new page
        if (!validOrigins.includes(parsedUrl.origin)) {
            console.error("The application tried to redirect to the following address: '".concat(navigationUrl, "'. This attempt was blocked."));
            contentsEvent.preventDefault();
        }
    };
    Main.onReady = function () {
        Main.mainWindow = new Main.BrowserWindow({ width: 800, height: 600 });
        Main.mainWindow.loadURL('file://' + __dirname + '/index.html');
        Main.mainWindow.on('closed', Main.onClose);
    };
    Main.onWindowAllClosed = function () {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
        else {
            i18next_electron_fs_backend_1.default.clearMainBindings(electron_1.ipcMain);
            secure_electron_context_menu_1.default.clearMainBindings(electron_1.ipcMain);
            secure_electron_license_keys_1.default.clearMainBindings(electron_1.ipcMain);
        }
    };
    Main.onClose = function () {
        // Dereference the window object.
        Main.mainWindow = null;
    };
    Main.createWindow = function () {
        var _this = this;
        if (!isDev) {
            electron_1.protocol.registerBufferProtocol(protocol_1.default.scheme, protocol_1.default.requestHandler); /* eng-disable PROTOCOL_HANDLER_JS_CHECK */
        }
        var store = new secure_electron_store_1.default({
            path: Main.application.getPath('userData'),
        });
        Main.mainWindow = new electron_1.BrowserWindow({
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
                    "--storePath=".concat(store.sanitizePath(app.getPath('userData'))),
                ],
                preload: path_1.default.join(__dirname, 'preload.js'),
                /* eng-disable PRELOAD_JS_CHECK */
                disableBlinkFeatures: 'Auxclick',
            },
        });
        // Sets up main.js bindings for our i18next backend
        i18next_electron_fs_backend_1.default.mainBindings(electron_1.ipcMain, win, fs_1.default);
        // Sets up main.js bindings for our electron store;
        // callback is optional and allows you to use store in main process
        var callback = function (success, initialStore) {
            console.log("".concat(!success ? 'Un-s' : 'S', "uccessfully retrieved store in main process."));
            console.log(initialStore); // {"key1": "value1", ... }
        };
        store.mainBindings(electron_1.ipcMain, win, fs_1.default, callback);
        // Sets up bindings for our custom context menu
        secure_electron_context_menu_1.default.mainBindings(electron_1.ipcMain, Main.mainWindow, electron_1.Menu, isDev, {
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
        });
        // Setup bindings for offline license verification
        secure_electron_license_keys_1.default.mainBindings(electron_1.ipcMain, win, fs_1.default, crypto_1.default, {
            root: process.cwd(),
            version: app.getVersion(),
        });
        // Load app
        if (isDev) {
            win.loadURL(selfHost);
        }
        else {
            win.loadURL("".concat(protocol_1.default.scheme, "://rse/index.html"));
        }
        win.webContents.on('did-finish-load', function () {
            win.setTitle("Getting started with secure-electron-template (v".concat(app.getVersion(), ")"));
        });
        // Only do these things when in development
        if (isDev) {
            // Errors are thrown if the dev tools are opened
            // before the DOM is ready
            win.webContents.once('dom-ready', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, electron_devtools_installer_1.default)([electron_devtools_installer_1.REDUX_DEVTOOLS, electron_devtools_installer_1.REACT_DEVELOPER_TOOLS])
                                .then(function (name) { return console.log("Added Extension: ".concat(name)); })
                                .catch(function (err) { return console.log('An error occurred: ', err); })
                                .finally(function () {
                                require('electron-debug')(); // https://github.com/sindresorhus/electron-debug
                                win.webContents.openDevTools();
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        // Emitted when the window is closed.
        win.on('closed', function () {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            win = null;
        });
        // https://electronjs.org/docs/tutorial/security#4-handle-session-permission-requests-from-remote-content
        var ses = electron_1.session;
        var partition = 'default';
        ses
            .fromPartition(partition) /* eng-disable PERMISSION_REQUEST_HANDLER_JS_CHECK */
            .setPermissionRequestHandler(function (webContents, permission, permCallback) {
            var allowedPermissions = []; // Full list here: https://developer.chrome.com/extensions/declare_permissions#manifest
            if (allowedPermissions.includes(permission)) {
                permCallback(true); // Approve permission request
            }
            else {
                console.error("The application tried to request permission for '".concat(permission, "'. This permission was not whitelisted and has been blocked."));
                permCallback(false); // Deny
            }
        });
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
        menuBuilder = (0, menu_1.default)(win, app.name);
        // Set up necessary bindings to update the menu items
        // based on the current language selected
        i18n_mainconfig_1.default.on('initialized', function (loaded) {
            i18n_mainconfig_1.default.changeLanguage('en');
            i18n_mainconfig_1.default.off('initialized'); // Remove listener to this event as it's not needed anymore
        });
        // When the i18n framework starts up, this event is called
        // (presumably when the default language is initialized)
        // BEFORE the "initialized" event is fired - this causes an
        // error in the logs. To prevent said error, we only call the
        // below code until AFTER the i18n framework has finished its
        // "initialized" event.
        i18n_mainconfig_1.default.on('languageChanged', function (lng) {
            if (i18n_mainconfig_1.default.isInitialized) {
                menuBuilder.buildMenu(i18n_mainconfig_1.default);
            }
        });
    };
    Main.onActivate = function () {
        if (Main.mainWindow === null)
            Main.createWindow();
    };
    return Main;
}());
exports.default = Main;
