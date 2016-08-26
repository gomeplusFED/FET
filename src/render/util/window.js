import { remote, screen } from 'electron';

const currentWindow = remote.getCurrentWindow();
const BrowserWindow = remote.BrowserWindow;
const app = remote.app;

export const createNewFramlessAndAutoPositionWindow = () => {
	let mainWinPosition = currentWindow.getPosition();
	let screen = window.screen;
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
