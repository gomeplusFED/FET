import { BrowserWindow } from 'electron';

import pathConfig from '../config/path.config.js';
import env from '../config/env.config.js';

let mainWindow = null;

let browserOptions = {
	width: 282,
	height: 717,
	resizable: false,
	maximizable: false,
	fullscreen: false,
	fullscreenable: false
};

if (process.platform === 'win32') {
	browserOptions.frame = false;
} else if (process.platform === 'darwin') {
	browserOptions.titleBarStyle = 'hidden';
};

export default function createWindow() {
	mainWindow = new BrowserWindow(browserOptions);

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
