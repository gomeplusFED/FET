/* eslint-disable */
import 'shelljs/global';

import path from 'path';

import webpack from 'webpack';

import baseConfig from '../config/webpack.common.js';
import webpackConfig from '../config/webpack.build.config.js';

import env from '../config/env.config.js';

const assetsPath = path.join(baseConfig.assetsRoot, './');
rm('-rf', assetsPath);

console.log(`\nBuilding staic resource for ${env}...\n`);

webpack(webpackConfig, function(err, stats) {
	if (err) throw err;
	process.stdout.write(stats.toString({
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	}) + '\n');
});
