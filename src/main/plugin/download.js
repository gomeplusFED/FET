import fs from 'fs';
import path from 'path';

import { app, ipcMain, BrowserWindow } from 'electron';

const mainWindow = BrowserWindow.getFocusedWindow();

mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
	item.setSavePath(path.join(app.getAppPath(), '../fet.zip'));

	item.on('updated', (event, state) => {
		if (state === 'interrupted') {
			console.log('Download is interrupted but can be resumed');
		} else if (state === 'progressing') {
			if (item.isPaused()) {
				console.log('Download is paused');
			} else {
				console.log(`Received bytes: ${item.getReceivedBytes()}`);
			}
		}
	});
	item.once('done', (event, state) => {
		if (state === 'completed') {
			console.log('Download successfully');
		} else {
			console.log(`Download failed: ${state}`);
		}
	});
});

mainWindow.webContents.downloadURL('https://github.com/luoye-fe/amp-fet/archive/fet.zip');
