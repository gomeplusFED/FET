<template>
	<div>666</div>
</template>
<style lang="less" scoped>
</style>
<script>
import store from '../../store/index.js';
export default {
	name: 'settingSkin',
	vuex: {
		getters: {
			menuConfig() {
				return store.state.menuConfig;
			}
		}
	}
};
</script>
