<template>
	<div class="confirm transition" transition="fade" v-show="confirmConfig.show">
		<div class="pop">
			<div class="popTitle">{{confirmConfig.title}}</div>
			<div class="popMsg">{{confirmConfig.msg}}</div>
			<div class="popCro">
				<div class="txt-center c">取消</div>
				<div class="txt-center r">确认</div>
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
	margin: 240px 0 0 15%;
	background-color: rgba(242,247,253,0.9);
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
	overflow: hidden;
}
.r,.c{
	float: left;
	width: 50%;
	line-height: 40px;
}
.r{
	color:#00aaf5;
}
.popMsg{
	width: 90%;
	margin: 5px 5% 15px 5%;
	font-size: 12px;
	word-wrap: break-word;
}
.popTitle{
	/*background: -ms-linear-gradient(top, #eeedf3,  #d9dce1);        /!* IE 10 *!/*/
	/*background:-moz-linear-gradient(top,#eeedf3,#d9dce1);/!*火狐*!/*/
	/*background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#eeedf3), to(#d9dce1));/!*谷歌*!/*/
	/*background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#eeedf3), to(#d9dce1));      /!* Safari 4-5, Chrome 1-9*!/*/
	/*background: -webkit-linear-gradient(top, #eeedf3, #d9dce1);   /!*Safari5.1 Chrome 10+*!/*/
	/*background: -o-linear-gradient(top, #eeedf3, #d9dce1);  /!*Opera 11.10+*!/*/
	line-height: 45px;
	text-indent: 1rem;
	/*border-bottom: 1px solid #c2c6c7;*/
	/*color:#646569;*/
	color:#00aaf5;
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