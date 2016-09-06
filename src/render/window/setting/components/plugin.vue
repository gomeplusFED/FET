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
			<ul class="installed-list" v-show="showInstalledPlugin" transition="fade">
				<li v-for="(key, item) in installedPluginList">
					<div class="top item">
						<div class="left">
							<a @click="openUrl('https://github.com/'+ key.split('~')[0] + '/' + item.repoName)">{{item.name}}</a>
						</div>
						<div class="right">
							<i class="iconfont icon-version"></i>
							<span>{{item.version}}</span>
						</div>
					</div>
					<div class="middle item">
						<p>{{item.desc}}</p>
					</div>
					<div class="bottom item">
						<div class="left">
							Author: <a @click="openUrl('https://github.com/' + key.split('~')[0])">{{key.split('~')[0]}}</a>
						</div>
						<div class="right">
							<a href="javascript:void(0)" @click="delPlugin(key)">
								<i class="iconfont icon-delete"></i>
								<span>删除</span>
							</a>
							<a href="javascript:void(0)" @click="updatePlugin(key)">
								<i class="iconfont icon-restart"></i>
								<span>更新</span>
							</a>
							<a href="javascript:void(0)" @click="togglePlugin(key)">
								<i class="iconfont icon-disable"></i>
								<span>{{item.status ? '禁用' : '启用'}}</span>
							</a>
						</div>
					</div>
				</li>
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
	color: #d7dae0;
	box-sizing: border-box;
	padding: 0 10px;
	font-size: 14px;
	margin-top: 10px;
	margin-bottom: 20px;
}

.check-plugin {
	color: rgba(255, 255, 255, 0.7);
	line-height: 28px;
	font-size: 0;
	position: absolute;
	bottom: -28px;
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

.installed-list {}

.installed-list li {
	margin-top: 10px;
	width: 100%;
	box-sizing: border-box;
	padding: 15px 20px;
	background-color: #333842;
	border: 1px solid #181a1f;
	border-radius: 8px;
	cursor: pointer;
}

.installed-list li:hover {
	background-color: #373d48;
}

.installed-list li .item {
	display: flex;
}

.installed-list li .item .left {
	flex: 1;
}

.installed-list li .top {}

.installed-list li .top a {
	color: #d7dae0;
	font-style: normal;
	font-size: 14px;
	font-weight: normal;
	line-height: 26px;
	text-decoration: none;
}

.installed-list li .top a:hover {
	text-decoration: underline;
}

.installed-list li .top .right {
	font-size: 0;
}

.installed-list li .top .right span {
	display: inline-block;
	vertical-align: middle;
	font-size: 12px;
	color: #9da5b4;
}

.installed-list li .top .right i {
	display: inline-block;
	vertical-align: middle;
	color: #727986;
	font-size: 12px;
	margin-right: 3px;
	margin-top: 2px;
}

.installed-list li .middle p {
	font-size: 12px;
	color: #9da5b4;
	line-height: 26px;
}

.installed-list li .bottom .left {
	font-size: 12px;
	color: #727a87;
}

.installed-list li .bottom .left a {
	font-size: 12px;
	color: #727a87;
	text-decoration: none;
}

.installed-list li .bottom .left a:hover {
	text-decoration: underline;
}

.installed-list li .bottom .right {
	font-size: 0;
}

.installed-list li .bottom .right a {
	display: inline-block;
	vertical-align: middle;
	text-decoration: none;
	font-size: 0;
	padding: 3px 8px;
	background: #383d49;
	border: 1px solid #181a1f;
	margin-left: -1px;
	cursor: pointer;
}

.installed-list li .bottom .right a:first-child {
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
}

.installed-list li .bottom .right a:last-child {
	border-top-right-radius: 4px;
	border-bottom-right-radius: 4px;
}

.installed-list li .bottom .right a:hover span {
	color: #d7dae0;
}

.installed-list li .bottom .right a i {
	margin-right: 3px;
	display: inline-block;
	vertical-align: middle;
	font-size: 12px;
	color: #747b88;
	line-height: 12px;
}

.installed-list li .bottom .right a:nth-child(2) i {
	margin-top: 2px;
}
.installed-list li .bottom .right a:nth-child(3) i {
	margin-top: 2px;
}

.installed-list li .bottom .right a span {
	display: inline-block;
	vertical-align: middle;
	font-size: 12px;
	color: #9da5b4;
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
import { openUrl } from 'utils/common.js';

export default {
	name: 'Setting-Plugin',
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
				version: pluginPkgInfo.version,
				status: 1,
				icon: pluginPkgInfo.fet.icon || '',
				bg: pluginPkgInfo.fet.bg || ''
			};
			setTimeout(() => {
				this.showCheck = false;
			}, 1000);
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
				path: this.pluginAdress,
				action: '安装'
			});
		},
		openUrl(path) {
			openUrl(path);
		},
		delPlugin(key) {
			let installedPlugin = storage.get('installedPlugin') || {};
			delete installedPlugin[key];
			storage.set('installedPlugin', installedPlugin);
			ipcRenderer.send('plugin-list-should-update');
		},
		updatePlugin(key) {
			ipcRenderer.send('plugin-install', {
				path: `https://github.com/${key.split('~')[0]}/${key.split('~')[1]}`,
				action: '更新'
			});
		},
		togglePlugin(key) {
			let installedPlugin = storage.get('installedPlugin') || {};
			installedPlugin[key].status = installedPlugin[key].status ? 0 : 1;
			storage.set('installedPlugin', installedPlugin);
			ipcRenderer.send('plugin-list-should-update');
		}
	}
};
</script>
