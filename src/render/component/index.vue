<template>
	<div class="app">
		<m-top-menu></m-top-menu>
		<m-introduction></m-introduction>
		<m-plugin></m-plugin>
		<m-bottom-menu></m-bottom-menu>
	</div>
</template>
<style lang="less">
@import '../assets/css/app.less';
.app {
	background-image: linear-gradient(to bottom, #00A3E1 0, #06DCE9 100%);
	background-repeat: repeat-x;
	height: 717px;
	display: flex;
	flex-direction: column;
}
</style>
<script>
import store from '../store/index.js';

import TopMenu from './top-menu/index.vue';
import Introduction from './introduction/index.vue';
import Plugin from './plugins/index.vue';
import ButtomMenu from './buttom-menu/index.vue';

export default {
	name: 'Index',
	store: store,
	components: {
		'm-top-menu': TopMenu,
		'm-introduction': Introduction,
		'm-plugin': Plugin,
		'm-bottom-menu': ButtomMenu
	}
};
</script>
