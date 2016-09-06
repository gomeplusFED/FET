import fs from 'fs';
import path from 'path';

import { app, ipcMain, BrowserWindow } from 'electron';
import fetch from 'node-fetch';
import unzip from 'unzip';
import rmdir from 'rmdir';

import { formatFileSize } from '../util/common.js';
import env from '../config/env.config.js';

function BreakSignal() {}

let tempWin = null;

ipcMain.on('plugin-install', (ev, obj) => {
	let pluginPath = obj.path;
	let pluginAuthor;
	let pluginName;
	try {
		pluginAuthor = pluginPath.match(/https:\/\/github.com\/(.*)\/(.*)/)[1];
		pluginName = pluginPath.match(/https:\/\/github.com\/(.*)\/(.*)/)[2];
	} catch (e) {
		ev.sender.send('pligin-installing', {
			showCheck: true,
			showClose: true,
			msg: '地址不合法'
		});
		return;
	}

	let pluginWholeName = pluginAuthor + '~' + pluginName;
	ev.sender.send('pligin-installing', {
		showCheck: true,
		showLoading: true,
		msg: '正在安装插件'
	});
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
				let userDataPath = app.getPath('userData');
				let pluginContentPath = path.join(userDataPath, 'Plugins');
				let pluginDownloadFileName = path.join(userDataPath, 'Plugins', pluginWholeName + '.zip');
				let pluginDownloadPath = path.join(userDataPath, 'Plugins', pluginWholeName);

				if (!fs.existsSync(pluginContentPath)) {
					fs.mkdirSync(pluginContentPath);
				}
				if (fs.existsSync(pluginDownloadPath)) {
					rmdir(pluginDownloadPath);
				}

				item.setSavePath(pluginDownloadFileName);
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
						fs.createReadStream(pluginDownloadFileName)
							.pipe(unzip.Extract({ path: pluginContentPath }))
							.on('close', () => {
								ev.sender.send('pligin-installing', {
									showCheck: true,
									showGouhao: true,
									msg: '安装成功'
								});
								ev.sender.send('plugin-installed', {

								});
								fs.renameSync(path.join(userDataPath, 'Plugins', pluginName + '-fet'), pluginDownloadPath);
								fs.unlinkSync(pluginDownloadFileName);
							});
					}
				});
			});
			tempWin.webContents.downloadURL(`${pluginPath}/archive/fet.zip`);
		});
});
