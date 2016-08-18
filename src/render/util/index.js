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
utils.mixin(utils, common);

export default utils;
