import Vue from 'vue';

import Index from './components/index.vue';

const vm = new Vue({
	el: '#app',
	components: {
		'm-index': Index
	},
	template: `
	<div>
		<m-index></m-index>
	</div>
	`
});
