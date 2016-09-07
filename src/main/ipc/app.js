import fs from 'fs';
import originalFs from 'original-fs';
import path from 'path';
import { exec } from 'child_process';

import { app, ipcMain, BrowserWindow } from 'electron';
import fetch from 'node-fetch';

import env from '../config/env.config.js';
import appInfo from '../config/info.config.js';
import { formatFileSize } from '../util/common.js';

let tempWin = null;
function BreakSignal() {}

ipcMain.on('app-init', (ev) => {
	ev.sender.send('app-initing', {
		msg: '正在检查更新',
		loading: true
	});
	fetch('http://7xqahl.com1.z0.glb.clouddn.com/info.json?v=' + Date.now(), {
		method: 'GET',
		headers: {
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
			'pragma': 'no-cache',
			'cache-control': 'no-cache'
		},
		timeout: 10000
	}).then((res) => {
		return res.json();
	}).then((res) => {
		if (env === 'dev') {
			ev.sender.send('app-initing', {
				msg: '开发者模式',
				loading: false
			});
			throw new BreakSignal();
		}
		if (res.version === `v${appInfo.version}`) {
			ev.sender.send('app-initing', {
				msg: '已是最新版',
				loading: false
			});
		} else {
			let versionNov = res.version.replace(/v/, '');
			let asarFileName = path.join(app.getAppPath(), '../', `app-${versionNov}.asar`);
			if (originalFs.existsSync(asarFileName)) {
				originalFs.unlinkSync(asarFileName);
			}
			tempWin = new BrowserWindow({
				width: 0,
				height: 0
			});
			tempWin.webContents.session.on('will-download', (event, item, webContents) => {
				item.setSavePath(asarFileName);
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
							loading: false,
							shouldUpdate: true
						});
						let appAsarFilePath = null;
						if (originalFs.existsSync(path.join(app.getAppPath(), '../app.asar'))) {
							appAsarFilePath = path.join(app.getAppPath(), '../app.asar');
						} else if (originalFs.existsSync(path.join(app.getAppPath(), '../default_app.asar'))) {
							appAsarFilePath = path.join(app.getAppPath(), '../default_app.asar');
						}
						let readAble = originalFs.createReadStream(asarFileName);
						let writeAble = originalFs.createWriteStream(appAsarFilePath);
						readAble.pipe(writeAble);
						writeAble.on('finish', () => {
							if (originalFs.existsSync(asarFileName)) {
								originalFs.unlinkSync(asarFileName);
							}
						});
					}
				});
			});
			tempWin.webContents.downloadURL('http://7xqahl.com1.z0.glb.clouddn.com/app-' + versionNov + '.asar');
			tempWin.on('closed', function() {
				tempWin = null;
			});
		}
	}).catch((e) => {
		ev.sender.send('app-initing', {
			erro: e
		});
	});
});

ipcMain.on('app-restart', (ev) => {
	exec(process.argv.join(' '));
	app.quit();
});
