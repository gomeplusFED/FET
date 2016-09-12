import Vue from 'vue';
import {
	ipcRenderer
} from 'electron';

import Index from './components/index.vue';
import Debug from '../../common-component/debug.vue';

const vm = new Vue({
	el: '#app',
	data: {
		debugInfo: ''
	},
	components: {
		'm-index': Index,
		'm-debug': Debug
	},
	ready() {
		ipcRenderer.on('debug', (ev, msg) => {
			console.log(msg);
			this.debugInfo = msg;
		});
	},
	template: `
	<div>
		<m-debug :debug="debugInfo"></m-debug>
		<m-index></m-index>
	</div>
	`
});
