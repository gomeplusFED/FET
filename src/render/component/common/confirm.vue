<template>
	<div class="confirm transition" transition="fade" v-show="confirmConfig.show">
		<div class="pop">
			<div class="popTitle txt-center">{{confirmConfig.title}}</div>
			<div class="popMsg txt-center">{{confirmConfig.msg}}{{confirmConfig.msg}}{{confirmConfig.msg}}</div>
			<div class="popCro">
				<div class="txt-center">确认</div>
				<div class="txt-center">取消</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.confirm {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.4);
	/*transform: translate(-50%, -50%);*/
	font-family: '微软雅黑';
	font-size: 14px;
}
.pop{
	width: 70%;
	margin: 200px 0 0 15%;
	background-color: #f5f5f5;
	color:#7c7c7d;
	position: relative;
	border-radius: 4px;
}
.pop div{
	border-radius: 4px;
}
.popIcon img{
	width: 80%;
}
.popTitle,.popCro{
	width: 100%;
}
.popMsg{
	width: 90%;
	margin: 10px 5%;
	font-size: 12px;
}
.popTitle{
	background: -ms-linear-gradient(top, #eeedf3,  #d9dce1);        /* IE 10 */
	background:-moz-linear-gradient(top,#eeedf3,#d9dce1);/*火狐*/
	background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#eeedf3), to(#d9dce1));/*谷歌*/
	background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#eeedf3), to(#d9dce1));      /* Safari 4-5, Chrome 1-9*/
	background: -webkit-linear-gradient(top, #eeedf3, #d9dce1);   /*Safari5.1 Chrome 10+*/
	background: -o-linear-gradient(top, #eeedf3, #d9dce1);  /*Opera 11.10+*/
	line-height: 34px;
	border-bottom: 1px solid #c2c6c7;
	color:#646569;
}
.txt-center{
	text-align: center;
}
</style>
<script>
import store from '../../store/index.js';
import actions from '../../store/actions/index.js';

export default {
	name: 'Confirm',
	vuex: {
		getters: {
			confirmConfig() {
				return store.state.confirmConfig;
			}
		}
	},
	methods: {
		apply() {
			this.confirmConfig.apply && this.confirmConfig.apply();
		},
		cancel() {
			this.confirmConfig.cancle && this.confirmConfig.cancle();
		},
		hide() {
			actions.confirm(store, {
				show: false
			});
		}
	}
};
</script>