import path from 'path';
import { BrowserWindow, Tray, Menu } from 'electron';

import pathConfig from '../config/path.config.js';
import env from '../config/env.config.js';

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
function initTray(win, app) {
	appIcon = new Tray(path.join(__dirname, '../assets/img/icon.png'));
	appIcon.on('click', () => {
		(win.isVisible()) ? win.hide() : win.show();
	});
	var contextMenu = Menu.buildFromTemplate([
		{
			label: '打开主面板',
			click: () => {
				(win.isVisible()) ? win.hide() : win.show();
			}
		},
		{ label: '设置' },
		{
			label: '退出',
			click: () => {
				app.quit();
			}
		}
	]);
	appIcon.setToolTip('FE-Tools');
	appIcon.setContextMenu(contextMenu);
}

export default function createWindow(app) {
	mainWindow = new BrowserWindow(browserOptions);

	if (process.platform === 'win32') {
		initTray(mainWindow, app);
	}

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
	return mainWindow;
}
