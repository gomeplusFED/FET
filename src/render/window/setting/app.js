import Vue from 'vue';

import Index from './components/index.vue';
import Debug from '../../common-component/debug.vue';

const vm = new Vue({
	el: '#app',
	components: {
		'm-index': Index,
		'm-debug': Debug
	},
	template: `
	<div>
		<m-debug></m-debug>
		<m-index></m-index>
	</div>
	`
});
