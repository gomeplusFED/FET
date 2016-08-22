import { app } from 'electron';

import createWindow from './window/create.js';

let mainWindow = null;

app.on('ready', () => {
	mainWindow = createWindow(app);
});

app.on('activate', (ev, hasVisibleWindows) => {
	if (mainWindow !== null) {
		(mainWindow.isVisible()) ? null : mainWindow.show();
	}
});
