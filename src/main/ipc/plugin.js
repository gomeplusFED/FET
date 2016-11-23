import fs from 'fs';
import path from 'path';

import { app, ipcMain, BrowserWindow, dialog } from 'electron';
import fetch from 'node-fetch';
import { move } from 'fs-extra';
import { exec, execSync } from 'child_process';
import request from 'request';

import { formatFileSize, unzip, normalizePath } from '../util/common.js';
import { rm, mv, sudoRm } from '../util/command.js';
import { createWindowForPlugin } from '../util/window.js';
import { debug } from '../util/debug.js';
import env from '../config/env.config.js';

function BreakSignal() {}

let tempWinPlugin = null;

let dialogInfoObj = {
	type: 'info',
	buttons: [],
	title: '提示',
	message: '提示信息'
};

// 安装插件
ipcMain.on('plugin-install', (ev, obj) => {
	let pluginPath = obj.path;

	if (!/^https:\/\/github.com\//.test(obj.path)) {
		ev.sender.send('plugin-installing', {
			show: true,
			b: true,
			info: '地址不合法'
		});
		return;
	}
	let regxResulr = obj.path.match(/https:\/\/github.com\/(.*)\/(.*)/);
	let pluginAuthor = regxResulr[1];
	let pluginName = regxResulr[2];

	let pluginWholeName = pluginAuthor + '~' + pluginName;
	ev.sender.send('plugin-installing', {
		show: true,
		c: true,
		info: `正在${obj.action || '安装'}插件`
	});
	fetch(`https://raw.githubusercontent.com/${pluginAuthor}/${pluginName}/fet/package.json`, { timeout: 10000 })
		.then((res) => {
			if (res.status === 404) {
				ev.sender.send('plugin-installing', {
					show: true,
					b: true,
					info: '插件不存在，请检查插件地址'
				});
				throw new BreakSignal();
			}
		})
		.then(() => {
			let userDataPath = app.getPath('userData');
			let pluginContentPath = path.join(userDataPath, 'Plugins');
			let pluginDownloadFileName = path.join(userDataPath, 'Plugins', pluginWholeName + '.zip');
			let pluginDownloadPath = path.join(userDataPath, 'Plugins', pluginWholeName);
			if (!fs.existsSync(pluginContentPath)) {
				fs.mkdirSync(pluginContentPath);
			}
			if (fs.existsSync(pluginDownloadPath)) {
				sudoRm(pluginDownloadPath);
			}

			let receivedBytes = 0;
			let totalBytes = 0;

			let req = request({
				method: 'GET',
				uri: `${pluginPath}/archive/fet.zip`
			});

			let out = fs.createWriteStream(pluginDownloadFileName);
			req.pipe(out);

			ipcMain.once('plugin-install-cancel', () => {
				req.abort();
				out.on('close', () => {
					execSync(rm(pluginDownloadFileName));
					ev.sender.send('plugin-installing', {
						show: false
					});
				});
			});

			req.on('response', function(data) {
				totalBytes = parseInt(data.headers['content-length']);
			});

			req.on('data', function(chunk) {
				receivedBytes += chunk.length;
				ev.sender.send('plugin-installing', {
					show: true,
					c: true,
					d: true,
					info: `正在下载 ${formatFileSize(receivedBytes)}/${formatFileSize(totalBytes)}`
				});
			});

			req.on('complete', function() {
				// stream finish
				out.on('finish', () => {
					ev.sender.send('plugin-installing', {
						show: true,
						c: true,
						info: '下载成功，正在初始化，请稍后'
					});
					// 解压
					unzip(pluginDownloadFileName, pluginContentPath, function(err) {
						if (err) console.log(err);
						execSync(mv(path.join(userDataPath, 'Plugins', pluginName + '-fet'), pluginDownloadPath));
						execSync(rm(pluginDownloadFileName));
						fs.readdir(pluginDownloadPath, (err, files) => {
							if (err) console.log(err);
							if (files.includes('app.zip')) {
								unzip(path.join(pluginDownloadPath, 'app.zip'), pluginDownloadPath, (err) => {
									if (err) console.log(err);
									complete();
								});
							} else {
								complete();
							}
						});

						function complete() {
							ev.sender.send('plugin-installing', {
								show: true,
								a: true,
								info: `${obj.action || '安装'}成功`
							});
							// 关闭窗口
							ev.sender.send('plugin-installed', {
								pluginName: pluginWholeName,
								pluginPkgInfo: JSON.parse(fs.readFileSync(path.join(pluginDownloadPath, 'package.json'), 'utf-8'))
							});
						}
					});
				});
			});
		}).catch((e) => {
			if (e.type === 'request-timeout') {
				ev.sender.send('plugin-installing', {
					show: true,
					b: true,
					info: '出错啦'
				});
			} else {
				ev.sender.send('plugin-installing', {
					show: true,
					b: true,
					info: '下载超时'
				});
			}
		});
});

// 插件安装或更新后通知所有页面
ipcMain.on('plugin-list-should-update', (ev) => {
	let allWindows = BrowserWindow.getAllWindows();
	allWindows.forEach((item) => {
		item.webContents.send('plugin-list-should-update');
	});
});

ipcMain.on('plugin-delete', (ev, key) => {
	let userDataPath = app.getPath('userData');
	let pluginDownloadPath = path.join(userDataPath, 'Plugins', key);
	sudoRm(pluginDownloadPath);
});

// 取消插件安装或更新
ipcMain.on('plugin-action-cancel', (ev) => {

});

// 打开插件
ipcMain.on('plugin-start', (ev, args) => {
	if (args.type === 'web') {
		runWebPlugin(args);
	} else if (args.type === 'app') {
		runAppPlugin(args);
	}
});

function runWebPlugin(options) {
	let currentWin = null;
	let entry = null;
	if (/^http/.test(options.entry)) {
		entry = options.entry;
	} else {
		entry = `file://${path.join(app.getPath('userData'), 'Plugins', options.key, options.entry)}`;
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
		currentWin = createWindowForPlugin(options);
		currentWin.loadURL(entry);
	}
}

let runningApp = {};

function runAppPlugin(options) {
	if (runningApp[options.key]) {
		dialog.showMessageBox(Object.assign({
			detail: '应用已打开！'
		}, dialogInfoObj));
		return;
	}
	runningApp[options.key] = true;
	let entry = path.join(app.getPath('userData'), 'Plugins', options.key, options.entry);
	let instance = exec(`${normalizePath(options.electronPath)} ${normalizePath(entry)}`, {
		env: {
			PATH: process.env.PATH
		},
		maxBuffer: 1024 * 1024 * 20
	}, (err) => {
		if (err) {
			console.log(err);
		}
	});
	instance.on('close', () => {
		runningApp[options.key] = false;
	});
}
