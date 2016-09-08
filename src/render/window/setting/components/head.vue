<template>
	<div class="head">
		<i @click="close()" class="iconfont icon-close01"></i>
	</div>
</template>
<style scoped>
.head {
	background-color: rgba(33, 37, 43, 1);
	position: relative;
	height: 32px;
	-webkit-app-region: drag;
	border-bottom: 2px solid #181a1f;
}

.head i {
	color: rgba(255,255,255, 0.7);
	transition: all ease 0.2s;
	cursor: pointer;
	font-weight: 24px;
	line-height: 32px;
	position: absolute;
	right: 10px;
	-webkit-app-region: no-drag;
}
.head i:hover{
	color: #fff;
}
</style>
<script>
import {
	remote
} from 'electron';

const currentWindow = remote.getCurrentWindow();
export default {
	methods: {
		close() {
			currentWindow.hide();
		}
	}
};
</script>
