// babel entrance
require('babel-core/register')({
	presets: ['es2015', 'stage-2']
});

require('./render.build.js');
