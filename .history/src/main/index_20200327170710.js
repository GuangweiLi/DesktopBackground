import { app, BrowserWindow, globalShortcut, session } from 'electron'
import './server'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

session.defaultSession.webRequest.onBeforeRequest(filter, (details, callback) => {
  console.log(details.url)
  details.url = details.url.replace(/.*\/ntwechat\//ig, 'http://localhost:3000/api/')
  callback({cancel: false, url: details.url});
})

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 432,
    useContentSize: true,
    width: 506,
    resizable: false,
    webPreferences: {
      webSecurity: false
    }
  })
  

  mainWindow.loadURL(winURL)
  globalShortcut.register('CommandOrControl+Shift+L', () => {
    let focusWin = BrowserWindow.getFocusedWindow()
    focusWin && focusWin.toggleDevTools()
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
