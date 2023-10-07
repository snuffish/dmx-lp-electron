// import { app, BrowserWindow } from 'electron';
// import Main from './main'
const { app, BrowserWindow } = require('electron')
const Main = require('./main')

Main.main(app, BrowserWindow)
