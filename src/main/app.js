import { app, BrowserWindow } from 'electron';
import path from 'path';

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 282,
		height: 717,
		resizable: false,
		maximizable: false,
		fullscreen: false,
		fullscreenable: false
	});

	// mainWindow.loadURL('file://' + path.join(__dirname, '../../dist/render/index.html'));
	mainWindow.loadURL('http://localhost:5757');

	mainWindow.webContents.openDevTools();

	// 引入开发者工具 (引入后恢复并注释掉)
	// BrowserWindow.addDevToolsExtension('your dev tool path');

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function() {
	if (mainWindow === null) {
		createWindow();
	}
});
