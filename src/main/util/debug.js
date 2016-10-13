import { ipcMain, BrowserWindow } from 'electron';

export const debug = (msg) => {
	console.log(msg);
	let allWindows = BrowserWindow.getAllWindows();
	allWindows.forEach((item) => {
		item.webContents.send('debug', msg);
	});
};
