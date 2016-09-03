import fs from 'fs';
import path from 'path';

import { app, ipcMain, BrowserWindow } from 'electron';
import fetch from 'node-fetch';

import env from '../config/env.config.js';
import appInfo from '../config/info.config.js';
import { formatFileSize } from '../util/common.js';

let tempWin = null;

ipcMain.on('app-init', (ev) => {
	ev.sender.send('app-initing', {
		msg: '正在检查更新',
		loading: true
	});
	fetch('http://7xqahl.com1.z0.glb.clouddn.com/info.json', {
		method: 'GET',
		headers: {
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
		},
		timeout: 3000
	}).then((res) => {
		return res.json();
	}).then((res) => {
		if (res.version === `v${appInfo.version}`) {
			ev.sender.send('app-initing', {
				msg: '已是最新版',
				loading: false
			});
		} else {
			tempWin = new BrowserWindow({
				width: 0,
				height: 0
			});
			tempWin.webContents.session.on('will-download', (event, item, webContents) => {
				item.setSavePath(path.join(app.getAppPath(), '../' + res.version));
				item.on('updated', (event, state) => {
					if (state === 'progressing') {
						ev.sender.send('app-initing', {
							msg: `正在下载 ${formatFileSize(item.getReceivedBytes())}/${formatFileSize(item.getTotalBytes())}`,
							loading: true
						});
					}
				});
				item.once('done', (event, state) => {
					if (state === 'completed') {
						ev.sender.send('app-initing', {
							msg: '下载完成，重启生效',
							loading: false
						});
						fs.createReadStream(path.join(app.getAppPath(), '../' + res.version)).pipe(path.join(app.getAppPath(), '../app.asar'));
					}
				});
			});
			tempWin.webContents.downloadURL('http://7xqahl.com1.z0.glb.clouddn.com/' + res.version);
		}
	}).catch((e) => {
		ev.sender.send('app-initing', {
			msg: '下载出错，本次更新取消',
			loading: false,
			net: false
		});
	});
});
