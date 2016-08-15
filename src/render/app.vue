<template>
	<div>
		<h1>起步</h1>
		<a href="javascript:void(0)" @click="amp">AMP</a>
	</div>
</template>
<script>
import { remote } from 'electron';
const BrowserWindow = remote.BrowserWindow;

export default {
	name: 'App',
	methods: {
		amp() {
			var win = new BrowserWindow({ width: 1920, height: 1200 });
			win.loadURL('http://10.69.205.26:9090/#!/main/project/list/mine', {
				userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'
			});
		}
	}
};
</script>
