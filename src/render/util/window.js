import { remote, screen } from 'electron';

const currentWindow = remote.getCurrentWindow();
const BrowserWindow = remote.BrowserWindow;
const app = remote.app;

export const createWindow = (params = {}) => {
	if (params.path === '') {
		return;
	}
	let wholePath = currentWindow.getURL() + params.path;
	let win = new BrowserWindow({

	});
	win.loadURL(wholePath);
};
