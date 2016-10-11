import fs from 'fs';
import path from 'path';

import Vue from 'vue';
import {
	ipcRenderer,
	remote
} from 'electron';

import Index from './components/index.vue';
import Debug from '../../common-component/debug.vue';

import storage from 'utils/storage.js';

const localStoragePath = path.join(remote.app.getPath('userData'), 'localStorage.json');

function Init() {
	if (fs.existsSync(localStoragePath)) {
		let cur = JSON.parse(fs.readFileSync(localStoragePath, 'utf-8'));
		localStorage.clear();
		Object.keys(cur).forEach((item) => {
			storage.set(item, cur[item]);
		});
		VM();
		fs.unlinkSync(localStoragePath);
	} else {
		VM();
	}
}

function VM() {
	return new Vue({
		el: '#app',
		data: {
			debugInfo: ''
		},
		components: {
			'm-index': Index,
			'm-debug': Debug
		},
		template: `
		<div>
			<m-debug></m-debug>
			<m-index></m-index>
		</div>
		`
	});
}

Init();
