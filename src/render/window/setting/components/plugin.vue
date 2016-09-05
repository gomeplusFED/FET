<template>
	<ul class="setting-detail-ul">
		<li>
			<div class="head">
				<i class="iconfont icon-chatouplug"></i>
				<span>安装插件</span>
			</div>
			<input class="input" type="text" v-model="pluginAdress" placeholder="请输入插件地址（github项目地址），回车安装" @keypress.enter="installPlugin()">
			<div class="check-plugin" v-show="showCheck">
				<i class="tip-icon iconfont icon-gouhao" v-show="showGouhao"></i>
				<i class="tip-icon iconfont icon-close01" v-show="showClose"></i>
				<i class="iconfont icon-loading" v-show="showLoading"></i>
				<span>{{checkInfo}}</span>
			</div>
		</li>
		<li>
			<div class="head" @click="showRecommendPlugin = !showRecommendPlugin">
				<i class="iconfont icon-chatouplug"></i>
				<span>推荐插件</span>
				<i class="shouqi iconfont icon-caidanshouqi" :class="{'open': showRecommendPlugin}"></i>
			</div>
			<ul class="recommend">
				<li></li>
			</ul>
		</li>
		<li>
			<div class="head" @click="showInstalledPlugin = !showInstalledPlugin">
				<i class="iconfont icon-chatouplug"></i>
				<span>已安装插件</span>
				<i class="shouqi iconfont icon-caidanshouqi" :class="{'open': showInstalledPlugin}"></i>
			</div>
		</li>
	</ul>
</template>

<style scoped>
.input {
	display: block;padding: 0;
	margin: 0;width: 100%;border: 1px solid #1c1e24;border-radius: 5px;height: 38px;line-height: 25px;background: #1e2228;
	color: #fff;
	box-sizing: border-box;
	padding: 0 10px;
	font-size: 14px;
	margin-top: 10px;
}
.check-plugin {
	color: rgba(255,255,255,0.7);
	line-height: 28px;
	font-size: 0;
}
.check-plugin i {
	font-size: 12px;
	line-height: 28px;
	display: inline-block;vertical-align: middle;
	margin-right: 4px;
}
.check-plugin span {
	font-size: 12px;
	line-height: 28px;
	display: inline-block;vertical-align: middle;
}
</style>
<script>
import {
	ipcRenderer
} from 'electron';

export default {
	data() {
		return {
			showRecommendPlugin: true,
			showInstalledPlugin: true,
			showCheck: false,
			showGouhao: false,
			showClose: false,
			showLoading: false,
			checkInfo: '正在检查插件',
			pluginAdress: ''
		};
	},
	methods: {
		installPlugin() {
			if (!/http:/.test(this.pluginAdress)) {
				this.checkInfo = '地址不合法';
				this.showCheck = true;
				this.showClose = true;
				return;
			}
			ipcRenderer.send('plugin-install', {
				path: this.pluginAdress
			});
		}
	},
	watch: {
		pluginAdress: {
			handler() {
				if (this.pluginAdress === '') {
					this.showCheck = false;
				}
			}
		}
	}
};
</script>
