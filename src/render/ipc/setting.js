import {
	remote,
	ipcRenderer
} from 'electron';

import Event from '../component/common/event.vue';

const currentWindow = remote.getCurrentWindow();

currentWindow.removeAllListeners();

ipcRenderer.on('setting-router-to', (ev, path) => {
	Event.$emit('setting-router-to', path);
});
