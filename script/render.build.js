/* eslint-disable */
import 'shelljs/global';

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import ora from 'ora';

import baseConfig from '../config/webpack.common.js';
import webpackConfig from '../config/webpack.build.config.js';

import env from '../config/env.config.js';

const assetsPath = path.join(baseConfig.assetsRoot, './');
rm('-rf', assetsPath);

const buildSpinner = ora(`Building staic resource for ${env}...`).start();

webpack(webpackConfig, function(err, stats) {
	if (err) throw err;
	buildSpinner.stop();
	process.stdout.write(stats.toString({
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	}) + '\n');
	// fs.readdir(path.join(__dirname, '../dist/render/static/css/'), (err, files) => {
	// 	let cssPath = path.join(__dirname, '../dist/render/static/css/', files[0]);
	// 	fs.readFile(cssPath, 'utf-8', (err, data) => {
	// 		fs.writeFileSync(cssPath, data.replace(/\.\/static\//ig, '../'), 'utf-8');
	// 	})
	// });
});
