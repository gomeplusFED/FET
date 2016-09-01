import { ipcMain, BrowserWindow } from 'electron';

import env from '../config/env.config.js';

ipcMain.on('plugin-install', (ev, obj) => {
	console.log(obj);
});
