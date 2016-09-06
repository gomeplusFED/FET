<template>
	<div class="plugins">
		<div class="tools">
			<h2>插件列表</h2>
		</div>
		<div class="content">
			<ul class="plugin">
				<li v-for="item in installedPluginList">{{item|json}}</li>
			</ul>
		</div>
	</div>
</template>
<style scoped>
.plugins {
	flex: 1;
	overflow: hidden;
	position: relative;
	display: flex;
	flex-direction: column;
	padding-bottom: 30px;
}
.plugins .tools {
	position: absolute;
	top: 0;
	width: 100%;
	background: rgba(0,0,0,0.2);
}
.plugins .tools h2 {
	color: #fff;
	font-size: 12px;
	padding: 5px;
	line-height: 22px;
	box-sizing: border-box;
}
.plugins .content {
	margin-top: 32px;
	background-color: #fff;
	flex: 1;
	overflow: auto;
}

</style>
<script>
import {
	ipcRenderer
} from 'electron';

import storage from 'utils/storage.js';

export default {
	name: 'Plugins',
	data() {
		return {
			installedPluginList: storage.get('installedPlugin') || {}
		};
	},
	ready() {
		ipcRenderer.on('plugin-list-should-update', (ev) => {
			this.installedPluginList = storage.get('installedPlugin');
		});
	}
};
</script>
