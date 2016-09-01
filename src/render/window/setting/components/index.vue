<template>
	<h1>test</h1>
</template>
<style lang="less">
@import '../../../assets/css/app.less';
</style>
<script>
import {
	ipcRenderer
} from 'electron';

import Normal from './normal.vue';
import Plugin from './plugin.vue';
import Skin from './skin.vue';
import About from './about.vue';

export default {
	name: 'Index',
	data() {
		return {
			tab: ''
		};
	},
	ready() {
		ipcRenderer.on('setting-opened-tab', (ev, tab) => {
			this.tab = tab;
		});
	},
	components: {
		'm-normal': Normal,
		'm-plugin': Plugin,
		'm-skin': Skin,
		'About': About
	}
};
</script>
