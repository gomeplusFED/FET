<template>
	<div class="top-menu">
		<ul class="menu-list" v-if="platform === 'win32'">
			<li>
				<p class="hide">菜单</p><i class="iconfont icon-menu"></i>
			</li>
			<li>
				<p class="hide">最小化</p><i class="iconfont icon-min"></i>
			</li>
			<li>
				<p class="hide">关闭</p><i class="iconfont icon-close01"></i>
			</li>
		</ul>
	</div>
</template>
<style scoped>
.top-menu {
	position: relative;
	height: 24px;
	-webkit-app-region: drag;
	background-color: rgba(255, 255, 255, 0.1);
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
	font-size: 12px;
	margin: 0 5px;
	-webkit-app-region: no-drag;
	color: rgba(255, 255, 255, 0.7);
	transition: all ease 0.2s;
}

.menu-list li:hover {
	color: #fff;
}

.menu-list li i {
	display: inline-block;
	vertical-align: middle;
}
</style>
<script>
import {
	remote,
	ipcRenderer
} from 'electron';

export default {
	name: 'top-menu',
	data() {
		return {
			platform: process.platform
		};
	}
};
</script>
