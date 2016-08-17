/* eslint-disable */
import 'shelljs/global';

import fs from 'fs';
import path from 'path';

import minimist from 'minimist';
import packager from 'electron-packager';
import chalk from 'chalk';
import ora from 'ora';
import asar from 'asar';
import inquirer from 'inquirer';
import { js as jsbeautify } from 'js-beautify';

import pkinfo from '../package.json';

let appPath = path.join(__dirname, '../app');
let distPath = path.join(__dirname, '../dist');
let distMainPath = path.join(__dirname, '../dist/main');

// 移除 app 产出目录
rm('-rf', appPath);

if (!test('-e', distPath)) {
	mkdir(distPath);
}

// 生成生产环境 package.json
let excludeField = ['scripts', 'devDependencies'];
let proPackageJson = {};

Object.keys(pkinfo).forEach((item) => {
	if (excludeField.indexOf(item) === -1) {
		proPackageJson[item] = pkinfo[item];
	}
});

proPackageJson.main = './main.asar/app.babel.js';

// delete vue production dependencies
Object.keys(proPackageJson.dependencies).forEach((item) => {
	if (/vue/.test(item)) {
		delete proPackageJson.dependencies[item];
	}
})

fs.writeFileSync(path.join(__dirname, '../dist/package.json'), jsbeautify(JSON.stringify(proPackageJson)), 'utf-8');

let buildOptions = {};

let iconMap = {
	darwin: path.join(__dirname, '../icon/icon.icns'),
	win32: path.join(__dirname, '../icon/icon.ico'),
	linux: ''
};

buildOptions.name = pkinfo['app-name'];
buildOptions.dir = path.join(__dirname, '../dist');
buildOptions.platform = '';
buildOptions.arch = '';
buildOptions.version = '1.3.2';
buildOptions['app-version'] = pkinfo.version;
// buildOptions.ignore = 'app';
buildOptions.overwrite = true;
buildOptions.icon = '';
buildOptions.out = path.join(__dirname, '../app');

const buildStatic = function() {
	return new Promise((resolve, reject) => {
		let spinner = ora('Building staic resource ...').start();
		exec('npm run build:render', () => {
			spinner.stop();
			resolve();
		})
	})
}

const buildAsar = function() {
	return new Promise((resolve, reject) => {
		asar.createPackage(path.join(__dirname, '../src/main'), path.join(__dirname, '../dist/main.asar'), () => {
			resolve();
		})
	})
};

const installModule = function() {
	return new Promise((resolve, reject) => {
		let installSpinner = ora('Installing node modules ...').start();
		exec('cd ' + path.join(__dirname, '../dist') + ' && npm install', () => {
			installSpinner.stop();
			resolve();
		});
	})
};

const packageApp = function() {
	return new Promise((resolve, reject) => {
		// console.log((`Packaging ${buildOptions.name} v${buildOptions['app-version']} for ${buildOptions.platform} ${buildOptions.arch} ...`));

		// 打包
		packager(buildOptions, (e, path) => {
			if (e) {
				reject(e);
				throw e;
				// return;
			}
			console.log(chalk.green.bold('\nbuild success'));
			resolve();
		});
	})
};

const run = function() {
	buildStatic()
		.then(() => {
			return buildAsar();
		}).then(() => {
			return installModule();
		}).then(() => {
			return packageApp();
		})
}

inquirer.prompt([{
	type: 'list',
	name: 'platform',
	message: 'which platform?',
	choices: ['darwin', 'linux', 'win32', 'all']
}, {
	type: 'list',
	name: 'arch',
	message: 'which arch?',
	choices: ['ia32', 'x64', 'all']
}]).then((answers) => {
	buildOptions.platform = answers.platform;
	buildOptions.arch = answers.arch;
	buildOptions.icon = iconMap[answers.platform];
	run();
})
