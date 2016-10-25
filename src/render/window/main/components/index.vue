<template>
	<div class="main-con">
		<m-electron></m-electron>
		<m-top-menu></m-top-menu>
		<m-introduction></m-introduction>
		<m-plugin></m-plugin>
		<m-bottom-menu></m-bottom-menu>
	</div>
</template>
<style lang="less">
@import '../../../assets/css/app.less';
.main-con {
	background-image: url('../../../assets/img/menu-bg.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	height: 717px;
	display: flex;
	flex-direction: column;
}
</style>
<script>
import {
	remote
} from 'electron';

import Electron from './electron.vue';
import TopMenu from './top-menu.vue';
import Introduction from './introduction.vue';
import Plugin from './plugins.vue';
import ButtomMenu from './bottom-menu.vue';

export default {
	name: 'Index',
	components: {
		'm-electron': Electron,
		'm-top-menu': TopMenu,
		'm-introduction': Introduction,
		'm-plugin': Plugin,
		'm-bottom-menu': ButtomMenu
	}
};
</script>
