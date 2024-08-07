process.env.NODE_ENV = 'development';
process.env.ROOT = 'C:/'
require('./prototypes'); //importa los prototipos de las clases
const configurations = require('./backend/configs');

const { app, BrowserWindow, globalShortcut, Notification, Tray, Menu} = require('electron');
const path = require('path');
const fs = require('fs');
let d = __dirname.split('\\');
let dir = path.join(d[0],d[1],d[2]);
const executePlugins = require('./plugins.loader');
// const executeNotificationsService = require('./notifications_service');

let tray;
let trayMenu;
let mainWindow;
app.mainWindowOpened = false;


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

app.isQuiting = false;
executePlugins(app);

// executeNotificationsService();

const createWindow = async () => {

  const server = await require('./backend/index')();

  server.set('port', process.env.NODE_ENV === 'development' ? 3000:2735);
  const frontend = require('./spa/index');
  frontend();
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 720,
    frame: false,
  });

  mainWindow.on('close', (e) => {
    if(!app.isQuiting){
      e.preventDefault();
      mainWindow.hide();
      app.mainWindowOpened = false;
    }
  });

  let devWindow = null;
    //evit the load menu
  mainWindow.setMenu(null);

  // and load the index.html of the app.
  const mainView = configurations.get('mainView')??'tasks';
  mainWindow.loadURL('http://localhost:19300/#/main/'+mainView);
  app.mainWindowOpened = true;
  // mainWindow.webContents.openDevTools();
  globalShortcut.register('CommandOrControl+Alt+D',() => {
    // creamos una ventana persistente que no permite interactuar con la ventana principal
    devWindow = new BrowserWindow({
      width: 400,
      height: 240,
      resizable: false,
      modal: true,
      parent: mainWindow,
      frame: false,
    });
    devWindow.setMenu(null);
    devWindow.loadURL('http://localhost:19300/#/auth/dev-tools');
  });
  // agregar el atajo Ctrl + R para recargar la página
  if(process.env.NODE_ENV === 'development'){
    const shortcut = globalShortcut.register('CommandOrControl+R', () => {
      mainWindow.reload();
    });
    
  
    if (!shortcut) {
      console.log('Registration failed');
    }
  }
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();


  server.post('/open-dev-tools', async (req, res) => {
    const password = req.body.password;
    if(password !== '4dm1n'){
      return res.status(401).json({message: "F, no tienes permiso para hacer eso"});
    }
    res.json({message: "DevTools opened"});
    if(devWindow) devWindow.close();
    mainWindow.webContents.openDevTools();
  });
  server.post('/app-maximize', async (req, res) => {
    if(req.body.password !== 'ADd247FF4dm1n') return res.status(401).json({message: "F, no tienes permiso para hacer eso"});
    if(mainWindow.isMaximized()) mainWindow.unmaximize();
    else mainWindow.maximize();
    res.json({success: true});
  });
  server.post('/app-close', async (req, res) => {
    if(req.body.password !== 'ADd247FF4dm1n') return res.status(401).json({message: "F, no tienes permiso para hacer eso"});
    // app.quit();
    // if devwindow is open, close it else close the main window
    if(devWindow) {
      devWindow.close();
      devWindow = null;
    }
    else mainWindow.close();
    res.json({success: true});
  });
  server.post('/app-minimize', async (req, res) => {
    if(req.body.password !== 'ADd247FF4dm1n') return res.status(401).json({message: "F, no tienes permiso para hacer eso"});
    mainWindow.minimize();
    res.json({success: true});
  });

};

app.on('ready', () => {
  createWindow();
  tray = new Tray(path.join(__dirname, 'assets', 'icon.ico'));
  tray.setToolTip('BBEL Tasks');
  trayMenu = Menu.buildFromTemplate([
    {
      label: "Open",
      click: () => {
        mainWindow.show();
      }
    },
    {
      label: "Close",
      click: () => {
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);
  tray.setContextMenu(trayMenu);
  tray.on('click', () => {
    mainWindow.show();
    app.mainWindowOpened = true;
  });
});
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
var AutoLaunch = require('easy-auto-launch');

var AutoLauncher = new AutoLaunch({
	name: 'Tasks',
	path: path.join(dir, 'AppData', 'Local', 'Programs', 'tasks', 'Tasks.exe'),
});

AutoLauncher.enable();

//minecraftAutoLauncher.disable();


AutoLauncher.isEnabled()
.then(function(isEnabled){
	if(isEnabled){
	    return;
	}
	AutoLauncher.enable();
})
.catch(function(err){
    // handle error
});

