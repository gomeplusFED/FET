<template>
	<div class="con">
		<m-head></m-head>
		<div class="main">
			<m-nav :tab.sync="tab"></m-nav>
			<div class="detail" v-show="tab === 'plugin'">
				<m-plugin></m-plugin>
			</div>
			<div class="detail" v-show="tab === 'skin'">
				<m-skin></m-skin>
			</div>
			<div class="detail" v-show="tab === 'setting'">
				<m-setting></m-setting>
			</div>
			<div class="detail" v-show="tab === 'about'">
				<m-about></m-about>
			</div>
		</div>
	</div>
</template>
<style lang="less">
@import '../../../assets/css/app.less';
.con {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	position: absolute;
}

.con .main {
	flex: 1;
	display: flex;
	background-color: rgba(40, 44, 52, 1);
}

.con .main .detail {
	flex: 1;
	height: 100%;
	overflow: auto;
}
</style>
<script>
import {
	remote,
	ipcRenderer
} from 'electron';

import Head from './head.vue';
import Nav from './nav.vue';
import Setting from './setting.vue';
import Plugin from './plugin.vue';
import Skin from './skin.vue';
import About from './about.vue';

export default {
	name: 'Index',
	data() {
		return {
			tab: 'plugin'
		};
	},
	ready() {
		ipcRenderer.on('setting-opened-tab', (ev, argvs) => {
			this.tab = argvs;
		});
	},
	components: {
		'm-head': Head,
		'm-nav': Nav,
		'm-setting': Setting,
		'm-plugin': Plugin,
		'm-skin': Skin,
		'm-about': About
	}
};
</script>
