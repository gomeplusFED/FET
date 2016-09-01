import { ipcMain, BrowserWindow } from 'electron';

import { createNewFramlessAndAutoSizeWindow } from '../util/window.js';

import env from '../config/env.config.js';

ipcMain.on('setting-will-open', (ev, obj) => {
	let settingWin = null;
	let webContents = null;
	let allWindows = BrowserWindow.getAllWindows();
	allWindows.forEach((item) => {
		if (/\/setting\.html/.test(item.getURL())) {
			settingWin = item;
			settingWin.show();
			settingWin.focus();
			webContents = settingWin.webContents;
			webContents.send('setting-opened-tab', obj.argvs);
		}
	});
	if (settingWin === null) {
		settingWin = createNewFramlessAndAutoSizeWindow(obj.screen);
		settingWin.loadURL(obj.path);
		webContents = settingWin.webContents;
		webContents.on('did-finish-load', () => {
			webContents.send('setting-opened-tab', obj.argvs);
		});
	}

	if (env === 'dev') {
		settingWin.webContents.openDevTools();
	}
});
