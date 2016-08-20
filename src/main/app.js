import { app } from 'electron';

import createWindow from './window/create.js';

app.on('ready', () => {
	createWindow(app);
});

app.on('activate', (ev, hasVisibleWindows) => {
	if (!hasVisibleWindows) {
		createWindow(app);
	}
});
