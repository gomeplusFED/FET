<template>
	<div class="blue">
		<m-top-menu :model="services"></m-top-menu>
		<m-introduction></m-introduction>
		<m-plugin :model="services"></m-plugin>
	</div>
</template>
<style lang="less">
@import '../assets/sass/app.less';
.blue {
	background-image: linear-gradient(to bottom, #00A3E1 0, #06DCE9 100%);
	background-repeat: repeat-x;
	height: 717px;
}
</style>
<script>
import store from '../store/index.js';

import TopMenu from './top-menu/index.vue';
import Introduction from './introduction/index.vue';
import Plugin from './plugins/index.vue';
export default {
	name: 'Index',
	store: store,
	components: {
		'm-top-menu': TopMenu,
		'm-introduction': Introduction,
		'm-plugin': Plugin
	},
	data() {
		return {
			services: {
				'data': [{
					'title': 'host文件配置服务',
					'url': ''
				}, {
					'title': '本地代理服务',
					'url': ''
				}, {
					'title': '静态资源服务',
					'url': ''
				}, {
					'title': 'AMP',
					'url': 'http://10.69.205.26:9090/#!/main/api/edit/57452f88b32735983f8a9eae'
				}]
			}
		};
	},
	methods: {

	}
};
</script>
