import { app, BrowserWindow } from 'electron';

import pathConfig from './config/path.config.js';
import env from './config/env.config.js';
import path from 'path';

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 282,
		height: 717,
		resizable: false,
		maximizable: false,
		fullscreen: false,
		fullscreenable: false,
		frame: false
	});

	if (env === 'dev') {
		mainWindow.loadURL(pathConfig.renderPath.dev);
		mainWindow.webContents.openDevTools();

		// 引入开发者工具 (引入后注释掉)
		// BrowserWindow.addDevToolsExtension('your dev tool path');
	} else {
		mainWindow.loadURL(pathConfig.renderPath.production);
	}

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
