import fs from 'fs';
import path from 'path';

import { app, ipcMain, BrowserWindow } from 'electron';
import request from 'request';

import { formatFileSize, unzip } from '../util/common.js';

let tempWinElectron = null;
let lock = false;

ipcMain.on('install-electron', (ev) => {
	if (lock) return;
	lock = true;
	ev.sender.send('install-electron-ing', {
		msg: '开始下载',
		showStatus: true
	});

	let userDataPath = app.getPath('userData');
	let electronDownloadPath = path.join(userDataPath, 'electronDownload');
	let electronDownloadFileName = path.join(userDataPath, 'electronDownload', 'electron.zip');

	if (!fs.existsSync(electronDownloadPath)) {
		fs.mkdirSync(electronDownloadPath);
	}
	if (fs.existsSync(electronDownloadFileName)) {
		fs.unlinkSync(electronDownloadFileName);
	}

	let receivedBytes = 0;
	let totalBytes = 0;

	let req = request({
		method: 'GET',
		uri: `http://cdn.npm.taobao.org/dist/electron/1.3.2/electron-v1.3.2-${process.platform}-${process.arch}.zip`
	});

	let out = fs.createWriteStream(electronDownloadFileName);
	req.pipe(out);

	req.on('response', function(data) {
		totalBytes = parseInt(data.headers['content-length']);
	});

	req.on('data', function(chunk) {
		receivedBytes += chunk.length;
		ev.sender.send('install-electron-ing', {
			msg: `正在下载 ${formatFileSize(receivedBytes)}/${formatFileSize(totalBytes)}`,
			showStatus: true
		});
	});

	req.on('end', function() {
		ev.sender.send('install-electron-ing', {
			msg: '下载完成，解压中',
			showStatus: true
		});
		unzip(electronDownloadFileName, path.join(electronDownloadPath, 'electron'), function(err) {
			if (err) console.log(err);
			let electronAppPath;
			if (process.platform === 'darwin') {
				electronAppPath = path.join(electronDownloadPath, 'electron', '/Electron.app/Contents/MacOS/Electron');
			} else if (process.platform === 'win32') {
				electronAppPath = path.join(electronDownloadPath, 'electron', './electron.exe');
			}
			ev.sender.send('install-electron-ed', electronAppPath);
			lock = false;
		});
	});
});
