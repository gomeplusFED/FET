<template>
	<div class="switchAm">
		<div class="close">
			<div class="closeB" @click="close()"></div>
			<div class="closeC"></div>
		</div>
		<div class="min">
			<div class="minB" @click="minimizing()"></div>
		</div>
		<div class="menu">
			<div class="menuC"></div>
			<div class="menuC"></div>
			<div class="menuC"></div>
		</div>
	</div>
</template>
<style scoped>
.switchAm {
	width: 100%;
	overflow: hidden;
	padding: 16px 0 10px 0;
}

.minB,
.closeB {
	width: 15px;
	height: 15px;
	position: absolute;
	cursor: pointer;
}

.minB {
	top: -7px;
	left: -2px;
}

.closeB {
	top: -7px;
	left: -2px;
	transform: rotate(45deg);
}

.min,
.close,
.closeC {
	width: 10px;
	height: 2px;
	background-color: white;
	position: relative;
}

.min,
.close {
	float: right;
}

.closeC {
	transform: rotate(90deg);
}

.min {
	margin: 0 8px 0 15px;
}

.close {
	margin: 0 10px 0 4px;
	transform: rotate(45deg);
}

.menu {
	float: right;
	width: 16px;
	margin: -4px 0 0 0;
	cursor: pointer;
}

.menuC {
	width: 100%;
	height: 2px;
	background-color: white;
	margin: 0 0 3px 0;
}
</style>
<script type="text/ecmascript-6">
import {
	remote,
	ipcRenderer
} from 'electron';
export default {
	name: 'switchAm',
	methods: {
		minimizing() {
			ipcRenderer.send('minimizing', 'minimizing');
			console.log('minimizing');
		},
		close() {
			ipcRenderer.send('close', 'close');
			console.log('close');
		}
	}
};
</script>
