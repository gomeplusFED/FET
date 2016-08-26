import { ipcMain } from 'electron';

ipcMain.on('setting-will-router-to', (ev, path) => {
	ev.sender.send('setting-router-to', path);
});
