/* eslint-disable */
import 'shelljs/global';

import path from 'path';

import asar from 'asar';

import ora from 'ora';
import chalk from 'chalk';

let srcMainPath = path.join(__dirname, '../src/main');
let distPath = path.join(__dirname, '../dist');

export const buildStatic = function() {
	return new Promise((resolve, reject) => {
		let spinner = ora('Building staic resource ...').start();
		exec(`node ${path.join(__dirname, '../script/render.build.babel.js')} --env=production`, () => {
			spinner.stop();
			resolve();
		})
	})
};

export const copyMainFile = function() {
	return new Promise((resolve, reject) => {
		exec(`cp -rf ${ srcMainPath} ${distPath}`, () => {
			resolve();
		})
	})
};

export const installModule = function() {
	return new Promise((resolve, reject) => {
		let installSpinner = ora('Installing node modules ...').start();
		exec(`cd ${distPath} && npm install`, () => {
			installSpinner.stop();
			resolve();
		});
	})
};

export const packageApp = function(packExec) {
	return new Promise((resovel, reject) => {
		exec(packExec, (code, stdout, stderr) => {
			console.log(chalk.green.bold('\nbuild success'));
			resovel();
		})
	})
};

export const buildAsar = function() {
	return new Promise((resolve, reject) => {
		asar.createPackage(distPath, path.join(__dirname, '../asar/app.asar'), function() {
			console.log(chalk.green.bold('\ncreate asar success'));
			resolve();
		})
	})
};
