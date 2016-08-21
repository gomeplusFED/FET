// babel entrance
require('babel-core/register')({
	presets: ['es2015', 'stage-2'],
	ignore: ['electron.asar']
});

require('./app.js');
