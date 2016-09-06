<template>
	<div class="plugins">
		<div class="tools">
			<h2>插件列表</h2>
		</div>
		<div class="content">
			<ul class="plugin">
				<li v-for="(index, item) in installedPluginList" v-show="item.status">
					<div class="lump" :style="{'backgroundColor': colorList[index]}"></div>
					<div class="menu"></div>
					<div class="top item">
						<div class="avatar left">
							<p v-show="!item.icon" :style="{'backgroundColor': colorList[index]}">{{item.name[0].toUpperCase()}}</p>
							<img :src="avatar[index]" v-show="item.icon">
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

.plugins .content .plugin li:last-child {
	border-bottom: none;
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
</style>
<script>
import {
	remote,
	ipcRenderer,
	nativeImage
} from 'electron';

import fs from 'fs';
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
				if (/^http/.test(this.installedPluginList[item].icon)) {
					Vue.set(this.avatar, item, this.installedPluginList[item].icon());
				} else {
					let image = nativeImage.createFromPath(path.join(app.getPath('userData'), 'Plugins', item, this.installedPluginList[item].icon));
					Vue.set(this.avatar, item, image.toDataURL());
				}
			});
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
