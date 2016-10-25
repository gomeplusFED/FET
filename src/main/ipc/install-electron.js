import fs from 'fs';
import path from 'path';

import { app, ipcMain, BrowserWindow } from 'electron';

import { formatFileSize, unzip } from '../util/common.js';

let tempWin = null;

ipcMain.on('install-electron', (ev) => {
	ev.sender.send('install-electron-ing', {
		msg: '开始下载',
		showStatus: true
	});
	tempWin = new BrowserWindow({
		width: 0,
		height: 0,
		show: false
	});
	let userDataPath = app.getPath('userData');
	let electronDownloadPath = path.join(userDataPath, 'electronDownload');
	let electronDownloadFileName = path.join(userDataPath, 'electronDownload', 'electron.zip');

	tempWin.webContents.session.on('will-download', (event, item, webContents) => {
		if (!fs.existsSync(electronDownloadPath)) {
			fs.mkdirSync(electronDownloadPath);
		}
		if (fs.existsSync(electronDownloadFileName)) {
			fs.unlinkSync(electronDownloadFileName);
		}
		item.setSavePath(electronDownloadFileName);
		item.on('updated', (event, state) => {
			if (state === 'progressing') {
				ev.sender.send('install-electron-ing', {
					msg: `正在下载 ${formatFileSize(item.getReceivedBytes())}/${formatFileSize(item.getTotalBytes())}`,
					showStatus: true
				});
			}
		});
		item.once('done', (event, state) => {
			if (state === 'completed') {
				ev.sender.send('install-electron-ing', {
					msg: '下载完成，解压中',
					showStatus: true
				});
				unzip(electronDownloadFileName, path.join(electronDownloadPath, 'electron'), function(err) {
					if (err) throw err;
					let electronAppPath;
					if (process.platform === 'darwin') {
						electronAppPath = path.join(electronDownloadPath, 'electron', '/Electron.app/Contents/MacOS/Electron');
					} else if (process.platform === 'win32') {
						electronAppPath = path.join(electronDownloadPath, 'electron', './electron.exe');
					}
					tempWin.close();
					ev.sender.send('install-electron-ed', electronAppPath);
				});
			}
		});
	});
	tempWin.webContents.downloadURL(`http://cdn.npm.taobao.org/dist/electron/1.3.2/electron-v1.3.2-${process.platform}-${process.arch}.zip`);
	tempWin.on('closed', function() {
		tempWin = null;
	});
});
