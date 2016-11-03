<template>
	<div class="electron" v-show="show">
		<div class="main">
			<h2>注意：</h2>
			<p>本应用依赖本地&nbsp;<code>Electron v1.3.2</code>&nbsp;环境，请</p>
			<p>1、手动设置&nbsp;<code>Electron</code>&nbsp;路径</p>
			<div>
				<input type="text" placeholder="请输入 Electron 路径" v-model="electronPath">
				<button @click="setElectronPath">确认</button>
			</div>
			<p>2、或者</p>
			<div>
				<button :disabled="lock" @click="install">{{lock ? '安装中' : '一键安装（推荐）'}}</button>
			</div>
			<div style="margin-top: 10px;" v-show="showStatus"><pre><code>{{status}}</code></pre></div>
		</div>
	</div>
</template>
<script>
import storage from 'utils/storage.js';
import { remote, ipcRenderer } from 'electron';
import fs from 'fs';

const dialog = remote.dialog;

let dialogInfoObj = {
	type: 'info',
	buttons: [],
	title: '提示',
	message: '提示信息'
};
export default {
	name: 'Electron',
	data() {
		return {
			lock: false,
			status: '',
			electronPath: '',
			showStatus: false,
			show: false
		};
	},
	ready() {
		let electronPath = storage.get('electronPath');
		if (fs.existsSync(electronPath)) {
			return;
		}
		this.show = true;
		ipcRenderer.on('install-electron-ing', (ev, args) => {
			this.showStatus = args.showStatus;
			this.status = args.msg;
		});
		ipcRenderer.on('install-electron-ed', (ev, electronAppPath) => {
			this.status = '完成';
			storage.set('electronPath', electronAppPath);
			this.showStatus = false;
			this.show = false;
			this.locak = false;
		});
	},
	methods: {
		setElectronPath() {
			let curr = '';
			if (this.electronPath === '') {
				curr = 'Electron 路径不能为空';
			} else if (!fs.existsSync(this.electronPath)) {
				curr = 'Electron 路径不正确';
			}
			if (curr !== '') {
				dialog.showMessageBox(Object.assign({
					detail: curr
				}, dialogInfoObj));
				return;
			}
			storage.set('electronPath', this.electronPath);
			this.show = false;
		},
		install() {
			if (!navigator.onLine) {
				dialog.showMessageBox(Object.assign({
					detail: '无网络'
				}, dialogInfoObj));
				return;
			}
			if (this.lock) return;
			ipcRenderer.send('install-electron');
			this.lock = true;
		}
	}
};
</script>
<style scoped>
.electron{
	position: fixed;width: 100%;height: 100%;
	background-color: #fff;
	z-index: 999;
}
.main {
	position: absolute;top: 20%;width: 100%;
	box-sizing: border-box;
	padding: 0 15px;
}
.main h2{
	font-size: 16px;line-height: 28px;
}
.main p {
	font-size: 14px;line-height: 26px;
}
.main input {
	display: block;
	width: 100%;
	height: 28px;
	padding: 6px 12px;
	box-sizing: border-box;
	font-size: 14px;
	line-height: 1.42857143;
	color: #555;
	background-color: #fff;
	background-image: none;
	border: 1px solid #ccc;
	border-radius: 4px;
	-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
	        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
	-webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
	     -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
	        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
.main input:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
          box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
}
.main input::-moz-placeholder {
  color: #999;
  opacity: 1;
}
.main input:-ms-input-placeholder {
  color: #999;
}
.main input::-webkit-input-placeholder {
  color: #999;
}
.main input::-ms-expand {
  background-color: transparent;
  border: 0;
}
.main input[disabled],
.main input[readonly]{
  background-color: #eee;
  opacity: 1;
}
.main button {
	color: #fff;
	background-color: #5cb85c;
	border-color: #ccc;
	display: inline-block;
	padding: 3px 10px;
	box-sizing: border-box;
	margin-bottom: 0;
	font-size: 14px;
	font-weight: normal;
	line-height: 1.42857143;
	text-align: center;
	white-space: nowrap;
	vertical-align: middle;
	-ms-touch-action: manipulation;
	    touch-action: manipulation;
	cursor: pointer;
	-webkit-user-select: none;
	   -moz-user-select: none;
	    -ms-user-select: none;
	        user-select: none;
	background-image: none;
	border: 1px solid transparent;
	border-radius: 4px;
	margin-top: 5px;
}
.main button.disabled,
.main button[disabled] {
  	cursor: not-allowed;
  	filter: alpha(opacity=65);
  	-webkit-box-shadow: none;
	box-shadow: none;
  	opacity: .65;
}
.main button:focus,
.main button.focus {
  	color: #fff;
  	background-color: #449d44;
  	border-color: #255625;
}
.main button:hover {
  	color: #fff;
  	background-color: #449d44;
  	border-color: #398439;
}
.main button:active,
.main button.active{
  	color: #fff;
  	background-color: #449d44;
  	border-color: #398439;
}
</style>
