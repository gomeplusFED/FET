// fix process.env.path on darwin
import fixPath from 'fix-path';
fixPath();

import path from 'path';
import { app, BrowserWindow, Tray, Menu } from 'electron';

import pathConfig from './config/path.config.js';
import env from './config/env.config.js';

import { debug } from './util/debug.js';

import initTray from './tray.js';
import menuTemplate from './menu.js';

// ipc
import './ipc/index.js';

let mainWindow = null;
let forceQuit = false;

let browserOptions = {
	width: 282,
	height: 717,
	resizable: false,
	maximizable: false,
	fullscreen: false,
	fullscreenable: false,
	show: false
};

if (process.platform === 'win32') {
	browserOptions.frame = false;
} else if (process.platform === 'darwin') {
	browserOptions.titleBarStyle = 'hidden';
};

function createWindow() {
	mainWindow = new BrowserWindow(browserOptions);

	// win 下初始化托盘
	if (process.platform === 'win32') {
		initTray(app, mainWindow);
	}

	// 菜单
	Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate(app)));

	mainWindow.webContents.on('did-finish-load', () => {
		mainWindow.show();
	});

	if (env === 'dev') {
		mainWindow.loadURL(pathConfig.renderPath.dev);
		mainWindow.webContents.openDevTools();

		// 引入开发者工具 (引入后注释掉)
		// BrowserWindow.addDevToolsExtension('your dev tool path');
	} else {
		mainWindow.loadURL(pathConfig.renderPath.production);
	}

	mainWindow.on('close', (e) => {
		if (!forceQuit) {
			e.preventDefault();
			mainWindow.hide();
			return;
		}
		mainWindow = null;
		app.quit();
	});
}

// ensure only one instance is runing
const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) mainWindow.restore();
		mainWindow.focus();
	}
});

if (shouldQuit) {
	app.quit();
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') {
		app.quit();
	};
});

app.on('activate', function() {
	mainWindow.show();
});

app.on('before-quit', function() {
	forceQuit = true;
});
