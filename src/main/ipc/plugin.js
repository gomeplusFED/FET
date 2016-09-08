import fs from 'fs';
import path from 'path';

import { app, ipcMain, BrowserWindow } from 'electron';
import fetch from 'node-fetch';
import unzip from 'unzip';
import { removeSync as rmdir } from 'fs-extra';

import { formatFileSize } from '../util/common.js';
import { createWindowForPlugin } from '../util/window.js';
import env from '../config/env.config.js';

function BreakSignal() {}

let tempWin = null;

// 安装插件
ipcMain.on('plugin-install', (ev, obj) => {
	let pluginPath = obj.path;
	let pluginAuthor;
	let pluginName;
	try {
		pluginAuthor = pluginPath.match(/https:\/\/github.com\/(.*)\/(.*)/)[1];
		pluginName = pluginPath.match(/https:\/\/github.com\/(.*)\/(.*)/)[2];
	} catch (e) {
		ev.sender.send('plugin-installing', {
			showCheck: true,
			showClose: true,
			msg: '地址不合法'
		});
		return;
	}

	let pluginWholeName = pluginAuthor + '~' + pluginName;
	ev.sender.send('plugin-installing', {
		showCheck: true,
		showLoading: true,
		msg: `正在${obj.action || '安装'}插件`
	});
	fetch(`https://raw.githubusercontent.com/${pluginAuthor}/${pluginName}/fet/package.json`, {
		timeout: 10000
	}).then((res) => {
		if (res.status === 404) {
			ev.sender.send('plugin-installing', {
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
			height: 0,
			show: false
		});
		tempWin.webContents.session.once('will-download', (event, item, webContents) => {
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
					ev.sender.send('plugin-installing', {
						showCheck: true,
						showLoading: true,
						msg: `正在下载 ${formatFileSize(item.getReceivedBytes())}/${formatFileSize(item.getTotalBytes())}`
					});
				}
			});
			item.once('done', (event, state) => {
				if (state === 'completed') {
					ev.sender.send('plugin-installing', {
						showCheck: true,
						showLoading: true,
						msg: '下载完成，正在解压'
					});
					fs.createReadStream(pluginDownloadFileName)
						.pipe(unzip.Extract({ path: pluginContentPath }))
						.on('close', () => {
							ev.sender.send('plugin-installing', {
								showCheck: true,
								showGouhao: true,
								msg: `${obj.action || '安装'}成功`
							});
							tempWin.close();
							fs.renameSync(path.join(userDataPath, 'Plugins', pluginName + '-fet'), pluginDownloadPath);
							fs.unlinkSync(pluginDownloadFileName);
							ev.sender.send('plugin-installed', {
								pluginName: pluginWholeName,
								pluginPkgInfo: JSON.parse(fs.readFileSync(path.join(pluginDownloadPath, 'package.json'), 'utf-8'))
							});
						});
				}
			});
		});
		tempWin.webContents.downloadURL(`${pluginPath}/archive/fet.zip`);
		tempWin.on('closed', function() {
			tempWin = null;
		});
	}).catch((e) => {
		ev.sender.send('plugin-installing', {
			erro: e
		});
	});
});

// 插件安装或更新后通知所有页面
ipcMain.on('plugin-list-should-update', (ev) => {
	let allWindows = BrowserWindow.getAllWindows();
	allWindows.forEach((item) => {
		item.webContents.send('plugin-list-should-update');
	});
});

// 打开插件
ipcMain.on('plugin-start', (ev, args) => {
	let currentWin = null;
	let entry = null;
	if (/^http/.test(args.entry)) {
		entry = args.entry;
	} else {
		entry = `file://${path.join(app.getPath('userData'), 'Plugins', args.key, args.entry)}`;
	}
	let allWindows = BrowserWindow.getAllWindows();
	allWindows.forEach((item) => {
		let entryRegex = new RegExp(item.getURL());
		if (entryRegex.test(entry)) {
			currentWin = item;
			currentWin.show();
		}
	});
	if (currentWin === null) {
		currentWin = createWindowForPlugin(args);
		currentWin.loadURL(entry);
	}
});
