import { shell } from 'electron';

export const openUrl = (url) => {
	shell.openExternal(url);
};
