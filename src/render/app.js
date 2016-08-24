/*global  process.env:true*/
import Vue from 'vue';

import Router from 'vue-router';
import VueAjax from 'vue-resource';
import VueElectron from 'vue-electron';

Vue.use(VueAjax);
Vue.use(Router);
Vue.use(VueElectron);

import App from './app.vue';

// shortcut module
import './shortcut/index.js';

import { routeConfig } from './config/route.config.js';
const router = new Router();

// load all router
routeConfig(router);

router.start(App, '#app');
