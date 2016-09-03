import { ipcMain, BrowserWindow } from 'electron';
import fetch from 'node-fetch';

import env from '../config/env.config.js';

ipcMain.on('app-init', (ev) => {
	ev.sender.send('app-initing', {
		msg: '正在检查更新',
		loading: true,
		new: true
	});
});
