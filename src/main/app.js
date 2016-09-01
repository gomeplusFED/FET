import path from 'path';
import { app, BrowserWindow, Tray, Menu } from 'electron';

import './ipc/setting.js';

import pathConfig from './config/path.config.js';
import env from './config/env.config.js';

let mainWindow = null;
let appIcon = null;

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

// win 托盘
function initTray() {
	appIcon = new Tray(path.join(__dirname, './assets/img/icon.png'));
	appIcon.on('click', () => {
		(mainWindow.isVisible()) ? mainWindow.hide() : mainWindow.show();
	});
	var contextMenu = Menu.buildFromTemplate([{
		label: '打开主面板',
		click: () => {
			(mainWindow.isVisible()) ? null : mainWindow.show();
		}
	}, {
		label: '设置'
	}, {
		label: '退出',
		click: () => {
			app.quit();
		}
	}]);
	appIcon.setToolTip('FE-Tools');
	appIcon.setContextMenu(contextMenu);
}

const createWindow = function() {
	mainWindow = new BrowserWindow(browserOptions);

	if (process.platform === 'win32') {
		initTray();
	}

	if (env === 'dev') {
		mainWindow.loadURL(pathConfig.renderPath.dev);
		mainWindow.webContents.openDevTools();

		// 引入开发者工具 (引入后注释掉)
		// BrowserWindow.addDevToolsExtension('your dev tool path');
	} else {
		mainWindow.loadURL(pathConfig.renderPath.production);
	}
	mainWindow.on('close', function(e) {
		if (process.platform === 'drawin') {
			e.preventDefault();
			mainWindow.hide();
		}
	});

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
};

app.on('ready', () => {
	createWindow();
});

app.on('activate', (ev, hasVisibleWindows) => {
	mainWindow === null ? createWindow() : mainWindow.show();
});
