/*global  process.env:true*/
/*eslint no-undef: "error"*/
import Vue from 'vue';

import Router from 'vue-router';
Vue.use(Router);

import VueAjax from 'vue-resource';
Vue.use(VueAjax);

import App from './app.vue';

import { routeConfig } from './config/route.config.js';

const router = new Router({
	saveScrollPosition: false,
	linkActiveClass: 'active'
});

// load all router
routeConfig(router);

router.start(App, '#app');
