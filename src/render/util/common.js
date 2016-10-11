import { shell } from 'electron';

export const openUrl = (url) => {
	shell.openExternal(url);
};

export const getRandomColor = () => {
	return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
};

export const copyObj = (resource) => {
	return JSON.parse(JSON.stringify(resource));
};
