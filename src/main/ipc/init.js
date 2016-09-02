import { ipcMain, BrowserWindow } from 'electron';

import env from '../config/env.config.js';

ipcMain.on('app-init', (ev) => {
	ev.sender.send('app-initing', '正在检查更新');
});
