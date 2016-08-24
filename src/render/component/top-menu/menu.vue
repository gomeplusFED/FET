<template>
	<div class="menu" :class="{'menu':true,'animation':menuConfig.show}" v-show="menuConfig.show">
		<div class="index"><i class="iconfont icon-caidan"></i></div>
		<div class="normal"><i class="iconfont icon-set"></i></div>
		<div class="plugin"><i class="iconfont icon-chatouplug"></i></div>
		<div class="skin" target="_blank" @click="skin()"><i class="iconfont icon-skin"></i></div>
	</div>
</template>
<style lang="less" scoped>
.menu{
	width: 60%;
	margin-left: 20%;
	position: fixed;
	top:300px;
	left:0;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
}
.animation{
	animation: myfirst 1s;
}
.index,.normal,.plugin,.skin{
	height: 50px;
	width: 50px;
	border-radius: 100%;
	background-color: black;
	margin: 4px;
	line-height: 50px;
	text-align: center;
	color:white;
	cursor: pointer;
}
.index{
	background-color: #495f6d;
}
.normal{
	background-color: #e5e5cb;
}
.plugin{
	background-color: #e26c60;
}
.skin{
	background-color: #86c1a3;
}
@keyframes myfirst
{
	0%   {top: 200px;}
	20%  {top: 350px;}
	100% {top: 300px;}
}
</style>
<script>
import store from '../../store/index.js';
export default {
	name: 'Menu',
	vuex: {
		getters: {
			menuConfig() {
				return store.state.menuConfig;
			}
		}
	},
	methods: {
		skin() {
			console.log('skin');
			window.open('#!/settingIndex', '美信客服平台IM');
//			this.$route.router.go('/settingIndex');
		}
	}
};
</script>
