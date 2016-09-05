// babel entrance
require('babel-core/register')({
	'presets': ['es2015'],
	'ignore': ['electron.asar', 'node_modules']
});

require('./app.js');
