/* eslint-disable */
import 'shelljs/global';

import fs from 'fs';
import path from 'path';

import minimist from 'minimist';
import inquirer from 'inquirer';
import { js as jsbeautify } from 'js-beautify';

import { generatePorductionPackageJson, buildStatic, copyMainFile, installModule, packageApp, injectAppInfo } from '../support/build.process.js';

import pkinfo from '../package.json';

let appPath = path.join(__dirname, '../app');
let distPath = path.join(__dirname, '../dist');

// 移除 app 产出目录
rm('-rf', appPath);

if (!test('-e', distPath)) {
	mkdir(distPath);
}


let packExec = '';

const run = function() {
	buildStatic()
		.then(() => {
			return generatePorductionPackageJson();
		})
		.then(() => {
			return injectAppInfo();
		})
		.then(() => {
			return copyMainFile();
		}).then(() => {
			return installModule();
		}).then(() => {
			return packageApp(packExec);
		}).catch((e) => {
			console.log(e);
		})
};

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
	packExec = answers.platform === 'win' ? `.\\node_modules\\.bin\\build --platform=${answers.platform} --arch=${answers.arch}` : `./node_modules/.bin/build --platform=${answers.platform} --arch=${answers.arch}`;
	run();
});
