import Index from '../component/index.vue';
export const routeConfig = (router) => {
	router.map({
		'/': {
			name: 'Index',
			component: Index
		}
	});
	router.redirect({
		'*': '/'
	});
};
