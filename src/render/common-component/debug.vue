<template>
	<div class="debug" v-show="env">
		<p>{{debug}}</p>
	</div>
</template>
<style scoped>
.debug {
	position: fixed;
	z-index: 9999;
	width: 100%;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	color: #fff;
	text-align: center;
}

.debug p {
	color: #fff;
	font-size: 12px;
	line-height: 24px;
}
</style>
<script>
import {
	ipcRenderer
} from 'electron';
export default {
	name: 'Debug',
	data() {
		return {
			env: process.env,
			debug: ''
		};
	},
	ready() {
		ipcRenderer.on('debug', (ev, msg) => {
			console.log(msg);
			this.debug = msg;
		});
	}
};
</script>
