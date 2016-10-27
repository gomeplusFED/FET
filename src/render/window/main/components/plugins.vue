<template>
	<div class="plugins">
		<div class="tools">
			<h2>插件列表</h2>
		</div>
		<div class="content">
			<ul class="plugin">
				<li v-for="(key, item) in installedPluginList" v-show="item.status" @click.stop="startPlugin(key, item)">
					<div class="lump" :style="{'backgroundColor': colorList[key]}"></div>
					<!-- <div class="menu-icon">
						<i class="iconfont icon-arrowdown"></i>
					</div> -->
					<div class="item">
						<div class="avatar left">
							<p v-show="!item.icon" :style="{'backgroundColor': colorList[key]}">{{item.name[0].toUpperCase()}}</p>
							<img :src="avatar[key]" v-show="item.icon">
						</div>
						<div class="detail right">
							<h2>{{item.name}}</h2>
							<p>{{item.desc}}</p>
						</div>
					</div>
				</li>
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
	background: rgba(0, 0, 0, 0.2);
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
	flex: 1;
	overflow: auto;
}

.plugins .content .plugin {}

.plugins .content .plugin li {
	box-sizing: border-box;
	padding: 15px 20px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.4);
	position: relative;
	cursor: pointer;
}

.plugins .content .plugin li:hover .lump {
	opacity: 1;
}

.plugins .content .plugin li .lump {
	position: absolute;
	opacity: 0;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	width: 4px;
	height: 35px;
	transition: all linear 0.2s;
}

.plugins .content .plugin li .item {
	display: flex;
	align-items: center;
}

.plugins .content .plugin li .item .left {
	margin-right: 14px;
}

.plugins .content .plugin li .item .left p {
	display: block;
	width: 45px;
	height: 45px;
	border-radius: 50%;
	text-align: center;
	line-height: 45px;
	color: #fff;
	text-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
}
.plugins .content .plugin li .item .left img{
	display: block;width: 45px;height: 45px;border-radius: 50%;
}

.plugins .content .plugin li .item .right {
	flex: 1;
}

.plugins .content .plugin li .item .right h2 {
	font-weight: normal;
	font-size: 14px;
	color: #fff;
}

.plugins .content .plugin li .item .right p {
	font-size: 12px;
	color: #d7dae0;
}
.menu-icon {
	position: absolute;color: #fff;
	right: 20px;
	top: 15px;font-size: 12px;
	opacity: 0;
	transition: all ease 0.2s;
}
.plugins .content .plugin li:hover .menu-icon {
	opacity: 1;
}
</style>
<script>
import {
	remote,
	ipcRenderer,
	nativeImage
} from 'electron';

import path from 'path';

import Vue from 'vue';

import storage from 'utils/storage.js';

import {
	getRandomColor
} from 'utils/common.js';

const app = remote.app;

export default {
	name: 'Plugins',
	data() {
		return {
			installedPluginList: storage.get('installedPlugin') || {},
			colorList: {},
			avatar: {}
		};
	},
	ready() {
		ipcRenderer.on('plugin-list-should-update', (ev) => {
			this.installedPluginList = storage.get('installedPlugin');
			this.generateColorList();
			this.generateAvatarList();
		});
		this.generateColorList();
		this.generateAvatarList();
	},
	methods: {
		generateColorList() {
			Object.keys(this.installedPluginList).forEach((item) => {
				Vue.set(this.colorList, item, getRandomColor());
			});
		},
		generateAvatarList() {
			Object.keys(this.installedPluginList).forEach((item) => {
				if (!this.installedPluginList[item].icon) {
					Vue.set(this.avatar, item, '');
					return;
				}
				if (/^http/.test(this.installedPluginList[item].icon)) {
					Vue.set(this.avatar, item, this.installedPluginList[item].icon());
				} else {
					let image = nativeImage.createFromPath(path.join(app.getPath('userData'), 'Plugins', item, this.installedPluginList[item].icon));
					Vue.set(this.avatar, item, image.toDataURL());
				}
			});
		},
		startPlugin(key, plugin) {
			let screen = {};
			for (let i in window.screen) {
				screen[i] = window.screen[i];
			}
			let pluginDetail = Object.assign({
				key: key,
				screen: screen,
				electronPath: storage.get('electronPath')
			}, plugin);
			ipcRenderer.send('plugin-start', pluginDetail);
		}
	},
	wathc: {
		installedPluginList: {
			handler() {
				this.generateColorList();
			}
		}
	}
};
</script>
