// babel entrance
require('babel-core/register')({
	'presets': ['es2015'],
	'ignore': ['electron.asar']
});

require('./app.js');
