<template>
	<div class="menu-con" v-show="show" transition="fade">
		<div class="menu absolute-center">
			<div class="menu-item plugin" @click="newWin('setting.html', 'plugin')">
				<div class="absolute-center">
					<i class="iconfont icon-chatouplug"></i><span>插件</span>
				</div>
			</div>
			<div class="menu-item skin" @click="newWin('setting.html', 'skin')">
				<div class="absolute-center">
					<i class="iconfont icon-skin"></i><span>换肤</span>
				</div>
			</div>
			<div class="menu-item normal" @click="newWin('setting.html', 'normal')">
				<div class="absolute-center">
					<i class="iconfont icon-set"></i><span>设置</span>
				</div>
			</div>
			<div class="menu-item about" @click="newWin('setting.html', 'about')">
				<div class="absolute-center">
					<i class="iconfont icon-caidan"></i><span>关于</span>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.menu-con {
	position: fixed;
	width: 100%;
	height: 100%;
	background-image: url('../../../assets/img/menu-bg.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	z-index: 999;
}

.menu {
	width: 160px;
	z-index: 999;
	font-size: 0;
}

.animation {
	animation: myfirst 1s;
}

.menu-item {
	height: 70px;
	width: 70px;
	background-color: black;
	margin: 5px;
	color: white;
	cursor: pointer;
	display: inline-block;
	vertical-align: middle;
	text-align: center;
	font-size: 14px;
	position: relative;
	box-sizing: border-box;
	border-radius: 50%;
}

.menu-item span,
.menu-item i {
	display: block;
}

.menu-item span {
	font-size: 12px;
}

.plugin {
	background-color: #e26c60;
	animation: plugin ease 0.3s;
}

.skin {
	background-color: #86c1a3;
	animation: skin ease 0.3s;
}

.normal {
	background-color: #e5e5cb;
	animation: normal-ani ease 0.3s;
}

.about {
	background-color: #495f6d;
	animation: about ease 0.3s;
}

@keyframes plugin {
	0% {
		transform: translate(-100px, -100px);
	}
	100% {
		transform: translate(0, 0);
	}
}

@keyframes skin {
	0% {
		transform: translate(100px, -100px);
	}
	100% {
		transform: translate(0, 0);
	}
}

@keyframes normal-ani {
	0% {
		transform: translate(-100px, 100px);
	}
	100% {
		transform: translate(0, 0);
	}
}

@keyframes about {
	0% {
		transform: translate(100px, 100px);
	}
	100% {
		transform: translate(0, 0);
	}
}
</style>
<script>
import {
	remote,
	ipcRenderer
} from 'electron';

import url from 'url';

const currentWindow = remote.getCurrentWindow();

export default {
	name: 'TopContextMenu',
	props: ['show'],
	methods: {
		newWin(view, tab) {
			let urlObj = url.parse(currentWindow.getURL());
			let root = urlObj.protocol + urlObj.host + '/';
			let wholePath = root + view;
			let screen = {};
			for (let i in window.screen) {
				screen[i] = window.screen[i];
			}
			ipcRenderer.send('setting-will-open', {
				path: wholePath,
				argvs: tab,
				screen: screen
			});
		}
	}
};
</script>
