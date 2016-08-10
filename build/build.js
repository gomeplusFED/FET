/*global  rm:true*/
import 'shelljs/global';

import path from 'path';

import webpack from 'webpack';
import ora from 'ora';

import baseConfig from '../config/base.config.js';
import webpackConfig from '../config/webpack.build.config.js';

import env from '../config/env.config.js';

console.log(
	'  Tip:\n' +
	'  Built files are meant to be served over an HTTP server.\n' +
	'  Opening index.html over file:// won\'t work.\n'
);

const spinner = ora(`building for ${env}...`);
spinner.start();

const assetsPath = path.join(baseConfig.build.assetsRoot, './');
rm('-rf', assetsPath);

webpack(webpackConfig, function(err, stats) {
	spinner.stop();
	if (err) throw err;
	process.stdout.write(stats.toString({
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	}) + '\n');
});
