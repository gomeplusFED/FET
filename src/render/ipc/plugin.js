import {
	remote
} from 'electron';

const currentWindow = remote.getCurrentWindow();

currentWindow.removeAllListeners();
