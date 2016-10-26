import { app, BrowserWindow } from 'electron';

let forceQuit = false;

app.on('before-quit', function() {
	forceQuit = true;
});

export const createNewFramlessAndAutoSizeWindow = (screen) => {
	let allWindows = BrowserWindow.getAllWindows();
	let mainWin = null;
	allWindows.forEach((item) => {
		if (/\/main\.html/.test(item.getURL())) {
			mainWin = item;
		}
	});
	let mainWinPosition = mainWin.getPosition();
	let middle = mainWinPosition[0] + 282 / 2 - screen.availLeft;
	let currentWin = null;
	currentWin = new BrowserWindow({
		x: middle >= screen.availWidth / 2 ? screen.availLeft + mainWinPosition[0] - screen.availLeft - 717 : screen.availLeft + mainWinPosition[0] - screen.availLeft + 282,
		y: mainWinPosition[1],
		center: true,
		resizable: false,
		frame: false,
		width: 717,
		height: 717,
		fullscreen: false,
		fullscreenable: false,
		show: false
	});
	currentWin.webContents.on('did-finish-load', () => {
		currentWin.show();
	});
	currentWin.on('close', function(e) {
		// currentWin = null;
		if (!forceQuit) {
			e.preventDefault();
			currentWin.hide();
			return;
		}
		currentWin = null;
		app.quit();
	});
	return currentWin;
};

export const createWindowForPlugin = (params) => {
	let resultParams = {};
	if (params.size === 'full') {
		resultParams.width = params.screen.availWidth;
		resultParams.height = params.screen.availHeight;
	} else if (params.size === 'custom') {
		resultParams.width = params.width;
		resultParams.height = params.height;
	}
	if (params.position === 'custom') {
		resultParams.x = params.X;
		resultParams.y = params.Y;
	} else {
		resultParams.center = true;
	}
	let currentWin = null;
	currentWin = new BrowserWindow(resultParams);
	currentWin.webContents.on('did-finish-load', () => {
		currentWin.show();
	});
	currentWin.on('close', function(e) {
		// currentWin = null;
		if (!forceQuit) {
			e.preventDefault();
			currentWin.hide();
			return;
		}
		currentWin = null;
		app.quit();
	});
	return currentWin;
};
