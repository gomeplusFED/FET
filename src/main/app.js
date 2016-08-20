import { app } from 'electron';

import createWindow from './window/create.js';

app.on('ready', createWindow);

app.on('activate', () => {
	createWindow();
});
