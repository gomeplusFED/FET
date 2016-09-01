<template>
	<div class="nav">
		<ul>
			<li :class="{active: tab === 'plugin'}" @click.stop="changeTab('plugin')">
				<i class="iconfont icon-chatouplug"></i>
				<span>插件</span>
			</li>
			<li :class="{active: tab === 'skin'}" @click.stop="changeTab('skin')">
				<i class="iconfont icon-skin"></i>
				<span>换肤</span>
			</li>
			<li :class="{active: tab === 'setting'}" @click.stop="changeTab('setting')">
				<i class="iconfont icon-set"></i>
				<span>设置</span>
			</li>
			<li :class="{active: tab === 'about'}" @click.stop="changeTab('about')">
				<i class="iconfont icon-caidan"></i>
				<span>关于</span>
			</li>
		</ul>
	</div>
</template>
<style scoped>
.nav {
	height: 100%;
	width: 120px;
	color: rgba(255,255,255,0.7);
	border-right: 1px solid #181a1f;
}
.nav ul li {
	cursor: pointer;
	line-height: 38px;
	box-sizing: border-box;
	padding-left: 18px;
	transition: all ease 0.2s;
}
.nav ul li.active,.nav ul li.active:hover {
	background-color: #3a3f4b;
}
.nav ul li i {
	margin-right: 5px;
	font-size: 14px;
}
.nav ul li span {
	font-size: 12px;
}
.nav ul li:hover {
	background-color: #31363f;
}
</style>
<script>
export default {
	props: ['tab'],
	methods: {
		changeTab(tab) {
			this.tab = tab;
		}
	}
};
</script>
