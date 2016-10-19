import path from 'path';
import { Tray, Menu } from 'electron';

let appIcon = null;

const initTray = (app, mainWindow) => {
	appIcon = new Tray(path.join(__dirname, './assets/img/icon.png'));
	appIcon.on('click', () => {
		if (!mainWindow.isVisible()) {
			mainWindow.show();
		}
	});
	var contextMenu = Menu.buildFromTemplate([{
		label: '打开主面板',
		click: () => {
			if (!mainWindow.isVisible()) {
				mainWindow.show();
			}
		}
	}, {
		label: '设置',
		click: () => {
			mainWindow.webContents.send('setting-will-open-from-main-process');
		}
	}, {
		label: '退出',
		click: () => {
			app.quit();
		}
	}]);
	appIcon.setToolTip('FE-Tools');
	appIcon.setContextMenu(contextMenu);
};

export default initTray;
