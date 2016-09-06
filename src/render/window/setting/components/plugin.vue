<template>
	<ul class="setting-detail-ul">
		<li>
			<div class="head">
				<i class="iconfont icon-chatouplug"></i>
				<span>安装插件</span>
			</div>
			<input class="input" type="text" v-model="pluginAdress" placeholder="请输入插件地址（github项目地址），回车安装" @keypress.enter="installPlugin()">
			<div class="check-plugin" v-show="showCheck">
				<i class="tip-icon iconfont icon-gouhao" v-show="showGouhao"></i>
				<i class="tip-icon iconfont icon-close01" v-show="showClose"></i>
				<i class="iconfont icon-loading" v-show="showLoading"></i>
				<span>{{checkInfo}}</span>
			</div>
		</li>
		<!-- <li>
			<div class="head" @click="showRecommendPlugin = !showRecommendPlugin">
				<i class="iconfont icon-chatouplug"></i>
				<span>推荐插件</span>
				<i class="shouqi iconfont icon-caidanshouqi" :class="{'open': showRecommendPlugin}"></i>
			</div>
			<ul class="recommend">
				<li></li>
			</ul>
		</li> -->
		<li>
			<div class="head" @click="showInstalledPlugin = !showInstalledPlugin">
				<i class="iconfont icon-chatouplug"></i>
				<span>已安装插件</span>
				<i class="shouqi iconfont icon-caidanshouqi" :class="{'open': showInstalledPlugin}"></i>
			</div>
			<ul style="color: #fff;">
				<li v-for="item in installedPluginList">{{item | json}}</li>
			</ul>
		</li>
	</ul>
</template>
<style scoped>
.input {
	display: block;
	padding: 0;
	margin: 0;
	width: 100%;
	border: 1px solid #1c1e24;
	border-radius: 5px;
	height: 38px;
	line-height: 25px;
	background: #1e2228;
	color: #fff;
	box-sizing: border-box;
	padding: 0 10px;
	font-size: 14px;
	margin-top: 10px;
}

.check-plugin {
	color: rgba(255, 255, 255, 0.7);
	line-height: 28px;
	font-size: 0;
}

.check-plugin i {
	font-size: 12px;
	line-height: 28px;
	display: inline-block;
	vertical-align: middle;
	margin-right: 4px;
}

.check-plugin span {
	font-size: 12px;
	line-height: 28px;
	display: inline-block;
	vertical-align: middle;
}

.icon-loading {
	animation: loading linear 1s infinite;
}

@keyframes loading {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
<script>
import fs from 'fs';
import path from 'path';

import {
	remote,
	ipcRenderer
} from 'electron';

import storage from 'utils/storage.js';

export default {
	data() {
		return {
			showRecommendPlugin: true,
			showInstalledPlugin: true,
			showCheck: false,
			showGouhao: false,
			showClose: false,
			showLoading: false,
			checkInfo: '正在检查插件',
			pluginAdress: '',
			userDataPath: remote.app.getPath('userData'),
			installedPluginList: storage.get('installedPlugin') || {}
		};
	},
	ready() {
		ipcRenderer.on('plugin-installing', (ev, args) => {
			this.showCheck = args.showCheck || false;
			this.showGouhao = args.showGouhao || false;
			this.showClose = args.showClose || false;
			this.showLoading = args.showLoading || false;
			this.checkInfo = args.msg || '';
		});
		ipcRenderer.on('plugin-installed', (ev, args) => {
			// 插件安装完成，触发插件系统更新操作
			let installedPlugin = storage.get('installedPlugin') || {};
			let pluginPkgInfo = JSON.parse(fs.readFileSync(path.join(this.userDataPath, 'Plugins', args, 'package.json')));
			installedPlugin[args] = {
				repoName: pluginPkgInfo.name,
				name: pluginPkgInfo.fet.name || pluginPkgInfo.name,
				desc: pluginPkgInfo.fet.desc || pluginPkgInfo.description,
				entry: pluginPkgInfo.fet.entry,
				version: pluginPkgInfo.version
			};
			storage.set('installedPlugin', installedPlugin);
			ipcRenderer.send('plugin-list-should-update');
		});
		ipcRenderer.on('plugin-list-should-update', () => {
			this.installedPluginList = storage.get('installedPlugin');
		});
	},
	methods: {
		installPlugin() {
			if (!/^https:\/\/github.com\//.test(this.pluginAdress)) {
				this.checkInfo = '地址不合法';
				this.showCheck = true;
				this.showClose = true;
				return;
			}
			let installedPlugin = storage.get('installedPlugin') || {};
			let pluginAuthor = this.pluginAdress.match(/https:\/\/github.com\/(.*)\/(.*)/)[1];
			let pluginName = this.pluginAdress.match(/https:\/\/github.com\/(.*)\/(.*)/)[2];
			if (installedPlugin[pluginAuthor + '~' + pluginName]) {
				this.checkInfo = '插件已存在，不用重复安装';
				this.showCheck = true;
				this.showClose = true;
				return;
			}
			ipcRenderer.send('plugin-install', {
				path: this.pluginAdress
			});
		}
	},
	watch: {
		pluginAdress: {
			handler() {
				if (this.pluginAdress === '') {
					this.showCheck = false;
				}
			}
		}
	}
};
</script>
