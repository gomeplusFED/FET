import { ipcMain, BrowserWindow } from 'electron';

import { createNewFramlessAndAutoSizeWindow } from '../util/window.js';

import env from '../config/env.config.js';

ipcMain.on('setting-will-open', (ev, obj) => {
	let settingWin = null;
	let allWindows = BrowserWindow.getAllWindows();
	allWindows.forEach((item) => {
		if (/\/setting\.html/.test(item.getURL())) {
			settingWin = item;
			settingWin.show();
			settingWin.focus();
		}
	});
	if (settingWin === null) {
		settingWin = createNewFramlessAndAutoSizeWindow(obj.screen);
		settingWin.loadURL(obj.path);
	}
	// ipcMain.
	if (env === 'dev') {
		settingWin.webContents.openDevTools();
	}
});
