import fs from 'fs';
import path from 'path';

import { app, ipcMain, BrowserWindow } from 'electron';
import fetch from 'node-fetch';
// import unzip from 'unzip';

import { formatFileSize } from '../util/common.js';
import env from '../config/env.config.js';

function BreakSignal() { }

let tempWin = null;

ipcMain.on('plugin-install', (ev, obj) => {
	let pluginPath = obj.path;
	// https://github.com/luoye-fe/amp-fet/archive/fet.zip
	let pluginAuthor = pluginPath.match(/https:\/\/github.com\/(.*)\/(.*)/)[1];
	let pluginName = pluginPath.match(/https:\/\/github.com\/(.*)\/(.*)/)[2];
	fetch(`${pluginPath}/archive/fet.zip`)
		.then((res) => {
			if (res.status === 404) {
				ev.sender.send('pligin-installing', {
					showCheck: true,
					showClose: true,
					msg: '插件不存在，请检查插件地址'
				});
				throw new BreakSignal();
			}
		})
		.then(() => {
			tempWin = new BrowserWindow({
				width: 0,
				height: 0
			});
			tempWin.webContents.session.on('will-download', (event, item, webContents) => {
				let pluginDownloadPath = path.join(app.getPath('userData'), 'Plugins', pluginName + '.zip');
				if (!fs.existsSync(path.join(app.getPath('userData'), 'Plugins'))) {
					fs.mkdirSync(path.join(app.getPath('userData'), 'Plugins'));
				}
				item.setSavePath(pluginDownloadPath);
				item.on('updated', (event, state) => {
					if (state === 'progressing') {
						ev.sender.send('pligin-installing', {
							showCheck: true,
							showLoading: true,
							msg: `正在下载 ${formatFileSize(item.getReceivedBytes())}/${formatFileSize(item.getTotalBytes())}`
						});
					}
				});
				item.once('done', (event, state) => {
					if (state === 'completed') {
						ev.sender.send('pligin-installing', {
							showCheck: true,
							showLoading: true,
							msg: '下载完成，正在解压'
						});
						fs.createReadStream(pluginDownloadPath)
							.pipe(unzip.Extract({ path: path.join(app.getPath('userData'), 'Plugins', pluginName) }))
							.on('end', () => {
								ev.sender.send('pligin-installing', {
									showCheck: true,
									showGouhao: true,
									msg: '安装成功'
								});
							});
					}
				});
			});
			tempWin.webContents.downloadURL(`${pluginPath}/archive/fet.zip`);
		});
});
