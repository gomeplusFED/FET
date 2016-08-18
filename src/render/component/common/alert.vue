<template>
	<div class="alert transition" transition="fade" v-show="alertConfig.show">
		<div class="alert_msg">{{alertConfig.msg || 666666666666}}</div>
	</div>
</template>
<style scoped>
.alert {
	padding: 15px 35px;
	border: 1px solid transparent;
	border-radius: 4px;
	position: fixed;
	left: 50%;
	top: 340px;
	transform: translate(-50%, -50%);
	-webkit-transform: translate(-50%, -50%);
	z-index: 999999;
	box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);
	/*background-color: rgba(0, 0, 0, 0.6);*/
	background-color: rgba(15, 91, 137, 0.8);
}

.alert .alert_msg {
	margin-top: 0;
	color: #fff;
	font-size: 16px;
	display: inline-block;
	vertical-align: middle;
}

.alert .alert_tip {
	display: inline-block;
	vertical-align: middle;
	font-size: 34px;
	line-height: 34px;
	margin-right: 10px;
}
</style>
<script>
import store from '../../store/index.js';

export default {
	name: 'Alert',
	vuex: {
		getters: {
			alertConfig() {
				return store.state.alertConfig;
			}
		}
	}
};
</script>