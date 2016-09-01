import { BrowserWindow } from 'electron';

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
	return new BrowserWindow({
		x: middle >= screen.availWidth / 2 ? screen.availLeft + mainWinPosition[0] - screen.availLeft - 717 : screen.availLeft + mainWinPosition[0] - screen.availLeft + 282,
		y: mainWinPosition[1],
		center: true,
		resizable: false,
		frame: false,
		width: 717,
		height: 717,
		fullscreen: false,
		fullscreenable: false
	});
};