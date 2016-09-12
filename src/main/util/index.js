const utils = {};

utils.mixin = (source, target) => {
	for (var i in target) {
		if (target.hasOwnProperty(i)) {
			source[i] = target[i];
		}
	}
	return source;
};

import * as common from './common.js';
import * as window from './window.js';
import * as debug from './debug.js';
utils.mixin(utils, common);
utils.mixin(utils, window);
utils.mixin(utils, debug);

export default utils;
