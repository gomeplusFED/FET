import { remote } from 'electron';

const currentWindow = remote.getCurrentWindow();
const BrowserWindow = remote.BrowserWindow;
const app = remote.app;

export const createWindow = (params = {}) => {
	// console.log(app.getAppPath());
	// let win = new BrowserWindow({

	// });
	// win.loadURL();
	console.log(currentWindow.getURL());
};
