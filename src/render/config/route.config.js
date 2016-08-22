import index from '../component/index.vue';

import settingIndex from '../component/setting/index.vue';
import settingPlugin from '../component/setting/plugin.vue';
import settingSkin from '../component/setting/skin.vue';
import settingNormal from '../component/setting/normal.vue';

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
					name: 'settingPlugin',
					component: settingPlugin
				},
				'/skin': {
					name: 'settingSkin',
					component: settingSkin
				},
				'/normal': {
					name: 'settingNormal',
					component: settingNormal
				}
			}
		}
	});
	router.redirect({
		'*': '/'
	});
};
