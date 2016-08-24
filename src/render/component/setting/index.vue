<template>
	<div>index</div>
</template>
<style lang="less" scoped>
</style>
<script>
import store from '../../store/index.js';
export default {
	name: 'settingIndex',
	vuex: {
		getters: {
			menuConfig() {
				return store.state.menuConfig;
			}
		}
	}
};
</script>
