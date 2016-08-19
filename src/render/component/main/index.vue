<template>
	<div class="blue">
		<m-switch :model="services"></m-switch>
		<div class="logo">
			<img src="../../assets/img/icon.png">
			<div class="desc">
				<span class="fontB">Tools of front end</span><br/>
				<span class="fontS">工具集合，集成多项前端自动化、<br>可视化工具</span>
			</div>
		</div>
	<div class="content">
		<div class="tools">
			<span>工具列表</span>
		</div>
		<div class="mods">
			<m-service :model="services"></m-service>
		</div>
		<!--<div class="shadow"></div>-->
	</div>
	</div>
</template>
<style scoped>
	.blue{
		background-image: linear-gradient(to bottom,#00A3E1 0,#06DCE9 100%);
		background-repeat: repeat-x;
		height: 717px;
	}
	.logo{
		width: 100%;
		overflow: hidden;
	}
	img{
		width: 20%;
		margin: 20px 0 0 8%;
		float: left;
	}
	.desc{
		text-align: left;
		color:white;
		font-size: 14px;
		margin: 20px 0 0 0;
		padding: 0 0 50px 0;
		display: block;
		float: left;
	}
	.desc span{
		margin-left: 15px;
		display: block;
	}
	.fontB{
		font-size: 16px;
	}
	.fontS{
		font-size: 10px;
		margin: -10px  0 0 0 ;
	}
	.tools{
		width: 100%;
		height: 21px;
		/*background-color: #21abe0;*/
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
		background-color: white;
	}
	.mods{
		width: 90%;
		margin: 0 0 0 5%;
		height: 534px;
		overflow-y: scroll;
		/*border-bottom: 1px solid black;*/
	}
	.mods div{
		width: 90%;
		border-radius: 6px;
		/*background-color: #1396db;*/
		background-color: rgba(19,150,219,0.8);
		font-family: '微软雅黑';
		font-size: 14px;
		float: left;
		line-height: 80px;
		height: 80px;
		margin-top: 18px;
		margin-left: 5%;
		text-align: center;
		color:white;
	}
	.mods div:nth-child(2n-1){
		margin: 18px 6% 0 5%;
	}
	.mods div:nth-child(1){
		margin-top: 30px;
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
import service from '../multiplex/service.vue';
export default {
	name: 'App',
	components: {
		'm-switch': switchAm,
		'm-service': service
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
