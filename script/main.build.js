/* eslint-disable */
import 'shelljs/global';

import fs from 'fs';
import path from 'path';

import minimist from 'minimist';
import packager from 'electron-packager';
import builder, { Platform } from 'electron-builder';
import chalk from 'chalk';
import ora from 'ora';
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
let excludeField = ['scripts', 'devDependencies', 'build', 'directories'];
let proPackageJson = {};

Object.keys(pkinfo).forEach((item) => {
	if (excludeField.indexOf(item) === -1) {
		proPackageJson[item] = pkinfo[item];
	}
});

proPackageJson.main = './main/app.babel.js';

// delete vue production dependencies
Object.keys(proPackageJson.dependencies).forEach((item) => {
	if (/vue/.test(item)) {
		delete proPackageJson.dependencies[item];
	}
})

fs.writeFileSync(path.join(__dirname, '../dist/package.json'), jsbeautify(JSON.stringify(proPackageJson)), 'utf-8');

let packExec = '';

const buildStatic = function() {
	return new Promise((resolve, reject) => {
		let spinner = ora('Building staic resource ...').start();
		exec(`node ${path.join(__dirname, '../script/render.build.babel.js')} --env=production`, () => {
			spinner.stop();
			resolve();
		})
	})
}

const copyMainFile = function() {
	return new Promise((resolve, reject) => {
		exec(`cp -rf ${ path.join(__dirname, '../src/main')} ${path.join(__dirname, '../dist')}`, () => {
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
	return new Promise((resovel, reject) => {
		exec(packExec, (code, stdout, stderr) => {
			console.log(chalk.green.bold('\nbuild success'));
		})
	})
};

const run = function() {
	buildStatic()
		.then(() => {
			return copyMainFile();
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
	choices: ['mac', 'linux', 'win', 'all']
}, {
	type: 'list',
	name: 'arch',
	message: 'which arch?',
	choices: ['ia32', 'x64', 'all']
}]).then((answers) => {
	packExec = `./node_modules/.bin/build --platform=${answers.platform} --arch=${answers.arch}`;
	run();
})
