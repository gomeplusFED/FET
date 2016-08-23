import {
	remote
} from 'electron';

const app = remote.app;

let controlKey = process.platform === 'win32' ? 'ctrlKey' : 'metaKey';

document.querySelectorAll('body')[0].addEventListener('keydown', (e) => {
	let keyCode = e.keyCode;
	if (event[controlKey] && keyCode === 87) {
		app.hide();
	}
});
