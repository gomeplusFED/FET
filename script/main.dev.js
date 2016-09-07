/* eslint-disable */
import 'shelljs/global';
import chalk from 'chalk';
import webpack from 'webpack';

import customConfig from '../config/custom.config.js';
import { injectAppInfo } from '../support/build.process.js';

if (!test('-e',`${customConfig.electron.path}`)) {
	console.log(chalk.red.bold('\nError: electron path not exist.\n'));
	console.log('pleause check you electron path. (set in ' + chalk.magenta('config/custom.config.js') + ')\n');
	exit(1);
}

console.log(chalk.cyan.bold('\nProcessing start electron dev main process ... \n'));

injectAppInfo()
	.then(() => {
		exec(`${customConfig.electron.path} src/main/app.babel.js --debug=${customConfig.electron.debugPort} --env=dev`);
	})
