import { app } from 'electron';

import createWindow from './window/create.js';

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	// just for hold icon in dock
});

app.on('activate', () => {
	createWindow();
});
