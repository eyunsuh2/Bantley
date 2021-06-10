import { app, BrowserWindow } from 'electron';
import * as isDev from 'electron-is-dev';
import * as path from 'path';
import RiotWSProtocol from "../src/RiotWSProtocol";

const electron = require('electron');
const ipc = electron.ipcMain;

const LCUConnector = require('lcu-connector');

// 1. Gabage Collection이 일어나지 않도록 함수 밖에 선언함.
let mainWindow;

function createWindow() {
  let display = electron.screen.getPrimaryDisplay();
  let width = 320;
  let height = display.bounds.height
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    x: display.bounds.width - width,
    y: 0,
    resizable: true,
    frame: false,
    webPreferences: {
      // 2.
      // 웹 애플리케이션을 데스크탑으로 모양만 바꾸려면 안 해도 되지만,
      // Node 환경처럼 사용하려면 (Node에서 제공되는 빌트인 패키지 사용 포함)
      // true 해야 합니다.
      nodeIntegration: true,
      enableRemoteModule: true,
      allowRunningInsecureContent: true,
      webSecurity: false,
      allowDisplayingInsecureContent: true
    }
  });

  // 3. and load the index.html of the app.
  if (isDev) {
    // 개발 중에는 개발 도구에서 호스팅하는 주소에서 로드
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    // 프로덕션 환경에서는 패키지 내부 리소스에 접근
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  }

  mainWindow.webContents.on('did-finish-load', () => {
    const connector = new LCUConnector();

    connector.on('connect', (data) => {
      //  {
      //    address: '127.0.0.1'
      //    port: 18633,
      //    username: 'riot',
      //    password: H9y4kOYVkmjWu_5mVIg1qQ,
      //    protocol: 'https'
      //  }
      console.log(data)

      mainWindow.webContents.send('leagueClientOn', data);

      ipc.on("wsready", (event,arg) => {
        const ws = new RiotWSProtocol(`wss://${data.username}:${data.password}@localhost:${data.port}/`);

        ws.on('open', () => {
          ws.subscribe('OnJsonApiEvent_lol-champ-select_v1_session', (data) => {
            mainWindow.webContents.send('wsUpdate', data);
          });
        });
      })

    });

    // Start listening for the LCU client
    connector.start();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// app.importCertificate('../certificate/riotgames.crt', (result) => {
//     if (result == 0) {
//         console.log("Added Certificate")
//     }
// });

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  // On certificate error we disable default behaviour (stop loading the page)
  // and we then say "it is all fine - true" to the callback
  event.preventDefault();
  callback(true);
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});