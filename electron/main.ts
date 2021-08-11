import { app, BrowserWindow, ipcMain } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import * as isDev from 'electron-is-dev';
import * as path from 'path';

let win: BrowserWindow | null = null;

function createWindow() {
	win = new BrowserWindow({
		width: 1280,
		height: 720,
		webPreferences: {
			nodeIntegration: false,
			preload: path.join(__dirname, 'preload.js')
		}
	});
	if (isDev)
		win.loadURL('http://localhost:3000/index.html');
	else
		win.loadURL(`file://${__dirname}/../index.html`);

	win.on('closed', () => win = null);

	if (isDev) {
		require('electron-reload')(__dirname, {
			electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'),
			forceHardReset: true,
			hardResetMethod: 'exit'
		});
	}

	installExtension(REACT_DEVELOPER_TOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin')
		app.quit();
});

app.on('activate', () => {
	if (win === null)
		createWindow();
});

ipcMain.on('close', () => {
	app.quit();
});

ipcMain.on('window.minimize', () => {
	win?.minimize();
});

ipcMain.on('window.toggleMaximized', () => {
	if (win?.isMaximized())
		win.unmaximize();
	else
		win?.maximize();
});