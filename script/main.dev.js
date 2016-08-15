/* eslint-disable */
import 'shelljs/global';
import chalk from 'chalk';
import webpack from 'webpack';

import customConfig from '../config/custom.config.js';

if (!test('-e',`${customConfig.electron.path}`)) {
	console.log(chalk.red.bold('\nError: electron path not exist.\n'))
	console.log('pleause check you electron path. (set in ' + chalk.magenta('config/custom.config.js') + ')\n');
	exit(1);
}

console.log(chalk.cyan.bold('\nProcessing start electron main process ... \n'));

exec(`${customConfig.electron.path} src/main/app.babel.js --debug=${customConfig.electron.port} --env=dev`);
