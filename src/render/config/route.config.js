import Main from '../component/main/index.vue';
export const routeConfig = (router) => {
	router.map({
		'/main': {
			name: 'Main',
			component: Main
		}
	});
};
