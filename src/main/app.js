import path from 'path';
import { app, BrowserWindow, Tray, Menu } from 'electron';

// ipc
import './ipc/index.js';

import pathConfig from './config/path.config.js';
import env from './config/env.config.js';

import { debug } from './util/debug.js';

let mainWindow = null;
let appIcon = null;
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

// win 托盘
function initTray() {
	appIcon = new Tray(path.join(__dirname, './assets/img/icon.png'));
	appIcon.on('click', () => {
		if (!mainWindow.isVisible()) {
			mainWindow.show();
		}
	});
	var contextMenu = Menu.buildFromTemplate([{
		label: '打开主面板',
		click: () => {
			if (!mainWindow.isVisible()) {
				mainWindow.show();
			}
		}
	}, {
		label: '设置',
		click: () => {
			mainWindow.webContents.send('setting-will-open-from-main-process');
		}
	}, {
		label: '退出',
		click: () => {
			forceQuit = true;
			app.quit();
		}
	}]);
	appIcon.setToolTip('FE-Tools');
	appIcon.setContextMenu(contextMenu);
}

function createWindow() {
	mainWindow = new BrowserWindow(browserOptions);

	if (process.platform === 'win32') {
		initTray();
	}

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
