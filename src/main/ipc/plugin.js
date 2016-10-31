import fs from 'fs';
import path from 'path';

import { app, ipcMain, BrowserWindow } from 'electron';
import fetch from 'node-fetch';
import { removeSync as rmdir, move } from 'fs-extra';
import { exec, execSync } from 'child_process';

import { formatFileSize, unzip, normalizePath, execCmd } from '../util/common.js';
import { createWindowForPlugin } from '../util/window.js';
import { debug } from '../util/debug.js';
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
	})
	.then((res) => {
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
		// 实例化下载窗口并隐藏
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
				// execSync(`rm -rf ${normalizePath(pluginDownloadPath)}`);
				rmdir(normalizePath(pluginDownloadPath));
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
						msg: '下载成功，正在初始化，请稍后'
					});
					// 解压
					unzip(pluginDownloadFileName, pluginContentPath, function(err) {
						if (err) throw err;
						// execSync(`mv -f ${normalizePath(path.join(userDataPath, 'Plugins', pluginName + '-fet'))} ${normalizePath(pluginDownloadPath)}`);
						move(normalizePath(path.join(userDataPath, 'Plugins', pluginName + '-fet')), normalizePath(pluginDownloadPath), (err) => {
							if (err) throw err;
							fs.unlinkSync(pluginDownloadFileName);
							fs.readdir(pluginDownloadPath, (err, files) => {
								if (err) throw err;
								if (files.includes('app.zip')) {
									unzip(path.join(pluginDownloadPath, 'app.zip'), pluginDownloadPath, (err) => {
										if (err) throw err;
										complete();
									});
								} else {
									complete();
								}
							});
						})
					});
				}
			});
			function complete () {
				ev.sender.send('plugin-installing', {
					showCheck: true,
					showGouhao: true,
					msg: `${obj.action || '安装'}成功`
				});
				// 关闭窗口
				tempWin.close();
				ev.sender.send('plugin-installed', {
					pluginName: pluginWholeName,
					pluginPkgInfo: JSON.parse(fs.readFileSync(path.join(pluginDownloadPath, 'package.json'), 'utf-8'))
				});
			}
		});
		// 下载
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

function runAppPlugin(options) {
	let entry = path.join(app.getPath('userData'), 'Plugins', options.key, options.entry);
	execCmd(`${normalizePath(options.electronPath)} ${normalizePath(entry)}`, (err) => {
		if (err) {
			console.log(err);
		}
	});
}
