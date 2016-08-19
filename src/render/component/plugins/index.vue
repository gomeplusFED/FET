<template>
	<div class="content">
		<div class="tools">
			<span>工具列表</span>
		</div>
		<div class="mods">
			<div class="service" v-for="item in model.data" :model="model" data-url={{item.url}} @click="openUrl($event)">{{item.title}}</div>
		</div>
	</div>
</template>
<style scoped>
.tools {
	width: 100%;
	height: 21px;
	background-color: #77b3d7;
	padding: 9px 0 0 0;
}

.tools span {
	color: white;
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

.content,
.mods {
	width: 100%;
	background-color: white;
}

.mods {
	width: 90%;
	margin: 0 0 0 5%;
	height: 534px;
	overflow-y: scroll;
	/*border-bottom: 1px solid black;*/
}

.mods div {
	width: 90%;
	border-radius: 6px;
	/*background-color: #1396db;*/
	background-color: rgba(19, 150, 219, 0.8);
	font-family: '微软雅黑';
	font-size: 14px;
	float: left;
	line-height: 80px;
	height: 80px;
	margin-top: 18px;
	margin-left: 5%;
	text-align: center;
	color: white;
}

.mods div:nth-child(2n-1) {
	margin: 18px 6% 0 5%;
}

.mods div:nth-child(1) {
	margin-top: 30px;
}

.shadow {
	box-shadow: 0 -5px 5px #b1daf2;
	width: 100%;
	height: 10px;
}

.service {
	width: 89%;
	margin: 5% 15px 0 0;
	border-radius: 6px;
	background-color: white;
	/*background-color: rgba(19,150,219,0.7);*/
	font-family: '微软雅黑';
	font-size: 14px;
	float: left;
	line-height: 80px;
	height: 80px;
	margin-top: 18px;
	margin-left: 5%;
	text-align: center;
	color: #1396db;
	box-shadow: 0 0px 5px rgba(19, 150, 219, 0.7);
	border: 3px solid #89c5e8;
	cursor: pointer;
}

.service:first-child {
	margin-top: 25px;
}
</style>
<script type="text/ecmascript-6">
import {
	remote,
	ipcRenderer
} from 'electron';
const BrowserWindow = remote.BrowserWindow;
const dialog = require('electron').dialog;
export default {
	name: 'Service',
	props: {
		model: Object
	},
	ready() {
		console.log(this.model);
		console.log(dialog);
	},
	methods: {
		openUrl(e) {
			if (e.target.getAttribute('data-url') !== '') {
				console.log(e.target.getAttribute('data-url'));
				var win = new BrowserWindow({
					width: 1920,
					height: 1200
				});
				win.loadURL(e.target.getAttribute('data-url'), {
					userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'
				});
			}
		}
	}
};
</script>
