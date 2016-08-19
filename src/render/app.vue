<template>
	<div class="blue">
		<router-view></router-view>
	</div>
</template>
<style scoped>
.blue {
	background-image: linear-gradient(to bottom, #00A3E1 0, #06DCE9 100%);
	background-repeat: repeat-x;
	height: 717px;
}
</style>
<script>
import store from './store/index.js';
export default {
	name: 'App',
	store: store
};
</script>
