<template>
	<div>
		<router-view keep-alive></router-view>
		<m-loading></m-loading>
		<m-alert></m-alert>
		<m-confirm></m-confirm>
	</div>
</template>
<style scoped>
	@import './assets/sass/app.scss';
</style>
<script>
import { remote } from 'electron';
import store from './store/index.js';
import Loading from './component/common/loading.vue';
import Alert from './component/common/alert.vue';
import Confirm from './component/common/confirm.vue';
const BrowserWindow = remote.BrowserWindow;
export default {
	name: 'App',
	store: store,
	methods: {
		amp() {
			var win = new BrowserWindow({ width: 1920, height: 1200 });
			win.loadURL('http://10.69.205.26:9090/#!/main/project/list/mine', {
				userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'
			});
		}
	},
	ready() {
	},
	components: {
		'm-loading': Loading,
		'm-alert': Alert,
		'm-confirm': Confirm
	}
};
</script>
