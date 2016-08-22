import index from '../component/index.vue';
import settingIndex from '../component/setting/index.vue';

export const routeConfig = (router) => {
	router.map({
		'/': {
			name: 'index',
			component: index
		},
		'/setting': {
			name: 'settingIndex',
			component: settingIndex,
			subRoutes: {
				'/plugin': {
					name: 'pluginSetting'
				},
				'/skin': {
					name: 'skinSetting'
				},
				'/normal': {
					name: 'normalSetting'
				}
			}
		}
	});
	router.redirect({
		'*': '/'
	});
};
