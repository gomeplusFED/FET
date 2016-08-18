<template>
	<m-switch></m-switch>
	<div class="logo blue">
		<img src="../../../../icon/FETN.png">
		<p>tools of fore-end</p>
	</div>
	<div class="content">
		<div class="tools">
			<span>工具列表</span>
		</div>
		<div class="mods">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
		<div class="shadow"></div>
	</div>
</template>
<style scoped>
	.blue{
		background-color: #1396db;
	}
	img{
		width: 30%;
		margin: 80px 0 0 35%;
	}
	p{
		text-align: center;
		color:white;
		font-size: 10px;
		margin: 0;
		padding: 0 0 80px 0;
	}
	.tools{
		width: 100%;
		height: 21px;
		background-color: #77b3d7;
		padding: 9px 0 0 0;
	}
	.tools span{
		color:white;
		height: 12px;
		font-size: 12px;
		line-height: 12px;
		font-family: "微软雅黑";
		display: block;
		padding: 0 5px;
		margin: 0 20px;
		width: 100px;
		border-left: 2px solid white;
	}
	.content,.mods{
		width: 100%;
	}
	.mods{
		width: 90%;
		margin: 0 0 0 5%;
		height: 370px;
		overflow-y: scroll;
		/*border-bottom: 1px solid black;*/
	}
	.mods div{
		width: 45%;
		border-radius: 10px;
		border: 2px dashed #bad8ea;
		float: left;
		height: 60px;
		margin-top: 15px;
	}
	.mods div:nth-child(2n-1){
		margin: 15px 6% 0 0;
	}
	.shadow{
		box-shadow: 0 -5px 5px #b1daf2;
		width: 100%;
		height: 10px;
	}
	::-webkit-scrollbar
	{
		width: 0;
		height: 16px;
		background-color: rgba(0,0,0,0);
	}
</style>
<script>
import switchAm from '../common/switchAm.vue';
export default {
	name: 'App',
	components: {
		'm-switch': switchAm
	}
};
</script>
