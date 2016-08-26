<template>
	<h1>test</h1>
</template>
<style lang="less">
@import '../../../assets/css/app.less';
</style>
<script>
import {
	ipcRenderer
} from 'electron';

export default {
	name: 'Index',
	ready() {
		console.log(123);
	}
};
</script>
