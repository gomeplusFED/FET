<template>
	<div class="tools">
		<h2>插件列表</h2>
	</div>
	<div class="content">
		<div class="plugin">
			<p>456</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123123</p>
			<p>123</p>
			<!-- <div class="service" v-for="item in model.data" :model="model" data-url={{item.url}} @click="openUrl($event)">{{item.title}}</div> -->
		</div>
	</div>
</template>
<style scoped>
.content {
	flex: 1;
	width: 100%;
	position: relative;
	height: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	margin-top: 30px;
}

.tools {
	position: absolute;
	top: 94px;
	left: 0;
	width: 100%;
	height: 21px;
	background-color: rgba(0,0,0,0.3);
	padding-top: 9px;
	z-index: 100;
}

.tools h2 {
	color: white;
	height: 12px;
	font-size: 12px;
	line-height: 12px;
	display: block;
	padding: 0 5px;
	margin: 0 10px;
	width: 100px;
	border-left: 2px solid white;
}
.plugin {
	background-color: white;
	padding-top: 10px;
	overflow: auto;
	flex: 1;
}

</style>
<script type="text/ecmascript-6">
export default {
	name: 'Plugins'
};
</script>
