import { ipcMain, BrowserWindow, dialog, app } from 'electron';

export const debug = (msg) => {
	console.log(msg);
	let allWindows = BrowserWindow.getAllWindows();
	allWindows.forEach((item) => {
		item.webContents.send('debug', msg);
	});
};

let dialogInfoObj = {
	type: 'info',
	buttons: [],
	title: '提示',
	message: '提示信息'
};

// app.on('ready', () => {
// 	dialog.showMessageBox(Object.assign({
// 		detail: JSON.stringify(process.env)
// 	}, dialogInfoObj));
// });
