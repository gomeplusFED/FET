<template>
	<div class="top-menu">
		<ul class="menu-list">
			<li @click="showMenu = !showMenu">
				<p class="hide">菜单</p><i class="iconfont icon-menu" style="font-size: 20px;"></i>
			</li>
			<li v-show="platform === 'win32'" @click="minimize()">
				<p class="hide">最小化</p><i class="iconfont icon-min"></i>
			</li>
			<li v-show="platform === 'win32'" @click="hideWindow()">
				<p class="hide">关闭</p><i class="iconfont icon-close01"></i>
			</li>
		</ul>
		<m-top-context-menu :show.sync="showMenu"></m-top-context-menu>
	</div>
</template>
<style scoped>
.top-menu {
	position: relative;
	height: 24px;
	-webkit-app-region: drag;
	background-color: rgba(255, 255, 255, 0.4);
}

.menu-list {
	display: block;
	width: 100%;
	font-size: 0;
	text-align: right;
	padding-right: 2px;
	box-sizing: border-box;
}

.menu-list li {
	line-height: 24px;
	display: inline-block;
	vertical-align: middle;
	cursor: pointer;
	font-size: 0;
	margin: 0 5px;
	-webkit-app-region: no-drag;
	color: rgba(255, 255, 255, 0.7);
	transition: all ease 0.2s;
}

.menu-list li:hover {
	color: #fff;
}

.menu-list li i {
	font-size: 14px;
	display: inline-block;
	vertical-align: middle;
}
</style>
<script>
import {
	remote
} from 'electron';

import TopContextMenu from './menu.vue';
const currentWindow = remote.getCurrentWindow();

export default {
	name: 'TopMenu',
	data() {
		return {
			platform: process.platform,
			showMenu: false
		};
	},
	components: {
		'm-top-context-menu': TopContextMenu
	},
	methods: {
		minimize() {
			currentWindow.minimize();
		},
		hideWindow() {
			currentWindow.hide();
		}
	}
};
</script>
