// babel entrance
require('babel-core/register')({
	'presets': ['es2015', 'stage-2'],
	'ignore': ['*.asar'],
	'plugins': ['transform-runtime']
});

require('./app.js');
