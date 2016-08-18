<template>
	<div class="switchAm blue">
		<div class="min">
			<div class="minB"  @click="minimizing()"></div>
		</div>
		<div class="close">
			<div class="closeB"  @click="close()"></div>
			<div class="closeC"></div>
		</div>
		<div class="menu">
			<div class="menuC"></div>
			<div class="menuC"></div>
			<div class="menuC"></div>
		</div>
	</div>
</template>
<style scoped>
	.blue{
		background-color: #1396db;
	}
	.switchAm{
		width: 100%;
		overflow: hidden;
		padding: 16px 0 10px  0;
	}
	.minB,.closeB{
		width: 15px;
		height: 15px;
		position: absolute;
		cursor: pointer;
	}
	.minB{
		top:-7px;
		left: -2px;
	}
	.closeB{
		top:-7px;
		left: -2px;
		transform: rotate(45deg);
		-ms-transform: rotate(45deg);		/* IE 9 */
		-webkit-transform: rotate(45deg);	/* Safari and Chrome */
		-o-transform: rotate(45deg);		/* Opera */
		-moz-transform: rotate(45deg);      /* Firefox */
	}
	.min,.close,.closeC{
		width: 10px;
		height: 2px;
		background-color: white;
		position: relative;
	}
	.min,.close{
		float: left;
	}
	.closeC{
		transform: rotate(90deg);
		-ms-transform: rotate(90deg);		/* IE 9 */
		-webkit-transform: rotate(90deg);	/* Safari and Chrome */
		-o-transform: rotate(90deg);		/* Opera */
		-moz-transform: rotate(90deg);      /* Firefox */
	}
	.min{
		margin: 0 8px 0 15px;
	}
	.close{
		margin: 0 4px;
		transform: rotate(45deg);
		-ms-transform: rotate(45deg);		/* IE 9 */
		-webkit-transform: rotate(45deg);	/* Safari and Chrome */
		-o-transform: rotate(45deg);		/* Opera */
		-moz-transform: rotate(45deg);      /* Firefox */
	}
	.menu{
		float: right;
		width: 16px;
		margin: -4px 15px 0 0 ;
		cursor: pointer;
	}
	.menuC{
		width: 100%;
		height: 2px;
		background-color: white;
		margin: 0 0 3px 0;
	}
</style>
<script type="text/ecmascript-6">
import { remote, ipcRenderer } from 'electron';
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
