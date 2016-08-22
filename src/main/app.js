import { app } from 'electron';

import createWindow from './window/create.js';

let mainWindow = null;

app.on('ready', () => {
	mainWindow = createWindow(app);
});

app.on('activate', (ev, hasVisibleWindows) => {
	(mainWindow.isVisible()) ? null : mainWindow.show();
});
