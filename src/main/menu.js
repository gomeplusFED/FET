import { Menu } from 'electron';

const menuTemplate = (app) => {
	return [{
		label: 'Application',
		submenu: [
			{ label: 'About Application', selector: 'orderFrontStandardAboutPanel:' },
			{ type: 'separator' },
			{ label: 'Quit', accelerator: 'Command+Q', click: function() { app.quit(); } }
		]
	}, {
		// solve cant copy or paste issue after packaging app.
		label: 'Edit',
		submenu: [
			{ label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
			{ label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
			{ type: 'separator' },
			{ label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
			{ label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
			{ label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
			{ label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
		]
	}];
};

export default menuTemplate;
